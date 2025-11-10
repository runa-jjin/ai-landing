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
              AI가 완성하는
            </span>
            <br />
            당신의 랜딩페이지 문구
          </h1>

          {/* 서브 헤드라인 */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mt-6 mb-10">
            브랜드 정보만 입력하세요.
            <br className="hidden md:block" />
            AI가 당신의 브랜드를 분석하여 더 효과적이고, 더 매력적인 내용으로
            <br className="hidden md:block" />
            랜딩페이지 문구를 생성해 드립니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/generate"
              className="bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50"
            >
              지금 시작하기
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-blue-400 px-8 py-4 rounded-lg text-lg font-semibold text-blue-400 hover:bg-blue-400/10 transition-colors"
            >
              요금제 보기
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
