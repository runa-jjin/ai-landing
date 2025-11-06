# 배포 완료 체크리스트 ✅

**프로젝트**: AI 랜딩페이지 문구 생성기  
**도메인**: https://www.deepaiauto.com/  
**배포 플랫폼**: Vercel  
**배포일**: 2025년 11월

---

## 🎉 배포 완료!

도메인이 성공적으로 연결되었습니다:
- ✅ Vercel 배포 완료
- ✅ 가비아 도메인(`deepaiauto.com`) 연결
- ✅ HTTPS 보안 연결
- ✅ 웹사이트 정상 작동

---

## ⚙️ 필수 최종 설정

### 1. Google OAuth 리디렉션 URI 확인

Google 로그인이 정상 작동하려면 다음 설정이 **필수**입니다:

#### 1.1 Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/) 로그인
2. 프로젝트 선택
3. **API 및 서비스** → **사용자 인증 정보** 메뉴

#### 1.2 OAuth 2.0 클라이언트 ID 수정
OAuth 2.0 클라이언트 선택 → **승인된 리디렉션 URI** 섹션

**다음 URI들이 모두 추가되어 있는지 확인**:

```
https://deepaiauto.com/api/auth/callback/google
https://www.deepaiauto.com/api/auth/callback/google
```

⚠️ **주의사항**:
- `https://`로 시작 (필수)
- 슬래시(`/`) 정확히 입력
- `www` 포함 버전과 미포함 버전 **둘 다** 추가

#### 1.3 저장
**저장** 클릭 → 설정 반영까지 약 5분 소요

---

### 2. Vercel 환경 변수 확인

