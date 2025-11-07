# 카카오 로그인 문제 해결 체크리스트

## 🔍 현재 에러 확인

Vercel 로그에서 다음을 확인하세요:

1. **Vercel Dashboard** → 프로젝트 → **Functions** 탭
2. 카카오 로그인 시도 시 로그 확인
3. `[auth] Kakao`로 시작하는 모든 로그 확인

## ✅ 필수 확인 사항

### 1. 카카오 개발자 센터 설정

#### 1.1 Redirect URI 확인 (가장 중요!)
1. [카카오 개발자 센터](https://developers.kakao.com/) 접속
2. 애플리케이션 선택
3. **제품 설정** → **카카오 로그인** → **Redirect URI** 메뉴
4. 다음 URI가 **정확히** 등록되어 있는지 확인:

```
https://www.deepaiauto.com/api/auth/callback/kakao
https://deepaiauto.com/api/auth/callback/kakao
```

**주의사항**:
- ✅ `https://`로 시작 (http 아님!)
- ✅ 끝에 슬래시(`/`) 없음
- ✅ 대소문자 정확히 일치
- ✅ 공백 없음
- ✅ `www` 포함 버전과 미포함 버전 **둘 다** 추가

#### 1.2 Web 플랫폼 확인
1. **앱 설정** → **플랫폼** 메뉴
2. Web 플랫폼이 등록되어 있는지 확인
3. 사이트 도메인에 다음이 등록되어 있는지 확인:
   ```
   https://www.deepaiauto.com
   https://deepaiauto.com
   ```

#### 1.3 카카오 로그인 활성화 확인
1. **제품 설정** → **카카오 로그인** 메뉴
2. **활성화 설정**이 **ON**인지 확인

#### 1.4 동의항목 확인
1. **제품 설정** → **카카오 로그인** → **동의항목** 메뉴
2. 다음 항목들이 설정되어 있는지 확인:
   - **닉네임** (필수 또는 선택)
   - **카카오계정(이메일)** (필수 또는 선택)

### 2. Vercel 환경 변수 확인

1. **Vercel Dashboard** → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수들이 올바르게 설정되어 있는지 확인:

```bash
AUTH_KAKAO_ID=your-rest-api-key
AUTH_KAKAO_SECRET=your-client-secret
AUTH_SECRET=your-auth-secret
NEXTAUTH_URL=https://www.deepaiauto.com
```

**체크 항목**:
- ✅ 모든 변수가 Production, Preview, Development에 모두 체크되어 있는지
- ✅ `AUTH_KAKAO_ID`가 카카오 개발자 센터의 REST API 키와 일치하는지
- ✅ `AUTH_KAKAO_SECRET`이 카카오 개발자 센터의 Client Secret과 일치하는지

### 3. Vercel 재배포 확인

환경 변수를 수정했다면:
1. Vercel Dashboard → **Deployments**
2. 최신 배포 → **⋯** (점 3개) 클릭
3. **Redeploy** 선택

## 🐛 일반적인 에러 및 해결 방법

### 에러 1: "KOE205" - 잘못된 요청
**원인**: Redirect URI 불일치

**해결**:
1. 카카오 개발자 센터에서 Redirect URI 재확인
2. 정확히 일치하는 URI로 등록:
   ```
   https://www.deepaiauto.com/api/auth/callback/kakao
   https://deepaiauto.com/api/auth/callback/kakao
   ```
3. 저장 후 5-10분 대기

### 에러 2: "KOE006" - 잘못된 클라이언트
**원인**: REST API 키 또는 Client Secret 오류

**해결**:
1. 카카오 개발자 센터에서 REST API 키 재확인
2. Client Secret 재확인
3. Vercel 환경 변수 재설정
4. Vercel 재배포

### 에러 3: "invalid_scope"
**원인**: 잘못된 scope 사용 (이미 수정됨)

**해결**: 
- ✅ `profile_image` scope 제거 완료
- ✅ `profile_nickname account_email`만 사용

### 에러 4: "KOE101" - 잘못된 앱키
**원인**: REST API 키가 잘못됨

**해결**:
1. 카카오 개발자 센터 → **앱 설정** → **앱 키**
2. REST API 키 재확인
3. Vercel 환경 변수 `AUTH_KAKAO_ID` 업데이트
4. Vercel 재배포

## 📋 디버깅 단계

### 1단계: Vercel 로그 확인
1. Vercel Dashboard → 프로젝트 → **Functions** 탭
2. 카카오 로그인 시도
3. 로그에서 `[auth] Kakao`로 시작하는 모든 메시지 확인
4. 에러 메시지 복사

### 2단계: 브라우저 콘솔 확인
1. 브라우저 개발자 도구 열기 (F12)
2. **Console** 탭 열기
3. 카카오 로그인 시도
4. 에러 메시지 확인

### 3단계: 카카오 개발자 센터 재확인
1. Redirect URI 정확히 일치하는지 확인
2. Web 플랫폼 등록 확인
3. 카카오 로그인 활성화 확인

## 💡 추가 확인 사항

### NEXTAUTH_URL 확인
Vercel 환경 변수에서 `NEXTAUTH_URL`이 올바르게 설정되어 있는지 확인:

```bash
NEXTAUTH_URL=https://www.deepaiauto.com
```

또는

```bash
NEXTAUTH_URL=https://deepaiauto.com
```

**중요**: `www` 포함 여부를 선택하고 일관되게 유지!

### 브라우저 캐시 삭제
1. 브라우저에서 `Ctrl + Shift + Delete` (Windows) 또는 `Cmd + Shift + Delete` (Mac)
2. 쿠키 및 사이트 데이터 삭제
3. 다시 카카오 로그인 시도

## 🔧 다음 단계

위의 체크리스트를 모두 확인한 후:

1. **Vercel 로그에서 정확한 에러 메시지 확인**
2. **에러 메시지를 알려주시면 정확한 해결 방법 제시**

특히 다음 정보를 알려주세요:
- Vercel 로그의 정확한 에러 메시지
- 카카오 개발자 센터에 등록된 Redirect URI
- Vercel 환경 변수 설정 상태

