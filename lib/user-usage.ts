// Supabase DB 기반 사용량 관리
import { supabaseAdmin } from './supabase';

export const USAGE_LIMIT = 3;

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

    // 레코드가 없으면 생성
    if (!data) {
      const { error: insertError } = await supabaseAdmin
        .from('user_usage')
        .insert({ user_id: userId, usage_count: 0 });
      
      if (insertError) {
        console.error('[user-usage] Error creating usage record:', insertError.message);
        return userUsageMemory.get(userId) || 0;
      }
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

// 사용 가능 여부 확인
export async function canUserGenerate(userId: string): Promise<boolean> {
  const usage = await getUserUsage(userId);
  return usage < USAGE_LIMIT;
}

// 남은 사용량 조회
export async function getRemainingUsage(userId: string): Promise<number> {
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
      return 'free';
    }

    const { data, error } = await supabaseAdmin
      .from('user_usage')
      .select('plan_type')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) {
      return 'free';
    }

    return data.plan_type || 'free';
  } catch (error) {
    console.error('[user-usage] Exception in getUserPlan:', error);
    return 'free';
  }
}

