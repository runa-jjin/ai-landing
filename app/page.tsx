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
      <section className="card space-y-4" aria-label="서비스 소개">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI 기반 랜딩페이지 문구 자동 생성기</h2>
          <p className="text-slate-300 leading-relaxed">
            브랜드 정보만 입력하면 AI가 자동으로 브랜드에 맞는 랜딩페이지 문구를 생성합니다. 
            헤드라인, 서브헤드, 주요 혜택, 고객 사례, FAQ 등 완성도 높은 마케팅 카피를 즉시 받아보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-primary">⚡ 빠른 생성</h3>
            <p className="text-xs text-slate-400">몇 분 안에 전문적인 랜딩페이지 문구 완성</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-primary">🎯 브랜드 맞춤</h3>
            <p className="text-xs text-slate-400">업종과 톤앤매너에 맞는 개인화된 카피</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-primary">📋 완성형 결과</h3>
            <p className="text-xs text-slate-400">헤드라인부터 FAQ까지 모든 요소 포함</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"> 
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
    </>
  );
}
