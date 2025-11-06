# 배포 가이드

## 🚀 Vercel 배포 (권장)

### 1단계: Vercel 계정 연동

1. [Vercel](https://vercel.com) 접속 및 로그인
2. "New Project" 클릭
3. GitHub 저장소 연동 (또는 Git 저장소 import)

### 2단계: 환경 변수 설정

Vercel Dashboard → Project Settings → Environment Variables에서 추가:

```bash
# NextAuth
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=your-random-secret-key-at-least-32-characters-long
NEXTAUTH_URL=https://your-domain.vercel.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Payment (선택사항)
NEXT_PUBLIC_PAYMENT_URL=https://qr.kakaopay.com/your-code
```

⚠️ **중요**: 모든 환경 변수를 Production, Preview, Development에 모두 체크!

### 3단계: Google OAuth 리디렉션 URI 추가

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택 → API 및 서비스 → OAuth 2.0 클라이언트 ID
3. **승인된 리디렉션 URI** 추가:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```

### 4단계: 배포

Vercel에서 자동으로 배포됩니다!

---

## 🔧 배포 후 확인 사항

### 1. 로그인 테스트
- [ ] Google 로그인 작동
- [ ] 로그인 후 이메일 표시
- [ ] Supabase user_usage 테이블 기록 확인

### 2. 기능 테스트
- [ ] 카피 생성 기능 작동
- [ ] 사용량 카운트 증가
- [ ] 3회 사용 후 결제 페이지 표시

### 3. 성능 확인
- [ ] 페이지 로딩 속도
- [ ] 이미지 최적화
- [ ] API 응답 시간

---

## 🐛 트러블슈팅

### 로그인 실패

**문제**: Google 로그인 시 에러 발생

**해결**:
1. Google OAuth 리디렉션 URI 확인
2. `NEXTAUTH_URL` 환경 변수 확인
3. Vercel 로그 확인 (Dashboard → Deployments → Logs)

### 환경 변수 미적용

**문제**: 환경 변수가 반영되지 않음

**해결**:
1. Vercel Dashboard에서 환경 변수 재확인
2. Redeploy (Deployments → ... → Redeploy)

### Supabase 연결 실패

**문제**: user_usage에 기록되지 않음

**해결**:
1. Supabase RLS 정책 확인
2. `SUPABASE_SERVICE_ROLE_KEY` 확인
3. Vercel 로그에서 에러 확인

---

## 📊 모니터링

### Vercel Analytics (선택사항)

Vercel Dashboard → Analytics에서 활성화

### 에러 로깅

Vercel 로그:
```bash
vercel logs [deployment-url]
```

---

## 🔄 업데이트 배포

### 자동 배포

GitHub에 push하면 자동으로 Vercel이 배포합니다:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### 수동 재배포

Vercel Dashboard → Deployments → ... → Redeploy

---

## 🌐 커스텀 도메인 설정 (선택사항)

1. Vercel Dashboard → Project Settings → Domains
2. 도메인 추가
3. DNS 설정 (Vercel이 안내)
4. Google OAuth 리디렉션 URI에 새 도메인 추가
5. `NEXTAUTH_URL` 환경 변수 업데이트

---

## ✅ 배포 체크리스트

배포 전:
- [ ] 로컬에서 `npm run build` 성공
- [ ] 모든 기능 테스트 완료
- [ ] 환경 변수 준비 완료
- [ ] Google OAuth 설정 완료

배포 후:
- [ ] 배포 URL 확인
- [ ] Google OAuth 리디렉션 URI 추가
- [ ] 로그인 테스트
- [ ] 카피 생성 테스트
- [ ] Supabase 기록 확인

---

## 📞 도움이 필요하신가요?

- Vercel 문서: https://vercel.com/docs
- NextAuth 문서: https://next-auth.js.org
- Supabase 문서: https://supabase.com/docs

