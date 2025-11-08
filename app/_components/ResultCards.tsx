"use client";

import { CopyOutput } from "@/lib/schema";
import { CopyButton } from "./CopyButton";

interface ResultCardsProps {
  result: CopyOutput | null;
}

export function ResultCards({ result }: ResultCardsProps) {
  if (!result) {
    return (
      <div className="card space-y-4" aria-live="polite" data-testid="result-empty">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">생성된 카피가 여기에 표시됩니다</h3>
          <p className="text-sm text-slate-400 mb-4">
            왼쪽 폼에 브랜드 정보를 입력하고 "즉시 생성" 버튼을 클릭하면 AI가 자동으로 랜딩페이지 문구를 생성합니다.
          </p>
        </div>
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-2">생성되는 콘텐츠:</h4>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>브랜드 보이스 요약</li>
              <li>헤드라인 & 서브헤드</li>
              <li>주요 혜택 3-5개</li>
              <li>고객 사례 (소셜 프루프)</li>
              <li>CTA 제안</li>
              <li>FAQ (자주 묻는 질문)</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900/50 p-3">
            <p className="text-xs text-slate-300">
              💡 <strong>팁:</strong> 샘플 데이터 버튼을 사용하면 빠르게 체험해볼 수 있습니다.
            </p>
          </div>
        </div>
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