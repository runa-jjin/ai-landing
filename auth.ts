import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { supabaseAdmin } from "./lib/supabase"

// 환경 변수 검증 및 에러 처리
const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

// 필수 환경 변수 검증
if (!AUTH_SECRET) {
  const errorMsg = '[auth] ❌ CRITICAL: AUTH_SECRET is missing! This will cause Configuration errors.';
  console.error(errorMsg);
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET environment variable is required');
  }
}

if (!NEXTAUTH_URL) {
  console.warn('[auth] ⚠️ NEXTAUTH_URL is not set. This may cause issues in production.');
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error('[auth] ❌ Missing: AUTH_GOOGLE_ID or AUTH_GOOGLE_SECRET');
} else {
  console.log('[auth] ✅ Google OAuth credentials loaded');
}

if (AUTH_SECRET) {
  console.log('[auth] ✅ AUTH_SECRET loaded');
} else {
  console.error('[auth] ❌ AUTH_SECRET missing - Configuration errors will occur!');
}

// NextAuth 설정 전에 환경 변수 재확인
if (!AUTH_SECRET) {
  const errorMsg = '[auth] ❌ CRITICAL: AUTH_SECRET is required for NextAuth. Configuration error will occur.';
  console.error(errorMsg);
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET environment variable is required for NextAuth');
  }
}

const providers = [
  ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET ? [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ] : []),
];

console.log('[auth] NextAuth providers count:', providers.length);
console.log('[auth] Provider IDs:', providers.map(p => p.id));
console.log('[auth] NextAuth configuration check:', {
  hasSecret: !!AUTH_SECRET,
  secretLength: AUTH_SECRET?.length || 0,
  providersCount: providers.length,
  hasGoogle: providers.some(p => p.id === 'google'),
  nextAuthUrl: NEXTAUTH_URL
});

// NextAuth v5에서는 providers가 비어있으면 Configuration 에러 발생
if (providers.length === 0) {
  const errorMsg = '[auth] ❌ CRITICAL: No OAuth providers configured. Google OAuth provider is required.';
  console.error(errorMsg);
  if (process.env.NODE_ENV === 'production') {
    throw new Error('At least one OAuth provider must be configured. Please set AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET');
  }
}

// AUTH_SECRET이 없으면 NextAuth 설정 실패
if (!AUTH_SECRET) {
  const errorMsg = '[auth] ❌ CRITICAL: AUTH_SECRET is missing. NextAuth cannot be initialized.';
  console.error(errorMsg);
  throw new Error('AUTH_SECRET environment variable is required');
}

// NextAuth 설정 객체 생성
const nextAuthConfig: any = {
  providers,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // 에러 발생 시 로그인 페이지로 리디렉션 (에러 타입은 쿼리 파라미터로 자동 전달됨)
  },
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서만 디버그 모드 활성화
  secret: AUTH_SECRET,
  // Vercel 배포 시 호스트 신뢰 설정 (NextAuth v5)
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account?: any; profile?: any }) {
      try {
        console.log('[auth] Sign in callback triggered:', { 
          userId: user.id, 
          email: user.email, 
          provider: account?.provider,
          hasAccount: !!account,
          hasProfile: !!profile
        });
        
        if (!supabaseAdmin) {
          console.warn('[auth] Supabase not initialized, skipping DB sync');
          return true;
        }

        // 1. users 테이블에 사용자 정보 upsert (id 기준)
        const { error: userError, data: userData } = await supabaseAdmin
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            email_verified: profile?.email_verified ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'  // id 기준으로 upsert (더 안전함)
          })
          .select()
          .single();

        if (userError) {
          console.error('[auth] Error upserting user:', userError);
          // users 테이블에 사용자가 없으면 user_usage 생성 불가
          return true; // 에러가 있어도 로그인은 허용
        } else {
          console.log(`[auth] User upserted: ${user.email} (id: ${user.id})`);
        }

        // 2. user_usage 테이블에 초기 레코드 생성 (없으면)
        // users 테이블에 사용자가 존재하는지 확인한 후에만 생성
        const { data: usageData } = await supabaseAdmin
          .from('user_usage')
          .select('id, usage_count, plan_type')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!usageData) {
          const { error: usageError } = await supabaseAdmin
            .from('user_usage')
            .insert({
              user_id: user.id,
              usage_count: 0,
              plan_type: 'free',
              last_reset_at: new Date().toISOString(),
            });

          if (usageError) {
            console.error('[auth] Error creating user_usage:', usageError);
            // 외래 키 제약 조건 위반 등 에러가 발생해도 로그인은 허용
          } else {
            console.log(`[auth] User usage created for: ${user.email}`);
          }
        } else {
          // 기존 레코드가 있으면 로그만 출력 (데이터 보존)
          console.log(`[auth] User usage exists for: ${user.email}, usage: ${usageData.usage_count}, plan: ${usageData.plan_type}`);
        }

        return true;
      } catch (error) {
        console.error('[auth] Exception in signIn callback:', error);
        return true; // 에러가 있어도 로그인은 허용
      }
    },
    async jwt({ token, user, account, profile }: { token: any; user?: any; account?: any; profile?: any }) {
      // 초기 로그인 시 user 정보를 token에 저장
      if (user) {
        console.log('[auth] JWT callback - user:', { id: user.id, email: user.email });
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // session에 token 정보 추가
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.email) {
        session.user.email = token.email as string;
      }
      if (token?.name) {
        session.user.name = token.name as string;
      }
      if (token?.picture) {
        session.user.image = token.picture as string;
      }
      console.log('[auth] Session callback - session:', { 
        userId: session.user.id, 
        email: session.user.email 
      });
      return session;
    },
  },
}

// NEXTAUTH_URL이 있으면 baseURL 설정
if (NEXTAUTH_URL) {
  nextAuthConfig.baseURL = NEXTAUTH_URL;
}

// 최종 설정 로그
console.log('[auth] NextAuth final configuration:', {
  hasSecret: !!nextAuthConfig.secret,
  secretLength: nextAuthConfig.secret?.length || 0,
  providersCount: nextAuthConfig.providers?.length || 0,
  hasBaseURL: !!nextAuthConfig.baseURL,
  baseURL: nextAuthConfig.baseURL,
  trustHost: nextAuthConfig.trustHost
});

// NextAuth 초기화
export const { handlers, signIn, signOut, auth } = NextAuth(nextAuthConfig)

