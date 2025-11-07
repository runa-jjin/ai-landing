# 카카오 OAuth 로그인 설정 가이드

## 📋 전체 프로세스

1. 카카오 개발자 센터에서 애플리케이션 등록
2. REST API 키 및 Client Secret 발급
3. 리디렉션 URI 설정
4. 환경 변수 설정
5. 배포 및 테스트

---

## 🚀 1단계: 카카오 개발자 센터에서 애플리케이션 등록

### 1.1 애플리케이션 생성

1. [카카오 개발자 센터](https://developers.kakao.com/) 접속 및 로그인
2. **내 애플리케이션** → **애플리케이션 추가하기** 클릭
3. 앱 이름, 사업자명 입력 후 **저장** 클릭

### 1.2 플랫폼 설정

1. 생성된 애플리케이션 선택
2. **앱 설정** → **플랫폼** 메뉴
3. **Web 플랫폼 등록** 클릭
4. 사이트 도메인 입력:
   - 개발 환경: `http://localhost:3000`
   - 프로덕션: `https://your-domain.com` (또는 Vercel 도메인)

### 1.3 카카오 로그인 활성화

1. **제품 설정** → **카카오 로그인** 메뉴
2. **활성화 설정** → **ON**으로 변경
3. **Redirect URI** 추가:
   ```
   개발 환경:
   http://localhost:3000/api/auth/callback/kakao
   
   프로덕션:
   https://your-domain.com/api/auth/callback/kakao
   ```

### 1.4 동의항목 설정

1. **제품 설정** → **카카오 로그인** → **동의항목** 메뉴
2. 다음 항목들을 **필수 동의** 또는 **선택 동의**로 설정:
   - **닉네임** (필수)
   - **프로필 사진** (선택)
   - **카카오계정(이메일)** (필수 또는 선택)

---

## 🔑 2단계: REST API 키 및 Client Secret 발급

### 2.1 REST API 키 확인

1. **앱 설정** → **앱 키** 메뉴
2. **REST API 키** 복사 (이것이 `AUTH_KAKAO_ID`가 됩니다)

### 2.2 Client Secret 발급

1. **제품 설정** → **카카오 로그인** → **보안** 메뉴
2. **Client Secret 코드 생성** 클릭
3. 생성된 **Client Secret** 복사 (이것이 `AUTH_KAKAO_SECRET`이 됩니다)

⚠️ **중요**: Client Secret은 한 번만 표시되므로 안전하게 보관하세요!

---

## ⚙️ 3단계: 환경 변수 설정

### 3.1 로컬 개발 환경 (`.env.local`)

프로젝트 루트에 `.env.local` 파일에 추가:

```bash
# 카카오 OAuth
AUTH_KAKAO_ID=your-rest-api-key-here
AUTH_KAKAO_SECRET=your-client-secret-here
```

### 3.2 Vercel 배포 환경

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables** 메뉴
3. 다음 변수 추가:

```bash
AUTH_KAKAO_ID=your-rest-api-key-here
AUTH_KAKAO_SECRET=your-client-secret-here
```

**체크 항목**:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## 🧪 4단계: 테스트

### 4.1 로컬 테스트

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 브라우저에서 `http://localhost:3000/auth/signin` 접속
3. **카카오로 계속하기** 버튼 클릭
4. 카카오 로그인 화면에서 로그인
5. 리디렉션 후 메인 페이지로 이동 확인

### 4.2 배포 후 테스트

1. Vercel에 배포
2. 배포된 사이트에서 로그인 페이지 접속
3. 카카오 로그인 테스트
4. Vercel 로그에서 에러 확인:
   ```
   [auth] ✅ Kakao OAuth credentials loaded
   ```

---

## 🐛 트러블슈팅

### 문제 1: "Invalid redirect_uri" 에러

**원인**: 카카오 개발자 센터에 등록한 Redirect URI와 실제 URI가 일치하지 않음

**해결**:
1. 카카오 개발자 센터 → **제품 설정** → **카카오 로그인** → **Redirect URI** 확인
2. 정확히 일치하는 URI로 등록:
   ```
   https://your-domain.com/api/auth/callback/kakao
   ```
3. URI는 대소문자 구분, 슬래시(/) 포함 여부까지 정확히 일치해야 함

### 문제 2: "Invalid client" 에러

**원인**: REST API 키 또는 Client Secret이 잘못됨

**해결**:
1. 환경 변수 확인 (`AUTH_KAKAO_ID`, `AUTH_KAKAO_SECRET`)
2. 카카오 개발자 센터에서 키 재확인
3. Vercel 환경 변수 재설정 후 재배포

### 문제 3: 이메일 정보가 없음

**원인**: 카카오 계정에 이메일이 없거나 동의항목 설정 문제

**해결**:
1. 카카오 개발자 센터 → **제품 설정** → **카카오 로그인** → **동의항목**
2. **카카오계정(이메일)** 항목을 **필수 동의** 또는 **선택 동의**로 설정
3. 사용자가 카카오 로그인 시 이메일 동의를 허용해야 함

### 문제 4: 로그인은 되지만 사용자 정보가 제대로 표시되지 않음

**원인**: 카카오 API 응답 형식 문제

**해결**:
1. Vercel 로그에서 카카오 API 응답 확인
2. `auth.ts`의 `profile` 함수에서 카카오 응답 구조 확인
3. 필요시 프로필 매핑 수정

---

## 📝 참고사항

- 카카오 로그인은 Google 로그인과 동일한 방식으로 작동합니다
- 같은 이메일로 Google과 카카오 로그인을 하면 별도의 계정으로 생성됩니다
- 카카오 계정에 이메일이 없는 경우, `{kakao_id}@kakao.com` 형식으로 생성됩니다
- 사용량 관리, 플랜 정보 등은 Google 로그인과 동일하게 작동합니다

---

## ✅ 체크리스트

- [ ] 카카오 개발자 센터에서 애플리케이션 생성
- [ ] Web 플랫폼 등록 및 사이트 도메인 설정
- [ ] 카카오 로그인 활성화
- [ ] Redirect URI 등록 (개발/프로덕션)
- [ ] 동의항목 설정 (닉네임, 이메일 등)
- [ ] REST API 키 확인
- [ ] Client Secret 발급 및 복사
- [ ] 로컬 환경 변수 설정 (`.env.local`)
- [ ] Vercel 환경 변수 설정
- [ ] 로컬 테스트 완료
- [ ] 프로덕션 배포 및 테스트 완료

