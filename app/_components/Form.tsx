"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { generateCopy } from "@/app/actions/generateCopy";
import { getUsageInfo } from "@/app/actions/getUserUsage";
import { copyInputSchema, industries, tones, languages, CopyInput } from "@/lib/schema";
import { useAppStore } from "@/store/useAppStore";

const seeds: Record<string, CopyInput> = {
  beauty: {
    serviceName: "글로우 아뜰리에",
    industry: "뷰티",
    customIndustry: "",
    coreValue: "피부 본연의 빛을 되찾아주는 맞춤형 스킨케어 솔루션을 제공합니다.",
    tone: "따뜻함",
    targetAudience: "민감성 피부로 고민하는 25-35세 직장인 여성",
    differentiator: "피부과 전문의와 협업하여 개발한 저자극 포뮬러",
    language: "ko"
  },
  education: {
    serviceName: "넥스트클래스",
    industry: "교육",
    customIndustry: "",
    coreValue: "데이터 기반 학습 계획으로 학생의 성장을 가속화합니다.",
    tone: "영리",
    targetAudience: "대학 입시를 준비하는 고등학생과 학부모",
    differentiator: "AI 진단을 통한 개인 맞춤 학습 경로 제공",
    language: "ko"
  },
  SaaS: {
    serviceName: "플로우그리드",
    industry: "SaaS",
    customIndustry: "",
    coreValue: "팀의 워크플로우를 자동화하여 반복 작업을 줄입니다.",
    tone: "담백",
    targetAudience: "10-50명 규모의 협업 중심 스타트업",
    differentiator: "Slack, Jira와 실시간으로 연동되는 워크플로우",
    language: "ko"
  }
};

