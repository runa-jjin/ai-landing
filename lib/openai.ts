import OpenAI from "openai";

declare global {
  // eslint-disable-next-line no-var
  var openaiClient: OpenAI | undefined;
}

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY 환경변수가 설정되어 있지 않습니다.");
  }

  if (!global.openaiClient) {
    global.openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return global.openaiClient;
}