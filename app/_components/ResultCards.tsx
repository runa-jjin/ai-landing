"use client";

import { CopyOutput } from "@/lib/schema";
import { CopyButton } from "./CopyButton";

interface ResultCardsProps {
  result: CopyOutput | null;
}

export function ResultCards({ result }: ResultCardsProps) {
  if (!result) {
    return (
      <div className="card" aria-live="polite" data-testid="result-empty">
      <p className="text-sm text-slate-400">생성된 카피가 여기에 표시됩니다. 브리프를 입력하고 즉시 생성을 눌러주세요.</p> 
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4" data-testid="result-section">
      <section className="card space-y-3" aria-label="브랜드 음성 요약"> 
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">브랜드 보이스 요약</h3> 
          <CopyButton content={result.brandVoiceSummary} />
        </div>
        <p className="text-sm leading-relaxed text-slate-200">{result.brandVoiceSummary}</p>
      </section>

      <section className="card space-y-3" aria-label="헤드라인"> 
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">헤드라인 & 서브헤드</h3> 
          <CopyButton content={`${result.headline}\n${result.subhead}`} />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold text-slate-50">{result.headline}</p>
          <p className="text-sm text-slate-300">{result.subhead}</p>
        </div>
      </section>

      <section className="card space-y-3" aria-label="주요 혜택"> 
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">주요 혜택</h3> 
          <CopyButton content={result.benefits.join("\n")}
            testId="copy-benefits"
          />
        </div>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-200">
          {result.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="card space-y-3" aria-label="고객 사례"> 
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">고객 사례</h3> 
          <CopyButton
            content={result.socialProof.map((proof) => `${proof.name}: ${proof.quote}`).join("\n")}
          />
        </div>
        <div className="space-y-3">
          {result.socialProof.map((proof, index) => (
            <blockquote key={index} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-200">
            <p className="text-slate-100">"{proof.quote}"</p> 
            <footer className="mt-2 text-xs text-slate-400">- {proof.name}</footer> 
            </blockquote>
          ))}
        </div>
      </section>

      <section className="card space-y-3" aria-label="CTA 제안">
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">CTA 제안</h3> 
          <CopyButton content={result.ctas.join("\n")} />
        </div>
        <div className="flex flex-wrap gap-2"> 
          {result.ctas.map((cta, index) => (
            <span key={index} className="badge bg-primary/10 text-primary">
              {cta}
            </span>
          ))}
        </div>
      </section>

      <section className="card space-y-3" aria-label="FAQ">
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">FAQ</h3> 
          <CopyButton
            content={result.faq.map((item) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n")}
          />
        </div>
        <div className="space-y-3 text-sm text-slate-200">
          {result.faq.map((item, index) => (
            <div key={index}>
            <p className="font-semibold text-slate-100">Q. {item.q}</p> 
            <p className="mt-1 text-slate-300">A. {item.a}</p> 
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}