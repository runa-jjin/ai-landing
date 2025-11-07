import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { supabaseAdmin } from "./lib/supabase"

// 환경 변수 검증 및 에러 처리
const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET;
const KAKAO_CLIENT_ID = process.env.AUTH_KAKAO_ID;
const KAKAO_CLIENT_SECRET = process.env.AUTH_KAKAO_SECRET;
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

if (!KAKAO_CLIENT_ID || !KAKAO_CLIENT_SECRET) {
  console.warn('[auth] ⚠️ Missing: AUTH_KAKAO_ID or AUTH_KAKAO_SECRET (Kakao login disabled)');
} else {
  console.log('[auth] ✅ Kakao OAuth credentials loaded');
}

if (AUTH_SECRET) {
  console.log('[auth] ✅ AUTH_SECRET loaded');
} else {
  console.error('[auth] ❌ AUTH_SECRET missing - Configuration errors will occur!');
}

// 카카오 OAuth Provider 설정
function Kakao(options: OAuthUserConfig<any>): OAuthConfig<any> {
  // 클로저로 clientId와 clientSecret을 미리 저장
  const clientId = options.clientId;
  const clientSecret = options.clientSecret;
  
  // 초기화 시점에 로그 출력
  console.log('[auth] Kakao provider initializing:', {
    has_client_id: !!clientId,
    has_client_secret: !!clientSecret,
    client_id_preview: clientId?.substring(0, 10) + '...'
  });
  
  if (!clientId || !clientSecret) {
    const error = 'Kakao OAuth requires clientId and clientSecret';
    console.error('[auth] ❌', error);
    throw new Error(error);
  }
  
  return {
    id: "kakao",
    name: "Kakao",
    type: "oauth",
    checks: [], // 카카오는 PKCE를 지원하지 않으므로 비활성화
    client: {
      id: clientId as string,
      secret: clientSecret as string,
    },
    authorization: {
      url: "https://kauth.kakao.com/oauth/authorize",
      params: {
        scope: "profile_nickname profile_image account_email",  // 카카오 동의항목: profile이 profile_nickname과 profile_image로 분리됨
        response_type: "code",
        client_id: clientId, // 명시적으로 client_id 추가
      },
    },
    token: {
      url: "https://kauth.kakao.com/oauth/token",
      // NextAuth v5가 기본 토큰 요청을 사용하도록 함
      // client 설정이 제대로 전달되도록 함
    },
    userinfo: {
      url: "https://kapi.kakao.com/v2/user/me",
      async request(context: any) {
        const { provider, tokens } = context;
        console.log('[auth] Kakao userinfo request');
        
        try {
          const response = await fetch(provider.userinfo?.url as string, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('[auth] Kakao userinfo error:', {
              status: response.status,
              statusText: response.statusText,
              error: errorText,
              access_token_preview: tokens.access_token?.substring(0, 20) + '...'
            });
            throw new Error(`Kakao userinfo request failed: ${response.status} ${errorText}`);
          }

          const profile = await response.json();
          console.log('[auth] Kakao userinfo success:', { 
            id: profile.id,
            has_email: !!profile.kakao_account?.email,
            has_nickname: !!profile.kakao_account?.profile?.nickname,
            has_profile: !!profile.kakao_account?.profile
          });
          return profile;
        } catch (error) {
          console.error('[auth] Kakao userinfo request exception:', error);
          throw error;
        }
      },
    },
    profile(profile) {
      try {
        // 카카오 동의항목 변경: profile이 profile_nickname과 profile_image로 분리됨
        // profile_nickname scope로 nickname 접근, profile_image scope로 이미지 접근
        console.log('[auth] Kakao profile mapping:', {
          hasProfile: !!profile,
          hasKakaoAccount: !!profile?.kakao_account,
          profileId: profile?.id,
          email: profile?.kakao_account?.email,
          nickname: profile?.kakao_account?.profile?.nickname
        });

        if (!profile || !profile.id) {
          console.error('[auth] Invalid Kakao profile:', profile);
          throw new Error('Invalid Kakao profile data');
        }

        return {
          id: profile.id.toString(),
          name: profile.kakao_account?.profile?.nickname || profile.kakao_account?.email || "Kakao User",
          email: profile.kakao_account?.email || `${profile.id}@kakao.com`,
          image: profile.kakao_account?.profile?.profile_image_url || profile.kakao_account?.profile?.thumbnail_image_url,
        };
      } catch (error) {
        console.error('[auth] Error in Kakao profile mapping:', error);
        throw error;
      }
    },
  };
}

// NextAuth 설정 전에 환경 변수 재확인
if (!AUTH_SECRET) {
  console.error('[auth] ❌ CRITICAL: AUTH_SECRET is required for NextAuth');
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
  ...(KAKAO_CLIENT_ID && KAKAO_CLIENT_SECRET ? [
    (() => {
      console.log('[auth] Creating Kakao provider with:', {
        has_client_id: !!KAKAO_CLIENT_ID,
        has_client_secret: !!KAKAO_CLIENT_SECRET,
        client_id_preview: KAKAO_CLIENT_ID?.substring(0, 10) + '...'
      });
      return Kakao({
        clientId: KAKAO_CLIENT_ID,
        clientSecret: KAKAO_CLIENT_SECRET,
      });
    })(),
  ] : []),
];

console.log('[auth] NextAuth providers count:', providers.length);
console.log('[auth] Provider IDs:', providers.map(p => p.id));

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  trustHost: true, // Vercel 배포 시 필수
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // 에러 발생 시 로그인 페이지로 리디렉션 (에러 타입은 쿼리 파라미터로 자동 전달됨)
  },
  debug: process.env.NODE_ENV === 'development', // 개발 환경에서만 디버그 모드 활성화
  callbacks: {
    async signIn({ user, account, profile }) {
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
    async jwt({ token, user, account, profile }) {
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
    async session({ session, token }) {
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
  secret: AUTH_SECRET || process.env.AUTH_SECRET, // NextAuth v5에서 필수
  // NEXTAUTH_URL이 없으면 자동으로 감지하지만, 명시적으로 설정하는 것이 좋습니다
  ...(NEXTAUTH_URL ? { basePath: undefined } : {}), // basePath는 자동 감지
})

