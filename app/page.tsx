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
