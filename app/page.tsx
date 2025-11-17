"use client";

import Link from "next/link";
import { KakaoAdFit } from "./_components/Ads";

export default function LandingPage() {
  return (
    <>
      {/* Hero 섹션 - 제공된 HTML 구조 그대로 적용 */}
      <main className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-20">
        <div className="container mx-auto max-w-4xl text-center">
          {/* 가로형 배너 광고 (728x90) - Hero 섹션 상단 */}
          <div className="flex justify-center mb-8">
            <KakaoAdFit 
              unitId={process.env.NEXT_PUBLIC_KAKAO_ADFIT_BANNER || "DAN-zg0CutQkojopfMIc"} 
              width={728} 
              height={90}
              className="max-w-full"
            />
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
              효과 없는 랜딩페이지 문구와 작별하세요
            </span>
          </h1>

          {/* 서브 헤드라인 */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mt-6 mb-10">
            브랜드 정보 → AI 분석 → 고객 전환율을 높이는 문구 생성.
            <br className="hidden md:block" />
            전문적인 랜딩페이지 카피를 5분 만에 완성하고, 마케팅 비용을 줄이세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/generate"
              className="bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50"
            >
              지금 시작하기
            </Link>
          </div>
        </div>
      </main>

      {/* 주요 기능 섹션 */}
      <section className="relative z-10 container mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-16">
          {/* 1. 마케팅 심리학 기반 분석 */}
          <div className="card space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  마케팅 심리학 기반 분석
                </h2>
                <p className="text-lg font-semibold text-slate-200 mb-2">
                  단순 문구 생성이 아닌, 고객심리 분석형 AI
                </p>
                <p className="text-slate-300 mb-4">
                  일반 AI는 정보를 글로만 바꿉니다. BrandVoice AI는 다릅니다.
                  <br />
                  당신의 브랜드 정보를 입력하면, 고객의 구매 심리, 감정 트리거, 신뢰 요소를 분석하여 단순히 설명하는 것이 아닌 마음을 움직이는 문구를 생성합니다. 마케팅 전문가가 5시간 걸려 만드는 카피를 AI가 5분 만에 완성합니다.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                  <span className="text-green-400 font-semibold">✓</span>
                  <span className="text-sm text-slate-300">평균 30% 높은 클릭율 달성</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 업종별 특화 최적화 */}
          <div className="card space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  업종별 특화 최적화
                </h2>
                <p className="text-lg font-semibold text-slate-200 mb-2">
                  당신의 사업을 정확히 이해하는 AI
                </p>
                <p className="text-slate-300 mb-4">
                  카페, 에이전시, SaaS, 코칭, 크리에이터... 업종마다 다릅니다.
                  <br />
                  BrandVoice AI는 업종 특성을 반영한 톤앤매너로 문구를 생성합니다. 같은 "프리미엄"이라는 단어도, 럭셔리 브랜드와 기술 스타트업에서는 다르게 표현되어야 합니다. 우리는 그 차이를 정확히 압니다.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                  <span className="text-green-400 font-semibold">✓</span>
                  <span className="text-sm text-slate-300">50+ 업종별 맞춤 최적화</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 전환율 중심의 A/B 테스트 자동 생성 */}
          <div className="card space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  전환율 중심의 A/B 테스트 자동 생성
                </h2>
                <p className="text-lg font-semibold text-slate-200 mb-2">
                  문구가 아닌, 성과를 판매합니다
                </p>
                <p className="text-slate-300 mb-4">
                  다른 도구는 하나의 문구만 줍니다. BrandVoice AI는 다릅니다.
                  <br />
                  고객이 반응할 만한 여러 버전의 문구를 동시에 생성하고, 어떤 표현이 더 높은 전환율을 만드는지 데이터 기반으로 추천합니다. 추측과 시행착오가 아닌, 검증된 마케팅 전략으로 당신의 ROI를 극대화하세요.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                  <span className="text-green-400 font-semibold">✓</span>
                  <span className="text-sm text-slate-300">평균 2.5배 높은 전환율</span>
                </div>
              </div>
            </div>
          </div>

          {/* 최종 CTA 버튼 */}
          <div className="text-center pt-8">
            <Link
              href="/generate"
              className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 px-10 py-4 rounded-lg text-lg font-semibold text-white hover:from-blue-500 hover:to-teal-400 transition-all shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              지금 시작해보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
