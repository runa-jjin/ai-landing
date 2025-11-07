import NextAuth from "next-auth"
import { authOptions } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

const handler = NextAuth(authOptions)

// 에러 정보를 쿼리 파라미터로 전달하기 위한 래퍼
async function handleRequest(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<Response>
) {
  try {
    const response = await handler(req);
    return response;
  } catch (error: any) {
    console.error('[auth] Route handler error:', error);
    
    // 에러 정보 추출
    const errorMessage = error?.message || 'Unknown error';
    const errorCode = error?.code || null;
    const errorDescription = error?.description || errorMessage;
    const provider = error?.provider || null;
    
    // 에러 페이지로 리디렉션 (에러 정보 포함)
    const errorUrl = new URL('/auth/signin', req.url);
    errorUrl.searchParams.set('error', 'OAuthCallback');
    if (errorCode) errorUrl.searchParams.set('error_code', errorCode);
    if (errorDescription) errorUrl.searchParams.set('error_description', errorDescription);
    if (provider) errorUrl.searchParams.set('provider', provider);
    
    return NextResponse.redirect(errorUrl);
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req, handler);
}

export async function POST(req: NextRequest) {
  return handleRequest(req, handler);
}