export function Form() {
  const {
    form,
    setFormField,
    setForm,
    setResult,
    setIsGenerating,
    setError,
    setActiveTab,
    isGenerating,
    setPaywallOpen,
    setPlanType,
    isUpgradePromptOpen,
    setUpgradePromptOpen
  } = useAppStore();
  const [isPending, startTransition] = useTransition();
  const [usageInfo, setUsageInfo] = useState({
    isAuthenticated: false,
    used: 0,
    remaining: 3,
    limit: 3,
    canGenerate: false,
    planType: 'free' as string,
  });

  // 사용량 정보 로드
  useEffect(() => {
    getUsageInfo().then((info) => {
      setUsageInfo(info);
      setPlanType(info.planType);
      
      // 5회 사용 시 업그레이드 팝업 표시
      if (info.planType === 'free' && info.used === 5 && !isUpgradePromptOpen) {
        setUpgradePromptOpen(true);
      }
    });
  }, [setPlanType, isUpgradePromptOpen, setUpgradePromptOpen]);

  // 생성 후 사용량 새로고침
  const refreshUsage = async () => {
    const info = await getUsageInfo();
    setUsageInfo(info);
    setPlanType(info.planType);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 인증 확인
    if (!usageInfo?.isAuthenticated) {
      setError("로그인이 필요합니다.");
      return;
    }

    // 사용량 확인
    if (!usageInfo?.canGenerate) {
      setPaywallOpen(true);
      return;
    }

    setError(null);

    const parsed = copyInputSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "입력값을 확인해주세요.");
      return;
    }

    startTransition(async () => { 
      try {
        setIsGenerating(true);
        const response = await generateCopy(parsed.data);
        if (!response.success) {
          setError(response.error);
          return;
        }
        setResult(response.data);
        await refreshUsage(); // 사용량 새로고침
        setActiveTab("preview");
      } catch (error) {
        console.error(error);
        setError("생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); 
      } finally {
        setIsGenerating(false);
      }
    });
  };

  const handleSeed = (key: keyof typeof seeds) => {
    setForm(seeds[key]);
  };

  const router = useRouter();

  // 5회 사용 시 업그레이드 팝업
  const upgradePromptModal =
    isUpgradePromptOpen &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="유료 전환 안내"
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
      >
        <div className="card max-w-md space-y-4 text-center">
          <h3 className="text-xl font-semibold">무료 사용량 절반 사용 완료</h3>
          <p className="text-sm text-slate-300">
            무료 체험 10회 중 5회를 사용하셨습니다.
            <br />
            유료 플랜으로 전환하시면 무제한으로 사용하실 수 있습니다.
          </p>
          <div className="rounded-lg bg-slate-800/50 p-4 text-left text-sm space-y-2">
            <p className="font-semibold text-primary">💳 유료 플랜 전환</p>
            <p className="text-slate-300">
              유료 전환을 원하시면 아래 이메일로 문의해주세요.
            </p>
            <p className="text-xs text-slate-400">
              📧 <a href="mailto:tears0427@gmail.com" className="text-primary hover:underline">tears0427@gmail.com</a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="문의하기"
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 hover:-translate-y-0.5 transition-transform"
              onClick={() => {
                setUpgradePromptOpen(false);
                router.push("/contact");
              }}
            >
              문의 남기기
            </button>
            <button
              type="button"
              aria-label="닫기"
              className="flex-1 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
              onClick={() => setUpgradePromptOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <form onSubmit={handleSubmit} className="card space-y-6" aria-label="카피 생성 입력 폼">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">내용 입력</h2>
          <p className="text-sm text-slate-400">
            {usageInfo?.isAuthenticated 
              ? usageInfo?.planType === 'pro'
                ? "✨ Pro 플랜 (무제한 사용 가능)"
                : `무료 체험 ${usageInfo?.limit ?? 3}회 중 ${usageInfo?.remaining ?? 3}회 남았습니다.`
              : "로그인하여 무료로 체험해보세요."}
          </p> 
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm" aria-label="샘플 데이터 버튼들">
          <span className="badge">샘플 데이터</span>
          <button
            type="button"
            aria-label="뷰티 샘플 적용"
            data-testid="seed-beauty"
            onClick={() => handleSeed("beauty")}
            className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1 font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-700"
          >
            뷰티
          </button>
          <button
            type="button"
            aria-label="교육 샘플 적용"
            data-testid="seed-education"
            onClick={() => handleSeed("education")}
            className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1 font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-700"
          >
            교육
          </button>
          <button
            type="button"
            aria-label="SaaS 샘플 적용"
            data-testid="seed-saas"
            onClick={() => handleSeed("SaaS")}
            className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1 font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-700"
          >
            SaaS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" role="group" aria-label="기본 정보">
        <label className="flex flex-col gap-2 text-base font-medium">
          서비스명
          <input
            type="text"
            aria-label="서비스명 입력"
            data-testid="input-serviceName"
            value={form.serviceName}
            onChange={(event) => setFormField("serviceName", event.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
            placeholder="예) FlowGrid"
            required
          />
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2 text-base font-medium">
            업종
            <select
              aria-label="업종 선택"
              data-testid="select-industry"
              value={form.industry}
              onChange={(event) => setFormField("industry", event.target.value as CopyInput["industry"])}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
              required
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </label>
          
          {form.industry === "기타" && (
            <input
              type="text"
              aria-label="업종 직접 입력"
              placeholder="업종을 직접 입력해주세요 (예: 농업, IT서비스)"
              value={form.customIndustry || ""}
              onChange={(event) => setFormField("customIndustry", event.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
              required
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" role="group" aria-label="핵심 정보">
        <label className="flex flex-col gap-2 text-base font-medium">
          핵심 가치
          <textarea
            aria-label="핵심 가치 입력"
            data-testid="textarea-coreValue"
            value={form.coreValue}
            onChange={(event) => setFormField("coreValue", event.target.value)}
            className="h-28 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
            placeholder="브랜드가 제공하는 핵심 가치를 작성해주세요."
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-base font-medium">
          타겟 고객
          <textarea
            aria-label="타겟 고객 입력"
            data-testid="textarea-targetAudience"
            value={form.targetAudience}
            onChange={(event) => setFormField("targetAudience", event.target.value)}
            className="h-28 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
            placeholder="타겟 고객을 작성해주세요."
            required
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" role="group" aria-label="차별화 정보">
        <label className="flex flex-col gap-2 text-base font-medium">
          차별점
          <textarea
            aria-label="차별점 입력"
            data-testid="textarea-differentiator"
            value={form.differentiator}
            onChange={(event) => setFormField("differentiator", event.target.value)}
            className="h-28 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
            placeholder="경쟁사 대비 차별점을 작성해주세요."
            required
          />
        </label>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-base font-medium">
            톤앤매너
            <select
              aria-label="톤앤매너 선택"
              data-testid="select-tone"
              value={form.tone}
              onChange={(event) => setFormField("tone", event.target.value as CopyInput["tone"])}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base"
              required
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-2 text-base font-medium">
            언어
            <div className="flex gap-2" role="radiogroup" aria-label="언어 선택">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  aria-label={`${lang === "ko" ? "한국어" : "English"} 언어 선택`}
                  data-testid={`toggle-language-${lang}`}
                  onClick={() => setFormField("language", lang)}
                  className={`tab-button ${form.language === lang ? "tab-button-active" : ""}`}
                >
                  {lang === "ko" ? "한국어" : "English"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          aria-label="즉시 생성 버튼"
          data-testid="button-generate"
          disabled={isGenerating || isPending || !usageInfo?.isAuthenticated}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isGenerating || isPending ? "생성 중..." : !usageInfo?.isAuthenticated ? "로그인 필요" : "즉시 생성"}
        </button>
      </div>
      {upgradePromptModal}
    </form>
  );
}