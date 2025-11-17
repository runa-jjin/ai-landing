"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const errorCode = searchParams.get("error_code");
  const provider = searchParams.get("provider");
  const envStatus = searchParams.get("env_status");

  // 로그인 성공 시 자동 리디렉션
  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("[signin] User authenticated, redirecting to:", callbackUrl);
      // 약간의 지연을 두고 리디렉션하여 세션이 완전히 설정되도록 함
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 100);
    }
  }, [status, session, callbackUrl, router]);

  // URL에 에러가 있는 경우 확인
  useEffect(() => {
    if (error) {
      console.error("[signin] Auth error from URL:", {
        error,
        errorDescription,
        errorCode,
        provider,
        fullUrl: window.location.href
      });
    }
    // 세션 상태 확인
    console.log("[signin] Session status:", status, "Has session:", !!session);
  }, [error, errorDescription, errorCode, provider, status, session]);

  const handleSignIn = async (provider: string) => {
    try {
      console.log(`[signin] Attempting ${provider} sign in`);
      // NextAuth가 자동으로 리디렉션 처리하므로 redirect 옵션 제거
      await signIn(provider, { 
        callbackUrl: callbackUrl,
      });
    } catch (error) {
      console.error(`[signin] ${provider} sign in error:`, error);
    }
  };

  // 이미 로그인된 경우
  if (status === "authenticated") {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="card w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">로그인 완료</h2>
            <p className="mt-2 text-sm text-slate-400">
              리디렉션 중...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 pt-24">
      {/* 서비스 소개 섹션 */}
      <div className="card space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">AI 기반 랜딩페이지 문구 자동 생성기</h1>
          <p className="text-base text-slate-300 leading-relaxed">
            브랜드 정보만 입력하면 AI가 자동으로 브랜드에 맞는 랜딩페이지 문구를 생성합니다. 
            헤드라인, 서브헤드, 주요 혜택, 고객 사례, FAQ 등 완성도 높은 마케팅 카피를 즉시 받아보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="space-y-2 text-center">
            <h3 className="text-base font-semibold text-primary">⚡ 빠른 생성</h3>
            <p className="text-sm text-slate-400">몇 분 안에 전문적인 랜딩페이지 문구 완성</p>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-base font-semibold text-primary">🎯 브랜드 맞춤</h3>
            <p className="text-sm text-slate-400">업종과 톤앤매너에 맞는 개인화된 카피</p>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-base font-semibold text-primary">📋 완성형 결과</h3>
            <p className="text-sm text-slate-400">헤드라인부터 FAQ까지 모든 요소 포함</p>
          </div>
        </div>
      </div>

      {/* 로그인 폼 */}
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="card w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">로그인</h2>
            <p className="mt-2 text-sm text-slate-400">
              소셜 계정으로 간편하게 로그인하세요
            </p>
          {error && (
            <div className="mt-4 rounded-lg bg-rose-500/10 border border-rose-500/50 px-4 py-3 text-sm text-rose-200 space-y-2">
              <div className="font-semibold">로그인 중 오류가 발생했습니다</div>
              <div className="text-xs opacity-90 space-y-1">
                <div>에러 타입: <span className="font-mono">{error}</span></div>
                {errorCode && (
                  <div className="font-semibold text-rose-300">
                    에러 코드: <span className="font-mono">{errorCode}</span>
                  </div>
                )}
                {errorDescription && (
                  <div className="mt-1 break-words">
                    <span className="font-semibold">에러 설명:</span> {decodeURIComponent(errorDescription)}
                  </div>
                )}
                {provider && (
                  <div className="text-rose-300">
                    프로바이더: <span className="font-mono">{provider}</span>
                  </div>
                )}
              </div>
              {error === "Configuration" && (
                <div className="mt-3 pt-3 border-t border-rose-500/30 text-xs space-y-1">
                  <div className="font-semibold text-rose-300">Configuration 에러 해결 방법:</div>
                  {envStatus && (() => {
                    try {
                      // Base64 디코딩 (브라우저 환경에서는 atob 사용)
                      const decoded = atob(envStatus);
                      const status = JSON.parse(decoded);
                      return (
                        <div className="mt-2 space-y-1 text-rose-200/80">
                          <div className="font-semibold text-rose-300">환경 변수 상태:</div>
                          <div className="space-y-0.5 font-mono text-[10px]">
                            <div>AUTH_SECRET: {status.hasAuthSecret ? `✅ 설정됨 (길이: ${status.authSecretLength})` : '❌ 없음'}</div>
                            <div>Google ID: {status.hasGoogleId ? '✅' : '❌'}</div>
                            <div>Google Secret: {status.hasGoogleSecret ? '✅' : '❌'}</div>
                            <div>NEXTAUTH_URL: {status.hasNextAuthUrl ? '✅' : '⚠️ 선택사항'}</div>
                            <div>NODE_ENV: {status.nodeEnv || 'N/A'}</div>
                          </div>
                        </div>
                      );
                    } catch {
                      return null;
                    }
                  })()}
                  <ul className="list-disc list-inside space-y-1 text-rose-200/80 mt-2">
                    <li>AUTH_SECRET 환경 변수가 설정되어 있는지 확인</li>
                    <li>Google OAuth Provider가 설정되어 있는지 확인</li>
                    <li>Vercel 환경 변수 설정에서 Production, Preview, Development 모두 체크</li>
                    <li>환경 변수 변경 후 재배포 필요</li>
                    <li>Vercel 대시보드 → Settings → Environment Variables에서 확인</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleSignIn("google")}
            disabled={status === "loading"}
            className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 border border-gray-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {status === "loading" ? "로그인 중..." : "Google로 계속하기"}
          </button>

        </div>

        <p className="text-center text-xs text-slate-400">
          무료 체험 3회 제공
        </p>
      </div>
      </div>

      {/* 서비스 특징 섹션 */}
      <div className="card space-y-4">
        <h2 className="text-xl font-bold text-white">✨ 서비스 특징</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">🤖 AI 기반 자동 생성</h3>
            <p className="text-sm text-slate-300">
              최신 AI 기술을 활용하여 브랜드에 맞는 전문적인 마케팅 문구를 자동으로 생성합니다. 
              수작업으로 작성하는 데 걸리는 시간을 대폭 단축할 수 있습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">📝 완성형 카피 제공</h3>
            <p className="text-sm text-slate-300">
              헤드라인, 서브헤드, 주요 혜택, 고객 사례, FAQ 등 랜딩페이지에 필요한 모든 요소를 
              한 번에 생성하여 제공합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">💼 다양한 업종 지원</h3>
            <p className="text-sm text-slate-300">
              이커머스, SaaS, 교육, 헬스케어, 금융, 부동산, 음식점, 뷰티 등 모든 업종의 
              랜딩페이지 문구를 생성할 수 있습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">🆓 무료 체험 제공</h3>
            <p className="text-sm text-slate-300">
              회원가입 후 즉시 무료로 3회 체험할 수 있습니다. 서비스 품질을 직접 확인한 후 
              유료 플랜으로 업그레이드하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="card w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">로딩 중...</h2>
          </div>
        </div>
      </section>
    }>
      <SignInContent />
    </Suspense>
  );
}

