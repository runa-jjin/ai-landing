"use server";

import { auth } from "@/auth";
import { getOpenAIClient } from "@/lib/openai";
import { buildPrompt } from "@/lib/prompt";
import { copyInputSchema, copyOutputSchema, CopyInput, CopyOutput } from "@/lib/schema";
import { canUserGenerate, incrementUserUsage } from "@/lib/user-usage";

type GenerateCopyResult =
  | { success: true; data: CopyOutput }
  | { success: false; error: string };

const MODEL = "gpt-4o-mini";
const TEMPERATURE = 0.7;
  const MAX_TOKENS = 900; 

export async function generateCopy(input: CopyInput): Promise<GenerateCopyResult> {
  // 인증 확인
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  // 사용량 확인
  const canGenerate = await canUserGenerate(session.user.id);
  if (!canGenerate) {
    return { success: false, error: "무료 사용 한도에 도달했습니다. 요금제를 업그레이드해주세요." };
  }

  const parsed = copyInputSchema.safeParse(input);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "입력값을 확인해주세요.";
    return { success: false, error: message };
  }

  try {
    const { system, user } = buildPrompt(parsed.data);
    const promptLength = `${system}\n${user}`.length;

    const data = await withLogging(promptLength, async () => {
      const { payload, tokens } = await callModel({ system, user });
      return { data: payload, tokens };
    });

    // 사용량 증가
    await incrementUserUsage(session.user.id);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred while generating copy." }; 
  }
}

async function callModel(
  messages: { system: string; user: string },
  attempt = 0
): Promise<{ payload: CopyOutput; tokens?: number }> {
  const client = getOpenAIClient();
  const startedAt = Date.now();

  const response = await client.chat.completions.create({
    model: MODEL,
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
    messages: [
      { role: "system", content: messages.system },
      { role: "user", content: messages.user }
    ]
  });

  const tokens = response.usage?.total_tokens;
  const raw = response.choices[0]?.message?.content;
  const text = Array.isArray(raw)
    ? raw.map((item) => (item.type === "text" ? item.text : "")).join("")
    : raw ?? "";

  try {
    const json = JSON.parse(text);
    const parsed = copyOutputSchema.parse(json);
    return { payload: parsed, tokens };
  } catch (error) {
    if (attempt < 1) {
      console.warn("JSON parsing failed, retry.", error); 
      await new Promise((resolve) => setTimeout(resolve, 300));
      return callModel(messages, attempt + 1);
    }
    throw new Error("The AI response format is incorrect. Please try again."); 
  } finally {
    const duration = Date.now() - startedAt;
    console.log(
      `[generateCopy] callModel attempt=${attempt} durationMs=${duration} tokens=${tokens ?? "unknown"}`
    );
  }
}

async function withLogging<T>(promptLength: number, fn: () => Promise<{ data: T; tokens?: number }>) {
  const startedAt = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - startedAt;
    console.log(
      `[generateCopy] promptLength=${promptLength} tokens=${result.tokens ?? "unknown"} durationMs=${duration}`
    );
    return result.data;
  } catch (error) {
    const duration = Date.now() - startedAt;
    console.error(`[generateCopy] failed promptLength=${promptLength} durationMs=${duration}`, error);
    throw error;
  }
}
