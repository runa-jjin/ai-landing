import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { supabaseAdmin } from "./lib/supabase"

// 환경 변수 검증
const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error('[auth] ❌ Missing: AUTH_GOOGLE_ID or AUTH_GOOGLE_SECRET');
} else {
  console.log('[auth] ✅ Google OAuth credentials loaded');
}

if (!AUTH_SECRET) {
  console.error('[auth] ❌ Missing: AUTH_SECRET');
} else {
  console.log('[auth] ✅ AUTH_SECRET loaded');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET ? [
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
  ] : [],
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

        // 1. users 테이블에 사용자 정보 upsert
        const { error: userError } = await supabaseAdmin
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            email_verified: profile?.email_verified ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'email'
          });

        if (userError) {
          console.error('[auth] Error upserting user:', userError);
        } else {
          console.log(`[auth] User upserted: ${user.email}`);
        }

        // 2. user_usage 테이블에 초기 레코드 생성 (없으면)
        const { data: usageData } = await supabaseAdmin
          .from('user_usage')
          .select('id')
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
          } else {
            console.log(`[auth] User usage created for: ${user.email}`);
          }
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

