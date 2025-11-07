import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Auth.js/NextAuth 경로는 모든 보호에서 제외
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // 나머지 요청은 그대로 통과
  return NextResponse.next();
}

// 보호 제외 경로를 명시
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};

