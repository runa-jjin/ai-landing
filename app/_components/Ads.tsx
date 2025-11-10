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
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onFail?: string; // NO-AD 콜백 함수명 (선택사항)
}

/**
 * 카카오 애드핏 광고 컴포넌트 (공식 가이드 준수)
 * 
 * 사용법:
 * <KakaoAdFit unitId="DAN-xxxxxxxxxx" width={300} height={250} />
 * 
 * NO-AD 콜백 사용:
 * <KakaoAdFit unitId="DAN-xxxxxxxxxx" width={300} height={250} onFail="callBackFunc" />
 */
export function KakaoAdFit({ 
  unitId, 
  width = 300, 
  height = 250, 
  className, 
  style,
  onFail 
}: KakaoAdFitProps) {
  if (!unitId) {
    return null;
  }

  // 카카오 애드핏 공식 가이드에 따른 HTML 태그 직접 사용
  // 제공된 스크립트 형식 그대로 사용 (width:100% 제거)
  return (
    <ins 
      className={`kakao_ad_area ${className || ""}`}
      style={{ 
        display: "none",
        ...style 
      }}
      data-ad-unit={unitId}
      data-ad-width={width}
      data-ad-height={height}
      {...(onFail && { "data-ad-onfail": onFail })}
    />
  );
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

