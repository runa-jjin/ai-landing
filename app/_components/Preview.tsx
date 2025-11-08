"use client";

import { CopyOutput } from "@/lib/schema";

interface PreviewProps {
  result: CopyOutput | null;
}

export function Preview({ result }: PreviewProps) {
  if (!result) {
    return (
      <div className="card space-y-4" aria-live="polite" data-testid="preview-empty">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">랜딩페이지 미리보기</h3>
          <p className="text-sm text-slate-400 mb-4">
            카피를 생성하면 실제 랜딩페이지처럼 보이는 미리보기를 확인할 수 있습니다.
          </p>
        </div>
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-2">미리보기 구성:</h4>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>히어로 섹션 (헤드라인, 서브헤드, CTA 버튼)</li>
              <li>주요 혜택 섹션</li>
              <li>고객 후기 및 사례</li>
              <li>FAQ 아코디언</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900/50 p-3">
            <p className="text-xs text-slate-300">
              💡 <strong>팁:</strong> 생성된 카피를 복사하여 실제 랜딩페이지에 바로 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-black"
      data-testid="preview-section"
    >
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.45),_transparent_60%)]" />
        <div className="px-8 py-16 text-center">
          <span className="badge mx-auto mb-4 bg-primary/20 text-primary">{result.brandVoiceSummary}</span>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{result.headline}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{result.subhead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {result.ctas.map((cta, index) => (
              <button
                key={index}
                type="button"
                aria-label={`CTA ${index + 1}`}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  index === 0
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
                    : "border border-slate-700 text-slate-200"
                }`}
              >
                {cta}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-8 px-8 pb-16 pt-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">혜택</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {result.benefits.map((benefit, index) => (
              <li key={index} className="rounded-lg border border-slate-800/80 bg-slate-950/60 px-4 py-3">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white">고객 이야기</h2>
            <div className="mt-4 space-y-4">
              {result.socialProof.map((proof, index) => (
                <div key={index} className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-4 text-left">
                  <p className="text-sm text-slate-200">&quot;{proof.quote}&quot;</p>
                  <p className="mt-2 text-xs text-slate-400">{proof.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">FAQ</h2>
            <div className="mt-4 space-y-3 text-left text-sm text-slate-200">
              {result.faq.map((item, index) => (
                <details key={index} className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-4">
                  <summary className="cursor-pointer list-none font-semibold text-slate-100">{item.q}</summary>
                  <p className="mt-2 text-slate-300">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

