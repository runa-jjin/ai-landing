// Supabase DB 기반 사용량 관리
import { supabaseAdmin } from './supabase';

export const USAGE_LIMIT = 10;

// 메모리 폴백 (Supabase 실패 시)
const userUsageMemory = new Map<string, number>();

// 사용자 사용량 조회
export async function getUserUsage(userId: string): Promise<number> {
  try {
    // Supabase가 초기화되지 않았으면 메모리 사용
    if (!supabaseAdmin) {
      console.warn('[user-usage] Supabase not initialized, using memory');
      return userUsageMemory.get(userId) || 0;
    }

    const { data, error } = await supabaseAdmin
      .from('user_usage')
      .select('usage_count')
      .eq('user_id', userId)
      .maybeSingle(); // single() 대신 maybeSingle() 사용

    if (error) {
      console.error('[user-usage] Error fetching usage:', error.message);
      // 에러 발생 시 메모리 폴백
      return userUsageMemory.get(userId) || 0;
    }

    // 레코드가 없으면 0 반환 (생성은 auth.ts의 signIn 콜백에서만 수행)
    // 외래 키 제약 조건을 피하기 위해 여기서는 생성하지 않음
    if (!data) {
      console.log('[user-usage] No usage record found for userId:', userId, '- returning 0 (record should be created in signIn callback)');
      return 0;
    }

    return data.usage_count || 0;
  } catch (error) {
    console.error('[user-usage] Exception in getUserUsage:', error);
    return userUsageMemory.get(userId) || 0;
  }
}

// 사용량 증가
export async function incrementUserUsage(userId: string): Promise<number> {
  try {
    if (!supabaseAdmin) {
      console.warn('[user-usage] Supabase not initialized, using memory');
      const current = userUsageMemory.get(userId) || 0;
      const newCount = current + 1;
      userUsageMemory.set(userId, newCount);
      return newCount;
    }

    const currentUsage = await getUserUsage(userId);
    const newCount = currentUsage + 1;

    const { error } = await supabaseAdmin
      .from('user_usage')
      .upsert({
        user_id: userId,
        usage_count: newCount,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('[user-usage] Error incrementing usage:', error.message);
      // 에러 시 메모리 폴백
      const memCurrent = userUsageMemory.get(userId) || currentUsage;
      const memNew = memCurrent + 1;
      userUsageMemory.set(userId, memNew);
      return memNew;
    }

    console.log(`[user-usage] Successfully incremented usage for ${userId}: ${newCount}`);
    return newCount;
  } catch (error) {
    console.error('[user-usage] Exception in incrementUserUsage:', error);
    const current = userUsageMemory.get(userId) || 0;
    const newCount = current + 1;
    userUsageMemory.set(userId, newCount);
    return newCount;
  }
}

// 사용 가능 여부 확인 (Pro 플랜은 무제한)
export async function canUserGenerate(userId: string): Promise<boolean> {
  const plan = await getUserPlan(userId);
  
  // Pro 플랜은 무제한
  if (plan === 'pro') {
    return true;
  }
  
  // Free 플랜은 제한 적용
  const usage = await getUserUsage(userId);
  return usage < USAGE_LIMIT;
}

// 남은 사용량 조회 (Pro 플랜은 무제한)
export async function getRemainingUsage(userId: string): Promise<number> {
  const plan = await getUserPlan(userId);
  
  // Pro 플랜은 무제한 (큰 숫자 반환)
  if (plan === 'pro') {
    return 999999;
  }
  
  // Free 플랜은 제한 적용
  const used = await getUserUsage(userId);
  return Math.max(0, USAGE_LIMIT - used);
}

// 관리자용: 사용량 초기화
export async function resetUserUsage(userId: string): Promise<void> {
  try {
    if (!supabaseAdmin) {
      userUsageMemory.delete(userId);
      return;
    }

    const { error } = await supabaseAdmin
      .from('user_usage')
      .update({ usage_count: 0, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (error) {
      console.error('[user-usage] Error resetting usage:', error.message);
    }
  } catch (error) {
    console.error('[user-usage] Exception in resetUserUsage:', error);
  }
}

// 사용자 플랜 정보 조회
export async function getUserPlan(userId: string): Promise<string> {
  try {
    if (!supabaseAdmin) {
      console.log('[user-usage] ⚠️ Supabase not initialized');
      return 'free';
    }

    console.log('[user-usage] 🔍 Fetching plan for userId:', userId);

    // 먼저 user_id로 조회
    let { data, error } = await supabaseAdmin
      .from('user_usage')
      .select('plan_type, user_id')
      .eq('user_id', userId)
      .maybeSingle();

    // user_id로 찾지 못한 경우, users 테이블에서 email로 조회 시도
    if (!data && !error) {
      console.log('[user-usage] 🔄 Trying to find user by email/id mapping...');
      
      // users 테이블에서 해당 id의 email 찾기
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('email, id')
        .eq('id', userId)
        .maybeSingle();

      if (userData?.email) {
        console.log('[user-usage] 📧 Found user email:', userData.email);
        // email로 user_usage 조회 시도 (만약 user_id가 email로 저장된 경우)
        const { data: emailData } = await supabaseAdmin
          .from('user_usage')
          .select('plan_type, user_id')
          .eq('user_id', userData.email)
          .maybeSingle();
        
        if (emailData) {
          console.log('[user-usage] ✅ Found plan by email mapping:', emailData.plan_type);
          return emailData.plan_type || 'free';
        }
      }
    }

    if (error) {
      console.error('[user-usage] ❌ Error fetching plan:', error);
      return 'free';
    }

    if (!data) {
      console.log('[user-usage] ⚠️ No data found for userId:', userId);
      // 모든 user_usage 레코드 확인 (디버깅용)
      const { data: allData } = await supabaseAdmin
        .from('user_usage')
        .select('user_id, plan_type')
        .limit(10);
      console.log('[user-usage] 🔍 Sample user_usage records:', allData);
      return 'free';
    }

    console.log('[user-usage] ✅ Plan type found:', data.plan_type, 'for user_id:', data.user_id);
    return data.plan_type || 'free';
  } catch (error) {
    console.error('[user-usage] ❌ Exception in getUserPlan:', error);
    return 'free';
  }
}

