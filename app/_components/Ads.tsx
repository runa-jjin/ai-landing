"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Google AdSense 광고 컴포넌트
 * 
 * 사용법:
 * <AdSense adSlot="1234567890" adFormat="auto" />
 */
export function AdSense({ adSlot, adFormat = "auto", style, className }: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adClientId || !adSlot) return;

    // AdSense 스크립트가 이미 로드되었는지 확인
    if (window.adsbygoogle && adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("[AdSense] Error loading ad:", error);
      }
    }
  }, [adSlot, adClientId]);

  if (!adClientId || !adSlot) {
    return null;
  }

  return (
    <div ref={adRef} className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={adClientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

interface KakaoAdFitProps {
  unitId: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 카카오 애드핏 광고 컴포넌트
 * 
 * 사용법:
 * <KakaoAdFit unitId="DAN-xxxxxxxxxx" />
 */
export function KakaoAdFit({ unitId, className, style }: KakaoAdFitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!unitId || !adRef.current || initialized.current) return;

    const loadAd = () => {
      if (window.kakao && window.kakao.AdFit) {
        try {
          new window.kakao.AdFit({
            unitId: unitId,
            container: adRef.current!,
          });
          initialized.current = true;
        } catch (error) {
          console.error("[KakaoAdFit] Error loading ad:", error);
        }
      } else {
        // 스크립트가 아직 로드되지 않았으면 재시도
        setTimeout(loadAd, 100);
      }
    };

    loadAd();
  }, [unitId]);

  if (!unitId) {
    return null;
  }

  return <div ref={adRef} className={className} style={style} />;
}

// TypeScript 타입 선언
declare global {
  interface Window {
    adsbygoogle?: any[];
    kakao?: {
      AdFit: new (options: { unitId: string; container: HTMLElement }) => void;
    };
  }
}