#### 2.1 Vercel Dashboard 접속
1. [Vercel Dashboard](https://vercel.com/dashboard)
2. `ai-landing` 프로젝트 선택
3. **Settings** → **Environment Variables**

#### 2.2 NEXTAUTH_URL 확인

**다음 환경 변수가 올바르게 설정되어 있는지 확인**:

```bash
NEXTAUTH_URL=https://www.deepaiauto.com
```

또는

```bash
NEXTAUTH_URL=https://deepaiauto.com
```

#### 2.3 재배포 (환경 변수 변경 시)

환경 변수를 수정했다면 **반드시 재배포**:

1. Vercel Dashboard → **Deployments**
2. 최신 배포 → **⋯** (점 3개) 클릭
3. **Redeploy** 선택
4. **Redeploy** 확인

---

### 3. 전체 환경 변수 체크리스트

모든 환경 변수가 설정되어 있는지 확인:

```bash
# ✅ NextAuth
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=your-random-secret-32-characters-or-more
NEXTAUTH_URL=https://www.deepaiauto.com

# ✅ Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ✅ OpenAI
OPENAI_API_KEY=sk-xxxxx

# ✅ Payment (선택사항)
NEXT_PUBLIC_PAYMENT_URL=https://qr.kakaopay.com/xxxxx
```

---

## 🧪 기능 테스트

### 테스트 1: 로그인

1. https://www.deepaiauto.com/ 접속
2. **"로그인"** 버튼 클릭
3. Google 계정으로 로그인
4. 로그인 성공 후 이메일 표시 확인

**예상 결과**:
- ✅ Google 로그인 페이지로 이동
- ✅ 계정 선택 후 사이트로 리다이렉트
- ✅ 우측 상단에 이메일 표시

**실패 시**:
- Google OAuth 리디렉션 URI 재확인
- Vercel 로그 확인 (Dashboard → Deployments → Functions 탭)

---

### 테스트 2: 카피 생성 기능

1. 로그인 상태에서 브리프 입력:
   - **서비스명**: 테스트 서비스
   - **업종**: SaaS
   - **핵심 가치**: 편리함
   - **타겟 고객**: 스타트업
   - **차별점**: AI 자동화
   - **톤앤매너**: 따뜻함

2. **"즉시 생성"** 버튼 클릭

3. AI가 생성한 카피 확인

**예상 결과**:
- ✅ 로딩 인디케이터 표시
- ✅ 3~10초 내 결과 생성
- ✅ 히어로, 서브헤딩, CTA 등 여러 카피 표시

**실패 시**:
- OpenAI API 키 확인
- API 사용량 한도 확인 (https://platform.openai.com/usage)
- Vercel 로그에서 에러 확인

---

### 테스트 3: 사용량 제한

1. 로그인 상태에서 **3회** 카피 생성
2. 4번째 생성 시도

**예상 결과**:
- ✅ 3회까지 정상 생성
- ✅ 4번째부터 결제 안내 모달 표시
- ✅ Supabase `user_usage` 테이블에 기록

**확인 방법**:
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 → **Table Editor**
3. `user_usage` 테이블 확인
4. 본인 이메일로 기록된 `usage_count` 확인

---

### 테스트 4: 복사 기능

1. 생성된 카피 카드에서 **"복사"** 버튼 클릭

**예상 결과**:
- ✅ 클립보드에 복사됨
- ✅ "복사됨!" 메시지 표시
- ✅ 다른 곳에 붙여넣기 가능

---

## 🔒 보안 체크리스트

- [ ] HTTPS 연결 확인 (자물쇠 아이콘)
- [ ] 환경 변수 파일(`.env.local`)이 `.gitignore`에 포함
- [ ] GitHub에 환경 변수가 커밋되지 않았는지 확인
- [ ] Supabase RLS (Row Level Security) 활성화 확인
- [ ] API 키들이 외부에 노출되지 않음

---

## 🚀 성능 체크리스트

### Vercel Analytics 활성화 (선택사항)

1. Vercel Dashboard → 프로젝트 선택
2. **Analytics** 탭
3. **Enable** 클릭

**제공 기능**:
- 방문자 수 통계
- 페이지 로딩 속도
- Core Web Vitals

### Lighthouse 점수 확인

Chrome 브라우저에서:
1. https://www.deepaiauto.com/ 접속
2. F12 (개발자 도구)
3. **Lighthouse** 탭
4. **Generate report** 클릭

**목표 점수**:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 📊 모니터링

### Vercel 로그 확인

```bash
# 터미널에서
vercel logs https://www.deepaiauto.com
```

또는 Vercel Dashboard:
- Deployments → 최신 배포 클릭 → **Functions** 탭

### Supabase 사용량 확인

1. [Supabase Dashboard](https://supabase.com/dashboard)
2. 프로젝트 선택 → **Settings** → **Usage**
3. Database, API requests 확인

### OpenAI 사용량 확인

1. [OpenAI Platform](https://platform.openai.com/usage)
2. API 사용량 및 비용 확인

---

## 🐛 트러블슈팅

### ❌ Google 로그인 실패

**증상**: "리디렉션 URI 불일치" 에러

**해결**:
1. Google Cloud Console에서 URI 재확인:
   ```
   https://www.deepaiauto.com/api/auth/callback/google
   https://deepaiauto.com/api/auth/callback/google
   ```
2. 정확히 입력했는지 확인 (오타, 공백 없음)
3. 5분 대기 후 재시도

---

### ❌ 카피 생성 실패

**증상**: 로딩 후 에러 메시지

**확인 사항**:
1. **OpenAI API 키**: 유효한지 확인
2. **사용량 한도**: https://platform.openai.com/usage
3. **크레딧**: 잔액이 있는지 확인
4. **Vercel 로그**: 에러 메시지 확인

---

### ❌ Supabase 연결 실패

**증상**: 사용량이 기록되지 않음

**해결**:
1. Supabase URL과 키 재확인
2. RLS 정책 확인 (`supabase-setup.sql` 재실행)
3. `SUPABASE_SERVICE_ROLE_KEY` 확인

---

### ❌ 환경 변수가 반영되지 않음

**해결**:
1. Vercel Dashboard → Settings → Environment Variables
2. 모든 변수 재확인
3. **Production, Preview, Development** 모두 체크
4. **Redeploy** 실행

---

## 📱 다음 단계 (선택사항)

### 1. SEO 최적화

`app/layout.tsx`에 메타데이터 추가:

```typescript
export const metadata = {
  title: '랜딩페이지 문구 자동 생성기 | AI 카피라이팅',
  description: '서비스 정보를 입력하면 브랜드에 맞는 문구를 AI가 자동으로 생성합니다.',
  keywords: 'AI, 카피라이팅, 랜딩페이지, 문구 생성기',
  openGraph: {
    title: '랜딩페이지 문구 자동 생성기',
    description: 'AI가 자동으로 생성하는 브랜드 맞춤 카피',
    url: 'https://www.deepaiauto.com',
    siteName: '랜딩페이지 문구 생성기',
  },
}
```

### 2. Google Analytics 추가

GA4 추적 코드를 `app/layout.tsx`에 추가

### 3. 오픈그래프 이미지

`public/og-image.png` 추가하여 SNS 공유 시 이미지 표시

### 4. 사이트맵 생성

SEO를 위한 sitemap.xml 추가

---

## ✅ 최종 체크리스트

### 배포 완료
- [x] Vercel 배포 성공
- [x] 가비아 도메인 연결
- [x] HTTPS 보안 연결
- [x] 웹사이트 정상 작동

### 필수 설정
- [ ] Google OAuth 리디렉션 URI 추가
- [ ] NEXTAUTH_URL 환경 변수 확인
- [ ] 모든 환경 변수 설정 완료

### 기능 테스트
- [ ] Google 로그인 작동
- [ ] 카피 생성 기능 작동
- [ ] 사용량 카운트 기록
- [ ] 3회 제한 작동
- [ ] 복사 기능 작동

### 데이터베이스
- [ ] Supabase 연결 확인
- [ ] user_usage 테이블 기록
- [ ] RLS 정책 작동

### 보안
- [ ] HTTPS 연결
- [ ] 환경 변수 보안
- [ ] .gitignore 설정

### 선택사항
- [ ] Vercel Analytics 활성화
- [ ] Lighthouse 점수 확인
- [ ] SEO 최적화
- [ ] Google Analytics 추가

---

## 🎯 빠른 링크

- **웹사이트**: https://www.deepaiauto.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google Cloud Console**: https://console.cloud.google.com/
- **Supabase Dashboard**: https://supabase.com/dashboard
- **OpenAI Platform**: https://platform.openai.com/

---

## 📞 지원

문제가 발생하면:
1. 이 체크리스트의 트러블슈팅 섹션 참고
2. Vercel 로그 확인
3. Supabase 로그 확인
4. GitHub Issues에 문의

---

## 🎉 축하합니다!

AI 랜딩페이지 문구 생성기가 성공적으로 배포되었습니다!

**deepaiauto.com**에서 서비스를 시작하세요! 🚀

