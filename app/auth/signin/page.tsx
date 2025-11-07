"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // 로그인 성공 시 자동 리디렉션
  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("[signin] User authenticated, redirecting to:", callbackUrl);
      router.push(callbackUrl);
      router.refresh(); // 세션 상태 새로고침
    }
  }, [status, session, callbackUrl, router]);

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
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="card w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">로그인</h2>
          <p className="mt-2 text-sm text-slate-400">
            소셜 계정으로 간편하게 로그인하세요
          </p>
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

          <button
            onClick={() => handleSignIn("kakao")}
            disabled={status === "loading"}
            className="w-full rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-semibold text-[#000000] transition-colors hover:bg-[#FDD835] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.78-.123l-4.29.956a.44.44 0 0 1-.53-.52l.985-4.238c-2.14-1.368-3.48-3.15-3.48-5.257C3.5 6.665 8.201 3 12 3z"/>
            </svg>
            {status === "loading" ? "로그인 중..." : "카카오로 계속하기"}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400">
          무료 체험 3회 제공
        </p>
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

