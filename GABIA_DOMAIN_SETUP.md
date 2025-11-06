# 가비아 도메인 연결 가이드

## 📋 전체 프로세스

1. Vercel에 프로젝트 배포
2. Vercel에서 커스텀 도메인 추가
3. 가비아에서 DNS 설정
4. Google OAuth 및 환경 변수 업데이트
5. 배포 확인

---

## 🚀 1단계: Vercel 프로젝트 배포

### 1.1 Vercel 가입 및 프로젝트 생성

1. [Vercel](https://vercel.com) 접속
2. **GitHub 계정으로 로그인** (권장)
3. **"New Project"** 클릭
4. **GitHub 저장소 선택**: `runa-jjin/ai-landing`
5. **Import** 클릭

### 1.2 환경 변수 설정

⚠️ **중요**: 배포 전에 환경 변수를 먼저 설정해야 합니다!

Vercel 프로젝트 설정 화면에서 **"Environment Variables"** 섹션:

```bash
# NextAuth
AUTH_GOOGLE_ID=your-google-client-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=your-random-secret-key-at-least-32-characters-long
NEXTAUTH_URL=https://your-domain.com  # 🔥 가비아 도메인으로 변경

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Payment (선택사항)
NEXT_PUBLIC_PAYMENT_URL=https://qr.kakaopay.com/your-code
```

**체크 항목**:
- ✅ Production
- ✅ Preview
- ✅ Development

### 1.3 배포 시작

**"Deploy"** 클릭 → 자동 배포 시작

배포 완료 후 기본 URL 확인:
```
https://ai-landing-xxxxx.vercel.app
```

---

## 🌐 2단계: Vercel에서 커스텀 도메인 추가

### 2.1 도메인 추가

1. **Vercel Dashboard** → 프로젝트 선택
2. **Settings** → **Domains** 메뉴
3. **"Add Domain"** 클릭
4. 가비아 도메인 입력:
   ```
   yoursite.com
   ```
5. **Add** 클릭

### 2.2 DNS 설정 정보 확인

Vercel이 두 가지 설정 방법을 제공합니다:

#### 옵션 A: Vercel 네임서버 사용 (권장 ⭐)
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### 옵션 B: A/CNAME 레코드 직접 설정
Vercel이 제공하는 IP 주소와 CNAME 값을 확인하세요.

---

## 🔧 3단계: 가비아 DNS 설정

### 옵션 A: Vercel 네임서버 사용 (권장 ⭐)

#### 3.1 가비아 접속
1. [가비아 My가비아](https://my.gabia.com) 로그인
2. **서비스 관리** → **도메인**
3. 해당 도메인 선택 → **관리툴** 클릭

#### 3.2 네임서버 변경
1. **네임서버 설정** 메뉴
2. **"네임서버 변경"** 선택
3. **"다른 네임서버 사용"** 선택
4. 네임서버 입력:
   ```
   1차 네임서버: ns1.vercel-dns.com
   2차 네임서버: ns2.vercel-dns.com
   ```
5. **적용** 클릭

#### 장점
- ✅ Vercel이 자동으로 SSL 인증서 관리
- ✅ www 리다이렉트 자동 설정
- ✅ CDN 최적화
- ✅ 설정이 간단함

---

### 옵션 B: A/CNAME 레코드 직접 설정

#### 3.1 가비아 DNS 관리
1. [가비아 My가비아](https://my.gabia.com) 로그인
2. **서비스 관리** → **도메인**
3. 해당 도메인 선택 → **관리툴** → **DNS 정보**

#### 3.2 DNS 레코드 추가

**기존 레코드 확인**:
- 기존 A 레코드가 있다면 삭제 또는 수정

**새 레코드 추가**:

| 타입  | 호스트명 | 값/위치              | TTL  |
|-------|----------|----------------------|------|
| A     | @        | 76.76.21.21          | 3600 |
| CNAME | www      | cname.vercel-dns.com | 3600 |

⚠️ **중요**: 
- Vercel Dashboard에서 제공하는 **정확한 IP 주소**를 사용하세요
- IP 주소는 `76.76.21.21` 또는 다른 값일 수 있습니다

#### 3.3 레코드 저장
**"적용"** 또는 **"저장"** 클릭

---

## ⚙️ 4단계: Google OAuth 업데이트

### 4.1 승인된 리디렉션 URI 추가

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택
3. **API 및 서비스** → **사용자 인증 정보**
4. OAuth 2.0 클라이언트 ID 선택
5. **승인된 리디렉션 URI** 추가:
   ```
   https://yoursite.com/api/auth/callback/google
   https://www.yoursite.com/api/auth/callback/google
   ```
6. **저장**

### 4.2 Vercel 환경 변수 업데이트

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. `NEXTAUTH_URL` 수정:
   ```
   NEXTAUTH_URL=https://yoursite.com
   ```
3. **Save**

### 4.3 재배포

환경 변수 변경 후 **반드시 재배포**:

1. Vercel Dashboard → **Deployments**
2. 최신 배포 → **⋯** (점 3개) → **Redeploy**
3. **Redeploy** 확인

---

## ✅ 5단계: 배포 확인

### 5.1 DNS 전파 확인

DNS 전파는 **10분~48시간** 소요 (보통 1~2시간)

**확인 방법 1: 터미널**
```bash
# Windows PowerShell
nslookup yoursite.com

# 결과 예시:
# Name: yoursite.com
# Address: 76.76.21.21
```

**확인 방법 2: 온라인 도구**
- [DNS Checker](https://dnschecker.org/)
- 도메인 입력 → 전 세계 전파 상태 확인

### 5.2 웹사이트 접속

브라우저에서 도메인 접속:
```
https://yoursite.com
```

### 5.3 기능 테스트 체크리스트

- [ ] 도메인으로 사이트 접속
- [ ] HTTPS 연결 확인 (자물쇠 아이콘)
- [ ] Google 로그인 작동
- [ ] 카피 생성 기능 테스트
- [ ] 사용량 카운트 확인

---

## 🐛 트러블슈팅

### ❌ "Domain not found" 또는 접속 불가

**원인**: DNS 전파 미완료

**해결**:
1. DNS 설정이 올바른지 재확인
2. 1~2시간 대기 후 재시도
3. 브라우저 캐시 삭제 (Ctrl + F5)

---

### ❌ SSL 인증서 오류

**원인**: Vercel SSL 발급 대기 중

**해결**:
1. Vercel Dashboard → Domains → SSL 상태 확인
2. 보통 자동으로 발급 (5~10분)
3. 문제 지속 시: Support에 문의

---

### ❌ Google 로그인 실패

**원인**: OAuth 리디렉션 URI 미설정

**해결**:
1. Google Cloud Console에서 URI 재확인
2. 정확히 입력했는지 확인:
   ```
   https://yoursite.com/api/auth/callback/google
   ```
3. Google 설정 반영까지 5분 대기

---

### ❌ 환경 변수가 반영되지 않음

**원인**: 재배포 누락

**해결**:
1. Vercel Dashboard → Deployments
2. 최신 배포 → Redeploy
3. Production 환경인지 확인

---

## 📊 완료 체크리스트

### 배포 전
- [ ] `.env.local` 파일에 모든 환경 변수 준비
- [ ] 로컬에서 `npm run build` 테스트
- [ ] Google OAuth 클라이언트 ID/Secret 발급
- [ ] Supabase 프로젝트 설정 완료
- [ ] OpenAI API 키 발급

### Vercel 배포
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 모두 입력
- [ ] 배포 성공 확인
- [ ] Vercel 기본 URL로 접속 테스트

### 도메인 연결
- [ ] Vercel에 커스텀 도메인 추가
- [ ] 가비아에서 DNS 설정 (네임서버 또는 A/CNAME)
- [ ] DNS 전파 확인 (nslookup)
- [ ] HTTPS 접속 확인

### 최종 설정
- [ ] Google OAuth 리디렉션 URI 추가 (도메인)
- [ ] `NEXTAUTH_URL` 환경 변수 업데이트
- [ ] Vercel 재배포
- [ ] 로그인 테스트
- [ ] 전체 기능 테스트

---

## 🎯 빠른 참고

### 가비아 도메인 관리 페이지
```
https://my.gabia.com/
→ 서비스 관리 → 도메인 → 관리툴
```

### Vercel Dashboard
```
https://vercel.com/dashboard
→ 프로젝트 선택 → Settings → Domains
```

### Google Cloud Console
```
https://console.cloud.google.com/
→ API 및 서비스 → 사용자 인증 정보
```

---

## 📞 추가 도움

- Vercel 공식 문서: https://vercel.com/docs/concepts/projects/domains
- 가비아 고객센터: 1544-4755
- Vercel Discord: https://vercel.com/discord

---

## 💡 팁

1. **www 서브도메인**: Vercel이 자동으로 `www.yoursite.com`도 설정합니다
2. **DNS 전파**: 보통 10분~2시간이면 완료됩니다
3. **SSL 자동 발급**: Vercel이 Let's Encrypt SSL 자동 발급
4. **성능 최적화**: Vercel CDN이 자동으로 전 세계 배포

구매하신 **가비아 도메인 이름**을 알려주시면 더 구체적인 설정 가이드를 제공해드릴 수 있습니다! 🚀

