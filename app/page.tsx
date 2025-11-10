"use client";

import { Suspense } from "react";
import { Form } from "./_components/Form";
import { ResultCards } from "./_components/ResultCards";
import { Preview } from "./_components/Preview";
import { UsageGuard } from "./_components/UsageGuard";
import { useAppStore } from "@/store/useAppStore";

function LoadingPlaceholder() {
  return (
      <div className="card animate-pulse space-y-4">
      <div className="h-6 w-1/3 rounded bg-slate-800" /> 
      <div className="space-y-2">
      <div className="h-4 w-full rounded bg-slate-800" /> 
      <div className="h-4 w-3/4 rounded bg-slate-800" /> 
      <div className="h-4 w-2/4 rounded bg-slate-800" /> 
      </div>
    </div>
  );
}

export default function Page() {
  const { result, error, activeTab, setActiveTab } = useAppStore();

  return (
    <>
      <UsageGuard>
        {() => null}
      </UsageGuard>
      
      {/* 서비스 소개 섹션 */}
      <section className="card space-y-4 mb-8" aria-label="서비스 소개">
        <div>
          <h2 className="text-3xl font-bold text-white mb-3">AI 기반 랜딩페이지 문구 자동 생성기</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            브랜드 정보만 입력하면 AI가 자동으로 브랜드에 맞는 랜딩페이지 문구를 생성합니다. 
            헤드라인, 서브헤드, 주요 혜택, 고객 사례, FAQ 등 완성도 높은 마케팅 카피를 즉시 받아보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-primary">⚡ 빠른 생성</h3>
            <p className="text-sm text-slate-400">몇 분 안에 전문적인 랜딩페이지 문구 완성</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-primary">🎯 브랜드 맞춤</h3>
            <p className="text-sm text-slate-400">업종과 톤앤매너에 맞는 개인화된 카피</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-primary">📋 완성형 결과</h3>
            <p className="text-sm text-slate-400">헤드라인부터 FAQ까지 모든 요소 포함</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] mt-4"> 
        <div className="space-y-6">
          <Form />
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-lg border border-rose-500/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
            >
              {error}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex gap-2" role="tablist" aria-label="결과 및 미리보기 탭">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "result"}
              onClick={() => setActiveTab("result")}
              className={`tab-button ${activeTab === "result" ? "tab-button-active" : ""}`}
            >
              결과 카드
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "preview"}
              onClick={() => setActiveTab("preview")} 
              className={`tab-button ${activeTab === "preview" ? "tab-button-active" : ""}`}
            >
              미리보기
            </button>
          </div>
          <div>
            <Suspense fallback={<LoadingPlaceholder />}>
              {activeTab === "preview" ? <Preview result={result} /> : <ResultCards result={result} />}
            </Suspense>
          </div>
        </div>
      </div>

      {/* 사용 가이드 섹션 */}
      <section className="card space-y-4 mt-12" aria-label="사용 가이드">
        <h2 className="text-2xl font-bold text-white">📖 사용 가이드</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">1단계: 브랜드 정보 입력</h3>
            <p className="text-sm text-slate-300">
              브랜드명, 업종, 주요 제품/서비스, 타겟 고객층, 브랜드 톤앤매너를 입력하세요. 
              구체적일수록 더 정확한 문구가 생성됩니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">2단계: AI 문구 생성</h3>
            <p className="text-sm text-slate-300">
              입력한 정보를 바탕으로 AI가 헤드라인, 서브헤드, 주요 혜택, 고객 사례, FAQ 등을 자동으로 생성합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">3단계: 결과 확인 및 활용</h3>
            <p className="text-sm text-slate-300">
              생성된 문구를 카드 형태로 확인하거나 미리보기로 실제 랜딩페이지처럼 볼 수 있습니다. 
              원하는 문구를 복사하거나 다운로드하여 바로 사용하세요.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">4단계: 커스터마이징</h3>
            <p className="text-sm text-slate-300">
              생성된 문구는 참고 자료로 활용하고, 브랜드에 맞게 수정하여 최종 검토 후 사용하세요. 
              법적 적합성은 반드시 확인해야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="card space-y-4 mt-8" aria-label="자주 묻는 질문">
        <h2 className="text-2xl font-bold text-white">❓ 자주 묻는 질문 (FAQ)</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q1. 무료로 몇 번까지 사용할 수 있나요?</h3>
            <p className="text-sm text-slate-300">
              무료 플랜은 월 3회까지 문구를 생성할 수 있습니다. 추가 사용이 필요하시면 프로 요금제(월 ₩19,000)로 업그레이드하시면 무제한으로 사용하실 수 있습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q2. 생성된 문구의 저작권은 누구에게 있나요?</h3>
            <p className="text-sm text-slate-300">
              생성된 문구의 저작권은 이용자에게 귀속됩니다. 상업적 목적으로 자유롭게 사용하실 수 있으며, 
              서비스 제공자에 대한 저작권 표시는 선택사항입니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q3. 생성된 문구를 바로 사용해도 되나요?</h3>
            <p className="text-sm text-slate-300">
              생성된 문구는 참고 자료로 활용하시고, 반드시 브랜드에 맞게 수정 및 검토하신 후 사용하시기 바랍니다. 
              법적 적합성, 정확성, 완전성에 대한 최종 책임은 이용자에게 있습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q4. 어떤 업종에 사용할 수 있나요?</h3>
            <p className="text-sm text-slate-300">
              모든 업종에서 사용 가능합니다. 이커머스, SaaS, 교육, 헬스케어, 금융, 부동산, 
              음식점, 뷰티 등 다양한 업종의 랜딩페이지 문구를 생성할 수 있습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q5. 프로 요금제는 어떻게 결제하나요?</h3>
            <p className="text-sm text-slate-300">
              카카오페이를 통해 간편하게 결제하실 수 있습니다. 결제 후 이메일로 입금 정보를 보내주시면 
              24시간 내 계정이 업그레이드됩니다. 자세한 내용은 <a href="/payment-info" className="text-primary hover:underline">결제 안내</a> 페이지를 참고하세요.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q6. 환불이 가능한가요?</h3>
            <p className="text-sm text-slate-300">
              이용 시작 전에만 환불이 가능합니다. 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따라 
              환불이 처리됩니다. 문의사항은 tears0427@gmail.com으로 연락주세요.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
