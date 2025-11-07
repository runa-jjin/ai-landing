import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers"
import { supabaseAdmin } from "./lib/supabase"

// 환경 변수 검증
const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET;
const KAKAO_CLIENT_ID = process.env.AUTH_KAKAO_ID;
const KAKAO_CLIENT_SECRET = process.env.AUTH_KAKAO_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;

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

if (!AUTH_SECRET) {
  console.error('[auth] ❌ Missing: AUTH_SECRET');
} else {
  console.log('[auth] ✅ AUTH_SECRET loaded');
}

// 카카오 OAuth Provider 설정
function Kakao(options: OAuthUserConfig<any>): OAuthConfig<any> {
  return {
    id: "kakao",
    name: "Kakao",
    type: "oauth",
    authorization: {
      url: "https://kauth.kakao.com/oauth/authorize",
      params: {
        scope: "profile_nickname profile_image account_email",
        response_type: "code",
      },
    },
    token: {
      url: "https://kauth.kakao.com/oauth/token",
      async request(context: any) {
        const { provider, params, client } = context;
        const response = await fetch(provider.token?.url as string, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: client.id,
            client_secret: client.secret,
            code: params.code as string,
            redirect_uri: params.redirect_uri as string,
          }),
        });
        return { tokens: await response.json() };
      },
    },
    userinfo: "https://kapi.kakao.com/v2/user/me",
    client: {
      id: options.clientId!,
      secret: options.clientSecret!,
    },
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: profile.kakao_account?.profile?.nickname || profile.kakao_account?.email || "Kakao User",
        email: profile.kakao_account?.email || `${profile.id}@kakao.com`,
        image: profile.kakao_account?.profile?.profile_image_url,
      };
    },
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
      Kakao({
        clientId: KAKAO_CLIENT_ID,
        clientSecret: KAKAO_CLIENT_SECRET,
      }),
    ] : []),
  ],
  trustHost: true, // Vercel 배포 시 필수
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin', // 에러 발생 시 로그인 페이지로 리디렉션
  },
  debug: true, // 디버그 모드 활성화
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('[auth] Sign in callback triggered for:', user.email);
        
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
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  secret: AUTH_SECRET,
})

