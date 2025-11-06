"use server";

import { auth } from "@/auth";
import { getUserUsage, getRemainingUsage, USAGE_LIMIT, canUserGenerate } from "@/lib/user-usage";

export async function getUsageInfo() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      isAuthenticated: false,
      used: 0,
      remaining: USAGE_LIMIT,
      limit: USAGE_LIMIT,
      canGenerate: false,
    };
  }

  const used = await getUserUsage(session.user.id);
  const remaining = await getRemainingUsage(session.user.id);
  const canGenerate = await canUserGenerate(session.user.id);

  return {
    isAuthenticated: true,
    used,
    remaining,
    limit: USAGE_LIMIT,
    canGenerate,
  };
}

