import { z } from "zod";

export const industries = [
  "뷰티", 
  "교육", 
  "SaaS", 
  "커머스", 
  "헬스케어", 
  "라이프스타일",
  "금융",
  "부동산",
  "여행/레저",
  "식음료",
  "패션",
  "IT/테크",
  "미디어/엔터테인먼트",
  "스포츠/피트니스",
  "법률/컨설팅",
  "제조/유통",
  "기타"
] as const;

export const tones = ["담백", "영리", "따뜻함", "과감함"] as const;

export const languages = ["ko", "en"] as const;

export const copyInputSchema = z.object({
  serviceName: z.string().min(2, "서비스명을 입력해주세요."),
  industry: z.enum(industries, {
    errorMap: () => ({ message: "업종을 선택해주세요." })
  }),
  customIndustry: z.string().optional(),
  coreValue: z
    .string()
    .min(10, "핵심 가치를 최소 10자 이상 작성해주세요.")
    .max(400, "핵심 가치를 400자 이내로 입력해주세요."),
  tone: z.enum(tones, { errorMap: () => ({ message: "톤앤매너를 선택해주세요." }) }), 
  targetAudience: z
    .string()
    .min(5, "타겟 고객을 구체적으로 작성해주세요." ) 
    .max(400, "타겟 고객을 400자 이내로 입력해주세요." ), 
  differentiator: z
    .string()
    .min(5, "차별점을 구체적으로 작성해주세요.") 
    .max(400, "차별점을 400자 이내로 입력해주세요."), 
  language: z.enum(languages)
}).refine(
  (data) => {
    // "기타" 선택 시 customIndustry 필수
    if (data.industry === "기타") {
      return data.customIndustry && data.customIndustry.trim().length >= 2;
    }
    return true;
  },
  {
    message: "기타 선택 시 업종을 직접 입력해주세요.",
    path: ["customIndustry"],
  }
);

export type CopyInput = z.infer<typeof copyInputSchema>;

export const copyOutputSchema = z.object({
  brandVoiceSummary: z.string(),
  headline: z.string(),
  subhead: z.string(),
  benefits: z.array(z.string()).length(3),
  socialProof: z
    .array(
      z.object({
        name: z.string(),
        quote: z.string()
      })
    )
    .length(2),
  ctas: z.array(z.string()).length(2),
  faq: z
    .array(
      z.object({
        q: z.string(),
        a: z.string()
      })
    )
    .length(5)
});

export type CopyOutput = z.infer<typeof copyOutputSchema>;