# 카카오 OAuth 400 Bad Request 에러 해결 가이드

## 🔴 현재 에러
```
GET https://kauth.kakao.com/oauth/authorize?... 400 (Bad Request)
```

## 🔍 원인 분석

400 Bad Request는 카카오 OAuth 서버가 요청을 거부했다는 의미입니다. 가장 흔한 원인:

1. **Redirect URI 불일치** (90% 확률)
2. **Web 플랫폼 미등록**
3. **카카오 로그인 비활성화**
4. **잘못된 client_id**

## ✅ 해결 방법

### 1단계: 카카오 개발자 센터 접속

1. [카카오 개발자 센터](https://developers.kakao.com/) 접속 및 로그인
2. 애플리케이션 선택 (client_id: `8329ca07e3bad2a5782e3d17a22bc6fc`)

### 2단계: Web 플랫폼 등록 확인

1. **앱 설정** → **플랫폼** 메뉴
2. **Web 플랫폼**이 등록되어 있는지 확인
3. 등록되어 있지 않다면:
   - **Web 플랫폼 등록** 클릭
   - 사이트 도메인 입력:
     ```
     https://www.deepaiauto.com
     https://deepaiauto.com
     ```
   - **저장** 클릭

### 3단계: Redirect URI 확인 및 수정 (가장 중요!)

1. **제품 설정** → **카카오 로그인** 메뉴
2. **Redirect URI** 섹션 확인
3. 다음 URI가 **정확히** 등록되어 있는지 확인:

```
https://www.deepaiauto.com/api/auth/callback/kakao
https://deepaiauto.com/api/auth/callback/kakao
```

**⚠️ 정확히 일치해야 하는 사항:**
- ✅ `https://`로 시작 (http 아님!)
- ✅ 끝에 슬래시(`/`) **없음**
- ✅ 대소문자 정확히 일치
- ✅ 공백 없음
- ✅ `www` 포함 버전과 미포함 버전 **둘 다** 추가

4. 등록되어 있지 않다면:
   - **+ Redirect URI 추가** 클릭
   - 위의 URI를 **정확히** 입력 (복사-붙여넣기 권장)
   - **저장** 클릭

### 4단계: 카카오 로그인 활성화 확인

1. **제품 설정** → **카카오 로그인** 메뉴
2. **활성화 설정**이 **ON**인지 확인
3. OFF라면 ON으로 변경 후 **저장**

### 5단계: 동의항목 확인

1. **제품 설정** → **카카오 로그인** → **동의항목** 메뉴
2. 다음 항목들이 설정되어 있는지 확인:
   - **닉네임** (필수 또는 선택)
   - **프로필 사진** (선택)
   - **카카오계정(이메일)** (필수 또는 선택)

### 6단계: 대기 (중요!)

카카오 개발자 센터 설정 변경 후 **5~10분** 대기
- 즉시 시도하면 같은 오류가 발생할 수 있음
- 설정이 전파되는 시간이 필요함

### 7단계: Vercel 환경 변수 확인

1. **Vercel Dashboard** → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수 확인:

```bash
AUTH_KAKAO_ID=8329ca07e3bad2a5782e3d17a22bc6fc
AUTH_KAKAO_SECRET=your-client-secret-here
AUTH_SECRET=your-auth-secret
NEXTAUTH_URL=https://www.deepaiauto.com
```

**체크 항목:**
- ✅ `AUTH_KAKAO_ID`가 카카오 개발자 센터의 REST API 키와 일치하는지
- ✅ 모든 변수가 Production, Preview, Development에 모두 체크되어 있는지

### 8단계: Vercel 재배포

환경 변수를 수정했다면:
1. Vercel Dashboard → **Deployments**
2. 최신 배포 → **⋯** (점 3개) 클릭
3. **Redeploy** 선택

## 🧪 테스트

1. 브라우저 캐시 삭제 (Ctrl + Shift + Delete)
2. `https://www.deepaiauto.com/auth/signin` 접속
3. **카카오로 계속하기** 버튼 클릭
4. 카카오 로그인 화면이 정상적으로 표시되는지 확인

## 🐛 여전히 에러가 발생한다면

### 추가 확인 사항

1. **REST API 키 확인**
   - 카카오 개발자 센터 → **앱 설정** → **앱 키**
   - REST API 키가 `8329ca07e3bad2a5782e3d17a22bc6fc`와 일치하는지 확인

2. **Client Secret 확인**
   - 카카오 개발자 센터 → **제품 설정** → **카카오 로그인** → **보안**
   - Client Secret이 Vercel 환경 변수와 일치하는지 확인

3. **Vercel 로그 확인**
   - Vercel Dashboard → 프로젝트 → **Functions** 탭
   - 카카오 로그인 시도 시 에러 메시지 확인
   - `[auth] Kakao`로 시작하는 모든 로그 확인

## 📞 추가 도움

문제가 지속되면 다음 정보를 확인하세요:
- 카카오 개발자 센터의 Redirect URI 목록 (스크린샷)
- Vercel 환경 변수 목록 (민감 정보 제외)
- 브라우저 개발자 도구의 Network 탭에서 실제 요청 URL

