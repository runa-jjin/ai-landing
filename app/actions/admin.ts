"use server";

import { supabaseAdmin } from "@/lib/supabase";

// 관리자 비밀번호 확인
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // .env.local에 설정 권장

export async function verifyAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

// 모든 사용자 조회
export async function getAllUsers() {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: "Supabase not initialized" };
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        name,
        created_at,
        user_usage (
          usage_count,
          plan_type,
          last_reset_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin] Error fetching users:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('[admin] Exception in getAllUsers:', error);
    return { success: false, error: "Failed to fetch users" };
  }
}

// 사용자 검색
export async function searchUsers(query: string) {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: "Supabase not initialized" };
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        name,
        created_at,
        user_usage (
          usage_count,
          plan_type,
          last_reset_at
        )
      `)
      .or(`email.ilike.%${query}%,name.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin] Error searching users:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('[admin] Exception in searchUsers:', error);
    return { success: false, error: "Failed to search users" };
  }
}

// 플랜 업그레이드/다운그레이드
export async function updateUserPlan(userId: string, planType: 'free' | 'pro') {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: "Supabase not initialized" };
    }

    const { error } = await supabaseAdmin
      .from('user_usage')
      .update({
        plan_type: planType,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('[admin] Error updating plan:', error);
      return { success: false, error: error.message };
    }

    console.log(`[admin] Updated user ${userId} to ${planType} plan`);
    return { success: true };
  } catch (error) {
    console.error('[admin] Exception in updateUserPlan:', error);
    return { success: false, error: "Failed to update plan" };
  }
}

// 사용량 초기화
export async function resetUserUsage(userId: string) {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: "Supabase not initialized" };
    }

    const { error } = await supabaseAdmin
      .from('user_usage')
      .update({
        usage_count: 0,
        last_reset_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) {
      console.error('[admin] Error resetting usage:', error);
      return { success: false, error: error.message };
    }

    console.log(`[admin] Reset usage for user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error('[admin] Exception in resetUserUsage:', error);
    return { success: false, error: "Failed to reset usage" };
  }
}

// 사용자 삭제 (선택사항)
export async function deleteUser(userId: string) {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: "Supabase not initialized" };
    }

    // user_usage는 ON DELETE CASCADE로 자동 삭제됨
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('[admin] Error deleting user:', error);
      return { success: false, error: error.message };
    }

    console.log(`[admin] Deleted user ${userId}`);
    return { success: true };
  } catch (error) {
    console.error('[admin] Exception in deleteUser:', error);
    return { success: false, error: "Failed to delete user" };
  }
}

