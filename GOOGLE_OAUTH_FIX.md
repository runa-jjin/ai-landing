# Google OAuth 오류 해결 가이드

## ❌ 오류 메시지
```
액세스 차단됨: AI-landing의 요청이 잘못되었습니다
400 오류: redirect_uri_mismatch
```

## 🔍 원인
Google Cloud Console에 리디렉션 URI가 설정되지 않았거나, 잘못된 URI가 설정되어 있습니다.

---

## ✅ 해결 방법 (5분 소요)

### 1단계: Google Cloud Console 접속

1. **[Google Cloud Console](https://console.cloud.google.com/)** 접속
2. Gmail 계정(`tears0427@gmail.com`)으로 로그인

### 2단계: 프로젝트 선택

화면 상단의 **프로젝트 선택** 드롭다운 클릭
- "AI-landing" 또는 OAuth를 설정한 프로젝트 선택

### 3단계: OAuth 설정 페이지 이동

왼쪽 메뉴:
1. **API 및 서비스** 클릭
2. **사용자 인증 정보** 클릭

### 4단계: OAuth 2.0 클라이언트 ID 수정

**OAuth 2.0 클라이언트 ID** 섹션에서:
1. 생성된 클라이언트 ID 클릭 (예: "Web client 1")
2. 또는 우측의 **연필 아이콘 (수정)** 클릭

### 5단계: 승인된 리디렉션 URI 추가

**승인된 리디렉션 URI** 섹션:

1. **"+ URI 추가"** 버튼 클릭

2. 다음 URI를 **정확히** 입력 (복사-붙여넣기 권장):

```
https://www.deepaiauto.com/api/auth/callback/google
```

3. **"+ URI 추가"** 버튼 다시 클릭

4. 두 번째 URI 입력:

```
https://deepaiauto.com/api/auth/callback/google
```

⚠️ **중요 체크사항**:
- ✅ `https://`로 시작 (http 아님!)
- ✅ 끝에 슬래시(`/`) 없음
- ✅ 대소문자 정확히 일치
- ✅ 공백 없음
- ✅ `www` 버전과 미포함 버전 **둘 다** 추가

### 6단계: 저장

1. 화면 하단의 **"저장"** 버튼 클릭
2. "OAuth 클라이언트가 업데이트되었습니다" 메시지 확인

### 7단계: 대기 (중요!)

Google 설정 반영까지 **5~10분** 소요
- 즉시 시도하면 같은 오류가 발생할 수 있음
- 커피 한 잔 ☕ 마시고 오세요!

---

## 🧪 테스트

### 5~10분 후:

1. **브라우저 캐시 삭제**:
   - Chrome: `Ctrl + Shift + Delete`
   - 쿠키 및 캐시 삭제

2. **https://www.deepaiauto.com/** 재접속

3. **Google 로그인** 버튼 클릭

4. Google 계정 선택

**예상 결과**:
✅ 정상적으로 로그인 완료
✅ deepaiauto.com으로 리다이렉트
✅ 우측 상단에 이메일 표시

---

## 📸 스크린샷 가이드

### Google Cloud Console - OAuth 설정 화면

```
┌─────────────────────────────────────────┐
│ OAuth 2.0 클라이언트 ID 수정            │
├─────────────────────────────────────────┤
│ 이름: Web client 1                      │
│                                         │
│ 승인된 자바스크립트 원본                │
│ [빈 칸]                                 │
│ + URI 추가                              │
│                                         │
│ 승인된 리디렉션 URI ⬅️ 여기!           │
│ ┌─────────────────────────────────────┐ │
│ │ https://www.deepaiauto.com/api/     │ │
│ │   auth/callback/google              │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ https://deepaiauto.com/api/         │ │
│ │   auth/callback/google              │ │
│ └─────────────────────────────────────┘ │
│ + URI 추가                              │
│                                         │
│         [취소]  [저장] ⬅️ 클릭!        │
└─────────────────────────────────────────┘
```

---

## 🔧 추가 확인 사항

### Vercel 환경 변수 확인

만약 여전히 문제가 있다면:

1. **[Vercel Dashboard](https://vercel.com/dashboard)** 접속
2. `ai-landing` 프로젝트 선택
3. **Settings** → **Environment Variables**
4. `NEXTAUTH_URL` 값 확인:

```bash
NEXTAUTH_URL=https://www.deepaiauto.com
```

또는

```bash
NEXTAUTH_URL=https://deepaiauto.com
```

**주의**: `www` 포함 여부를 일관되게 유지!

### 환경 변수 변경 시

1. Vercel Dashboard → **Deployments**
2. 최신 배포 → **⋯** (점 3개)
3. **Redeploy** 클릭

---

## 🐛 여전히 안 되는 경우

### 체크리스트

- [ ] Google Cloud Console에서 URI를 정확히 입력했는가?
- [ ] `https://`로 시작하는가?
- [ ] 끝에 불필요한 슬래시가 없는가?
- [ ] 5~10분 대기했는가?
- [ ] 브라우저 캐시를 삭제했는가?
- [ ] `www` 버전과 미포함 버전 둘 다 추가했는가?

### 오타 주의!

**잘못된 예시** ❌:
```
http://www.deepaiauto.com/api/auth/callback/google  (http)
https://www.deepaiauto.com/api/auth/callback/google/  (끝에 /)
https://deepaiauto.com/api/auth/callback/google/  (끝에 /)
https://www.deepaiauto.com /api/auth/callback/google  (공백)
```

**올바른 예시** ✅:
```
https://www.deepaiauto.com/api/auth/callback/google
https://deepaiauto.com/api/auth/callback/google
```

---

## 📊 현재 설정해야 할 URI 요약

귀하의 도메인(`deepaiauto.com`)에 필요한 리디렉션 URI:

```
1. https://www.deepaiauto.com/api/auth/callback/google
2. https://deepaiauto.com/api/auth/callback/google
```

**선택사항** (로컬 개발용):
```
3. http://localhost:3000/api/auth/callback/google
```

---

## ✅ 완료 후 확인

로그인 성공 시:
- ✅ Google 계정 선택 페이지 표시
- ✅ deepaiauto.com으로 자동 리다이렉트
- ✅ 우측 상단에 `tears0427@gmail.com` 표시
- ✅ "로그인" 버튼이 "로그아웃"으로 변경
- ✅ 카피 생성 기능 사용 가능

---

## 🆘 추가 도움

여전히 문제가 있다면:

1. Google Cloud Console 스크린샷 공유
2. Vercel 배포 로그 확인:
   - Vercel Dashboard → Deployments → Functions 탭
3. 브라우저 개발자 도구 콘솔 확인:
   - F12 → Console 탭 → 에러 메시지 확인

---

**이 가이드를 따라 5~10분 내에 문제가 해결될 것입니다!** 🚀

설정 완료 후 결과를 알려주세요!

