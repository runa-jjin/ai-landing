const MAX_FREE_USAGE = 3;

export function canUseFreeTier(count: number) {
  return count < MAX_FREE_USAGE;
}

export function remainingFreeUsage(count: number) {
  return Math.max(0, MAX_FREE_USAGE - count);
}

export const USAGE_LIMIT = MAX_FREE_USAGE;