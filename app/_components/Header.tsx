"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-slate-900/70 backdrop-blur-md border-b border-slate-800">
      <nav className="container mx-auto max-w-7xl flex justify-between items-center p-4 text-white">
        {/* 로고/사이트명 */}
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          랜딩페이지 문구 자동 생성기
        </div>
        {/* 네비게이션 메뉴 */}
        <ul className="flex space-x-6 text-sm font-medium items-center">
          <li>
            <a href="/" className="hover:text-blue-300 transition-colors">
              홈
            </a>
          </li>
          <li>
            <a href="/generate" className="hover:text-blue-300 transition-colors">
              생성하기
            </a>
          </li>
          <li>
            <a href="/pricing" className="hover:text-blue-300 transition-colors">
              요금제
            </a>
          </li>
          {status === "loading" ? (
            <li>
              <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-800" />
            </li>
          ) : session ? (
            <li>
              <div className="flex items-center gap-3">
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
            </li>
          ) : (
            <li>
              <Link
                href="/auth/signin"
                className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors"
              >
                로그인
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

