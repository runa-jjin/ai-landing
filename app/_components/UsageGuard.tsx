"use client";

import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { USAGE_LIMIT } from "@/lib/user-usage";
import { useAppStore } from "@/store/useAppStore";

type UsageGuardProps = {
  children: (props: { blocked: boolean; openPaywall: () => void }) => ReactNode;
};

const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://qr.kakaopay.com/FaHneA0xp251c06091";

export function UsageGuard({ children }: UsageGuardProps) {
  const { usageCount, planType, isPaywallOpen, setPaywallOpen } = useAppStore();

  // Pro 플랜은 제한 없음
  const isPro = planType === 'pro';
  const blocked = !isPro && usageCount >= USAGE_LIMIT;
  const remaining = Math.max(0, USAGE_LIMIT - usageCount);

  const modal =
    isPaywallOpen &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="사용 제한" 
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
      >
        <div className="card max-w-md space-y-4 text-center">
          <h3 className="text-xl font-semibold">무료 한도 도달</h3> 
          <p className="text-sm text-slate-300"> 
            현재 계정은 총 {USAGE_LIMIT}회 생성 중 {usageCount}회를 사용했습니다.
          </p>
          <div className="rounded-lg bg-slate-800/50 p-4 text-left text-sm space-y-2">
            <p className="font-semibold text-primary">💳 프로 요금제</p>
            <p className="text-slate-300">₩19,000 / 월</p>
            <p className="text-xs text-slate-400">
              카카오페이 송금 후 이메일로 입금자명을 보내주시면<br/>
              24시간 내 계정을 업그레이드해드립니다.
            </p>
            <p className="text-xs text-slate-500">
              📧 tears0427@gmail.com
            </p>
          </div>
          <button
            type="button"
            aria-label="결제 페이지로 이동" 
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 hover:-translate-y-0.5 transition-transform"
            onClick={() => {
              window.open(paymentUrl, "_blank", "noopener,noreferrer");
            }}
          >
          💛 카카오페이로 송금하기
          </button>
          <button
            type="button"
            aria-label="닫기" 
            className="w-full rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
            onClick={() => setPaywallOpen(false)}
          >
          닫기
          </button>
        </div>
      </div>, 
      document.body
    );

  return (
    <>
      {children({
        blocked,
        openPaywall: () => setPaywallOpen(true)
      })}
      {modal}
      {!isPro && !blocked && remaining <= 1 && (
        <p className="text-right text-xs text-amber-400">무료 이용이 {remaining}회 남았습니다.</p>
      )}
      {isPro && (
        <p className="text-right text-xs text-yellow-400">✨ Pro 플랜 (무제한)</p>
      )}
    </>
  );
}