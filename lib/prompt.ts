import { CopyInput } from "./schema";

export function buildPrompt(input: CopyInput) {
  const languageLabel = input.language === "en" ? "English" : "Korean";

  const system = `You are a Korean and English copywriter. Return only the JSON schema below.
Schema: {"brandVoiceSummary": string, "headline": string, "subhead": string, "benefits": [string, string, string], "socialProof": [{"name": string, "quote": string}, {"name": string, "quote": string}], "ctas": [string, string], "faq": [{"q": string, "a": string}, ... x5]}.
All strings should be written in ${languageLabel}, and should not contain unnecessary explanations or markdown.`;

  const industryGuidance: Record<string, string> = {
    "뷰티": "섬세하고 감각적인 표현, 과장 광고 금지, 피부과 전문의 인증 등 검증된 표현만 사용",
    "교육": "신뢰 기반 안내, 학습 효과는 데이터나 사례 기반으로 기술, 미인증 합격 보장 금지",
    "SaaS": "효율성과 자동화에 중점, 보안 관련 표현은 사실 기반, 경쟁사 비교 지양하고 자사 강점만 강조",
    "커머스": "구체적인 혜택 강조 및 배송/교환 정책, 허위 할인 표현 금지",
    "헬스케어": "의료 효능 과장 금지, 전문가 의견 또는 임상 근거가 있을 때만",
    "라이프스타일": "감성적으로 작성, 허위 과장 금지, 실제 후기 기반으로 작성",
    "금융": "정확한 수치 기반, 투자 수익 보장 금지, 리스크 명시, 금융 규제 준수",
    "부동산": "실거래가 기반, 투자 수익 보장 금지, 법적 제약사항 명시",
    "여행/레저": "실제 경험 기반, 안전 정보 포함, 취소/환불 정책 명확히",
    "식음료": "원산지 및 성분 명확히, 건강 효능 과장 금지, 식품 안전 강조",
    "패션": "소재 및 품질 정보 명확히, 사이즈 가이드 제공, 트렌드 반영",
    "IT/테크": "기술 스펙 정확히, 호환성 정보 제공, 전문 용어는 쉽게 설명",
    "미디어/엔터테인먼트": "콘텐츠 특징 강조, 타겟 연령층 고려, 감성적 접근",
    "스포츠/피트니스": "건강 효과 과학적 근거 기반, 안전 주의사항 포함, 실제 결과 사례",
    "법률/컨설팅": "전문성 강조, 신뢰 구축, 구체적 성과 사례, 비밀 보장",
    "제조/유통": "품질 관리 강조, 생산 과정 투명성, 인증 및 규격 명시"
  };

  const toneExamples: Record<CopyInput["tone"], string> = {
    "담백": "Intuitive and concise sentences, minimize unnecessary modifiers",
    "영리": "Tactful choice of words, but without losing professionalism",
    "따뜻함": "Friendly and empathetic tone, with messages of comfort and support",
    "과감함": "Strong expression and confident tone, emphasizing the spirit of challenge"
  };

  // 업종 처리: "기타"일 경우 customIndustry 사용
  const finalIndustry = input.industry === "기타" && input.customIndustry 
    ? input.customIndustry 
    : input.industry;
    
  const guidance = industryGuidance[input.industry] || "전문성과 신뢰성을 바탕으로 작성하되, 과장 표현 지양";

  const user = `Generate a copy of ${languageLabel} based on the following information.
Service Name: ${input.serviceName}
Industry: ${finalIndustry}
Core Value: ${input.coreValue}
Tone & Manner: ${input.tone} (${toneExamples[input.tone]})
Target Audience: ${input.targetAudience}
Differentiator: ${input.differentiator}
Industry Guidance: ${guidance}`;

  return { system, user };
}