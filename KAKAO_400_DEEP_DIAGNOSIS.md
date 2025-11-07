# 카카오 OAuth 400 Bad Request 심층 진단

## ✅ 확인 완료된 사항
- Redirect URI 등록 완료
- Web 플랫폼 등록 완료
- 카카오 로그인 활성화 완료
- 동의항목 설정 완료
- Vercel 환경 변수 설정 완료

## 🔍 추가 확인 사항

### 1. 카카오 개발자 센터 - 앱 상태 확인

1. **카카오 개발자 센터** → 애플리케이션 선택
2. **앱 설정** → **앱 키** 메뉴
3. **앱 상태** 확인:
   - **"운영 중"** 상태여야 합니다
   - **"개발 중"** 상태라면 프로덕션 도메인에서 400 에러가 발생할 수 있습니다

### 2. 카카오 개발자 센터 - 동의항목 ID 확인

1. **제품 설정** → **카카오 로그인** → **동의항목** 메뉴
2. 각 동의항목의 **ID** 확인:
   - **닉네임**: ID가 `profile_nickname`인지 확인
   - **프로필 사진**: ID가 `profile_image`인지 확인
   - **카카오계정(이메일)**: ID가 `account_email`인지 확인

**⚠️ 중요**: 코드에서 사용하는 scope와 동의항목 ID가 **정확히 일치**해야 합니다.

현재 코드에서 사용하는 scope:
```
profile_nickname profile_image account_email
```

### 3. 카카오 개발자 센터 - REST API 키 확인

1. **앱 설정** → **앱 키** 메뉴
2. **REST API 키** 확인:
   - 현재 사용 중인 키: `8329ca07e3bad2a5782e3d17a22bc6fc`
   - Vercel 환경 변수 `AUTH_KAKAO_ID`와 **정확히 일치**하는지 확인

### 4. 카카오 개발자 센터 - Client Secret 확인

1. **제품 설정** → **카카오 로그인** → **보안** 메뉴
2. **Client Secret** 확인:
   - Vercel 환경 변수 `AUTH_KAKAO_SECRET`와 **정확히 일치**하는지 확인
   - Client Secret은 대소문자 구분합니다

### 5. Vercel 환경 변수 재확인

1. **Vercel Dashboard** → 프로젝트 → **Settings** → **Environment Variables**
2. 다음 변수 확인:

```bash
AUTH_KAKAO_ID=8329ca07e3bad2a5782e3d17a22bc6fc
AUTH_KAKAO_SECRET=your-client-secret-here
AUTH_SECRET=your-auth-secret-here
NEXTAUTH_URL=https://www.deepaiauto.com
```

**체크 항목:**
- ✅ 모든 변수가 **Production, Preview, Development**에 모두 체크되어 있는지
- ✅ 변수 값에 **공백이나 줄바꿈**이 없는지
- ✅ 변수 값이 **정확히 일치**하는지 (대소문자 포함)

### 6. 카카오 개발자 센터 - 앱 키 재발급 (최후의 수단)

만약 위의 모든 사항을 확인했는데도 문제가 지속된다면:

1. **앱 설정** → **앱 키** 메뉴
2. **REST API 키** 재확인 또는 재발급
3. **제품 설정** → **카카오 로그인** → **보안** 메뉴
4. **Client Secret** 재발급 (기존 것은 삭제됨)
5. Vercel 환경 변수 업데이트
6. Vercel 재배포

## 🧪 테스트 방법

### 1. 브라우저 캐시 완전 삭제

1. 브라우저 개발자 도구 열기 (F12)
2. **Application** 탭 → **Storage** → **Clear site data** 클릭
3. 또는 **Ctrl + Shift + Delete** → **쿠키 및 기타 사이트 데이터** 선택 → **전체 기간** 선택 → **데이터 삭제**

### 2. 시크릿 모드에서 테스트

1. 브라우저 시크릿 모드 열기 (Ctrl + Shift + N)
2. `https://www.deepaiauto.com/auth/signin` 접속
3. 카카오 로그인 시도

### 3. 다른 브라우저에서 테스트

- Chrome, Firefox, Edge 등 다른 브라우저에서 테스트

## 📋 디버깅 로그 확인

### Vercel 로그에서 확인할 사항

1. **Vercel Dashboard** → 프로젝트 → **Functions** 탭
2. 카카오 로그인 시도
3. 다음 로그 확인:

```
[auth] ✅ Kakao OAuth credentials loaded
[auth] Creating Kakao provider with: { has_client_id: true, ... }
[auth] Kakao provider initializing: { has_client_id: true, ... }
```

**에러가 있다면:**
- `has_client_id: false` → 환경 변수 문제
- 다른 에러 메시지 → 해당 에러 해결

### 브라우저 개발자 도구에서 확인할 사항

1. **Network** 탭 열기
2. 카카오 로그인 시도
3. `kauth.kakao.com/oauth/authorize` 요청 확인
4. **Request URL** 전체 복사
5. **Response** 확인 (에러 메시지가 있을 수 있음)

## 🎯 가능한 원인 및 해결책

### 원인 1: 동의항목 ID 불일치

**증상**: 모든 설정이 올바른데도 400 에러 발생

**해결**:
1. 카카오 개발자 센터 → **제품 설정** → **카카오 로그인** → **동의항목**
2. 각 동의항목의 ID 확인
3. 코드의 scope와 정확히 일치하는지 확인

### 원인 2: 앱 상태 문제

**증상**: 개발 중 상태에서 프로덕션 도메인 사용

**해결**:
1. 카카오 개발자 센터 → **앱 설정** → **앱 키**
2. 앱 상태를 **"운영 중"**으로 변경 (가능한 경우)

### 원인 3: 환경 변수 캐시 문제

**증상**: 환경 변수를 수정했는데도 반영되지 않음

**해결**:
1. Vercel Dashboard → **Deployments**
2. 최신 배포 → **Redeploy** 클릭
3. **"Use existing Build Cache"** 체크 해제
4. 재배포

## 📞 추가 도움

위의 모든 사항을 확인했는데도 문제가 지속된다면:

1. **카카오 개발자 센터 고객센터** 문의
2. **카카오 개발자 포럼**에서 유사 사례 검색
3. Vercel 로그의 전체 에러 메시지 공유

