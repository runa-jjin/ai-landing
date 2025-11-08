"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        {/* 로고 */}
        <img
          src="/logo.png?v=2"
          alt="랜딩페이지 문구 자동 생성기 로고"
          className="h-12 w-auto"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight gradient-text">
            랜딩페이지 문구 자동 생성기
          </h1>
          <p className="text-sm text-slate-400">
            서비스 정보를 입력하면 브랜드에 맞는 문구를 AI가 자동으로 생성합니다.
          </p>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-0 text-sm font-medium">
        <a 
          href="/" 
          className="px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white rounded-lg"
        >
          홈
        </a>
        <span className="h-4 w-px bg-slate-700" aria-hidden="true" />
        <a 
          href="/pricing" 
          className="px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800/50 hover:text-white rounded-lg"
        >
          요금제
        </a>
        
        {status === "loading" ? (
          <>
            <span className="h-4 w-px bg-slate-700" aria-hidden="true" />
            <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-800 ml-4" />
          </>
        ) : session ? (
          <>
            <span className="h-4 w-px bg-slate-700" aria-hidden="true" />
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
              <span className="text-xs text-slate-400 px-2 py-1 rounded bg-slate-900/50">
                {session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-white transition-all hover:border-slate-500 hover:bg-slate-700"
              >
                로그아웃
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="h-4 w-px bg-slate-700" aria-hidden="true" />
            <Link
              href="/auth/signin"
              className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              로그인
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

