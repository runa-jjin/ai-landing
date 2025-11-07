import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "랜딩페이지 문구 자동 생성기",
    description: "AI가 자동으로 브랜드에 맞는 랜딩페이지 문구를 생성합니다.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const kakaoAdFitKey = process.env.NEXT_PUBLIC_KAKAO_ADFIT_KEY;

  return (
    <html lang="ko"> 
      <head>
        {/* Google AdSense - 클라이언트에서 동적으로 추가하여 data-nscript 속성 방지 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 기존 스크립트 제거 (있다면)
                const existing = document.querySelector('script[src*="adsbygoogle"]');
                if (existing) {
                  existing.remove();
                }
                
                // 새로운 스크립트 동적 생성 (Next.js가 수정하지 않도록)
                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8630393397499631';
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
              })();
            `,
          }}
          suppressHydrationWarning
        />
        
        {/* 카카오 애드핏 */}
        {kakaoAdFitKey && (
          <Script
            src="https://t1.daumcdn.net/kas/static/ba.min.js"
            strategy="lazyOnload"
          />
        )}
      </head>
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
