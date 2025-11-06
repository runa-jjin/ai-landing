# Supabase 연동 가이드

이 문서는 Supabase 프로젝트를 생성하고 AI 랜딩페이지 생성기와 연동하는 방법을 안내합니다.

## 1단계: Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속 후 로그인/가입
2. **New Project** 클릭
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전(Seoul 권장) 선택
4. **Create new project** 클릭 (1-2분 소요)

## 2단계: 데이터베이스 테이블 생성

1. 생성된 프로젝트 대시보드에서 **SQL Editor** 메뉴 클릭
2. **New Query** 클릭
3. 프로젝트 루트의 `supabase-setup.sql` 파일 내용 전체 복사
4. SQL Editor에 붙여넣기
5. **Run** 버튼 클릭하여 실행

### 생성되는 테이블
- `users`: 사용자 계정
- `accounts`: OAuth 연동 정보 (Google 등)
- `sessions`: NextAuth 세션
- `verification_tokens`: 이메일 인증용
- `user_usage`: ⭐ **사용량 추적** (무료 3회 관리)
- `generated_copies`: 생성된 카피 저장 (선택사항)

## 3단계: API 키 확인

1. 대시보드에서 **Settings > API** 메뉴 클릭
2. 다음 3가지 값을 복사:

### Project URL
```
https://xxxxx.supabase.co
```
→ `.env.local`의 `NEXT_PUBLIC_SUPABASE_URL`

### anon public (공개 키)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI...
```
→ `.env.local`의 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### service_role (서비스 키) ⚠️
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI...
```
→ `.env.local`의 `SUPABASE_SERVICE_ROLE_KEY`

> **중요**: `service_role` 키는 **절대 노출 금지**! 모든 RLS 정책을 우회할 수 있습니다.

## 4단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용 추가:

```bash
# OpenAI API Key (필수)
OPENAI_API_KEY=sk-proj-xxxxx

# NextAuth Secret (필수)
AUTH_SECRET=실행_명령어로_생성한_시크릿
# PowerShell: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Google OAuth (선택사항)
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret

# Supabase (필수)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 결제 URL (선택사항)
NEXT_PUBLIC_PAYMENT_URL=https://qr.kakaopay.com/FaHneA0xp
```

## 5단계: 테스트

1. 서버 실행:
```bash
npm run dev
```

2. `http://localhost:3000` 접속
3. 로그인 버튼 클릭 → Google 로그인 시도
4. 로그인 성공 후 Supabase 대시보드 **Table Editor > users** 확인
5. 사용자 정보가 자동으로 생성되었는지 확인

## 트러블슈팅

### 로그인 후 에러 발생
- Supabase RLS 정책 확인: **Authentication > Policies**
- `supabase-setup.sql`이 정상적으로 실행되었는지 확인

### "Internal Server Error" 발생
- `.env.local` 파일의 `SUPABASE_SERVICE_ROLE_KEY` 확인
- 콘솔에서 에러 로그 확인 (`console.error`)

### Google 로그인 안됨
- Google Cloud Console에서 리디렉션 URI 확인:
  - 개발: `http://localhost:3000/api/auth/callback/google`
  - 배포: `https://yourdomain.com/api/auth/callback/google`

## 사용량 관리 작동 방식

1. 사용자가 로그인하면 `users` 테이블에 자동 저장
2. 첫 카피 생성 시 `user_usage` 테이블에 레코드 생성 (usage_count: 1)
3. 3회 생성 후 → 팝업 표시 (KakaoPay 송금 안내)
4. 결제 확인 후 → Supabase에서 `plan_type`을 'pro' 또는 'agency'로 수동 변경

### 사용량 초기화 (관리자용)
Supabase Dashboard > **SQL Editor**에서 실행:

```sql
-- 특정 사용자 사용량 초기화
UPDATE user_usage 
SET usage_count = 0 
WHERE user_id = 'user-uuid-here';

-- 특정 사용자를 Pro 플랜으로 변경
UPDATE user_usage 
SET plan_type = 'pro', usage_count = 0 
WHERE user_id = 'user-uuid-here';
```

## 프로덕션 배포 시

1. Vercel 환경 변수에 `.env.local` 모든 값 추가
2. Supabase Dashboard > **Settings > API > URL Configuration**:
   - **Site URL**: `https://yourdomain.com`
   - **Redirect URLs**: `https://yourdomain.com/api/auth/callback/google` 추가
3. Google OAuth 리디렉션 URI에 프로덕션 URL 추가
4. RLS 정책 재검토 (보안 강화)

## 도움이 필요하신가요?

- [Supabase 공식 문서](https://supabase.com/docs)
- [NextAuth.js Supabase Adapter](https://authjs.dev/reference/adapter/supabase)

