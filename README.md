# 랜딩페이지 문구 자동 생성기

Next.js 14(App Router), OpenAI API, Supabase를 활용해 서비스 정보만으로 랜딩페이지 카피를 즉시 생성하는 웹 애플리케이션입니다.

## 주요 기능
- 서비스명, 업종, 핵심 가치 등 브리프 입력 후 헤드라인, 혜택, 고객 사례, FAQ 등 완성형 카피 생성
- JSON 스키마 강제 프롬프트로 일관된 응답 확보 및 1회 재시도 로직
- 카드 형식 결과 및 미리보기 탭 제공, 각 섹션별 클립보드 복사
- NextAuth.js + Supabase 기반 인증 및 사용량 관리 (무료 3회 제한)
- Google OAuth 소셜 로그인 지원
- Zustand 기반 전역 상태, zod로 클라이언트/서버 검증
- 서버 액션에 로깅 미들웨어 적용(프롬프트 길이, 토큰 수, 응답 시간 출력)

## 빠른 시작

### 1. 패키지 설치
```bash
npm install
```

### 2. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 가입 후 새 프로젝트 생성
2. **SQL Editor**에서 `supabase-setup.sql` 파일 내용 실행
3. **Settings > API**에서 다음 정보 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ 절대 노출 금지

### 3. Google OAuth 설정 (선택사항)
1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. **APIs & Services > Credentials > Create OAuth 2.0 Client ID**
3. 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google` (개발용)
4. 발급받은 **Client ID**와 **Client Secret**를 `.env.local`에 추가

### 4. 환경 변수 설정
`.env.local` 파일에 아래 값을 설정하세요.

```bash
# OpenAI API Key (필수)
OPENAI_API_KEY=sk-proj-xxxxx

# NextAuth (필수)
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

### 5. 서버 실행
```bash
npm run dev
```

## 프로젝트 구조

### 핵심 파일
- `auth.ts`: NextAuth 설정 + Supabase Adapter
- `lib/supabase.ts`: Supabase 클라이언트 (일반/관리자)
- `lib/user-usage.ts`: DB 기반 사용량 관리 (3회 무료 체험)
- `app/actions/generateCopy.ts`: OpenAI API 호출 + 사용량 검증
- `app/actions/getUserUsage.ts`: 사용자 사용량 조회 서버 액션
- `lib/prompt.ts`: JSON 스키마 강제 프롬프트
- `store/useAppStore.ts`: Zustand 전역 상태 (폼 데이터)

### 데이터베이스 테이블 (Supabase)
- `users`: 사용자 계정
- `accounts`: OAuth 연동 정보
- `sessions`: NextAuth 세션
- `user_usage`: **사용량 추적** (usage_count, plan_type)
- `generated_copies`: 생성된 카피 저장 (선택사항)

## 개발 메모
- 서버 액션은 zod로 입력을 검증한 뒤 OpenAI GPT-4o-mini 모델에 요청
- Supabase RLS(Row Level Security)로 사용자별 데이터 보호
- NextAuth의 Supabase Adapter가 자동으로 사용자/세션 관리
- 사용량은 `user_usage` 테이블에서 관리 (무료: 3회, Pro/Agency: 무제한 가능)

## 테스트용 샘플 데이터
입력 폼 상단의 "샘플 데이터" 버튼(뷰티/교육/SaaS)을 클릭하면 테스트 데이터가 자동으로 채워집니다.

## 배포
Vercel에 배포 시:
1. **Environment Variables**에 모든 `.env.local` 값 추가
2. `NEXT_PUBLIC_SUPABASE_URL`의 승인된 도메인을 Supabase Dashboard에 추가
3. Google OAuth의 리디렉션 URI를 배포 URL로 업데이트

## 프로덕션 체크리스트
- [ ] Supabase RLS 정책 재검토
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 절대 노출 금지 확인
- [ ] Google OAuth 프로덕션 도메인 등록
- [ ] 유료 플랜 결제 로직 구현 (plan_type 업데이트)
- [ ] 에러 로깅 시스템 (Sentry 등) 연동