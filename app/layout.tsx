import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "./providers";
import { Header } from "./_components/Header";
import { StarryBackground } from "./_components/StarryBackground";

export const metadata: Metadata = {
  title: "랜딩페이지 문구 자동 생성기 | AI 카피라이팅",
  description: "AI가 자동으로 브랜드에 맞는 랜딩페이지 문구를 생성합니다. 무료 체험 3회 제공. Google 로그인으로 간편하게 시작하세요.",
  keywords: ["랜딩페이지", "카피라이팅", "AI", "문구 생성", "마케팅", "브랜딩"],
  authors: [{ name: "랜딩페이지 문구 생성기" }],
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "랜딩페이지 문구 자동 생성기",
    description: "AI가 자동으로 브랜드에 맞는 랜딩페이지 문구를 생성합니다.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="ko"> 
      <body className="antialiased">
        <StarryBackground />
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10"> 
            <Header />
            <main className="flex-1 pb-16">{children}</main> 
            <footer className="border-t border-slate-800 pt-6 text-xs text-slate-500">
              © {new Date().getFullYear()} 랜딩페이지 문구 생성기. All rights reserved.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}