"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="card w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">로그인</h2>
          <p className="mt-2 text-sm text-slate-400">
            Google 계정으로 간편하게 로그인하세요
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Google로 계속하기
        </button>

        <p className="text-center text-xs text-slate-400">
          무료 체험 3회 제공
        </p>
      </div>
    </section>
  );
}

