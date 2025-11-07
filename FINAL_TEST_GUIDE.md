# 최종 테스트 가이드 ✅

**배포 완료!** 이제 모든 기능이 정상 작동하는지 테스트합니다.

---

## 🧪 테스트 순서

### 1단계: 브라우저 캐시 완전 삭제 (필수!)

**Chrome/Edge에서**:

1. **F12** 키를 누르거나 우클릭 → **검사**

2. **Application** 탭 클릭 (또는 **애플리케이션**)

3. 왼쪽 메뉴에서:
   - **Local Storage** → `https://www.deepaiauto.com` 우클릭 → **Clear**
   - **Session Storage** → `https://www.deepaiauto.com` 우클릭 → **Clear**
   - **Cookies** → `https://www.deepaiauto.com` 우클릭 → **Clear**

4. **Console** 탭으로 이동 → 다음 명령어 입력:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   location.reload();
   ```

또는 **간단한 방법**:
- **Ctrl + Shift + Delete** (캐시 삭제 창)
- **쿠키 및 기타 사이트 데이터** 체크
- **캐시된 이미지 및 파일** 체크
- **삭제** 클릭

---

### 2단계: Google 로그인 테스트

1. **새 탭**에서 https://www.deepaiauto.com/ 접속

2. **우측 상단 "로그인"** 버튼 클릭

3. Google 계정 선택 (`tears0427@gmail.com`)

**예상 결과**:
- ✅ Google 로그인 페이지로 이동
- ✅ 계정 선택 후 deepaiauto.com으로 리다이렉트
- ✅ 우측 상단에 이메일 표시
- ✅ "로그인" → "로그아웃" 버튼으로 변경

**실패 시**:
- ❌ "redirect_uri_mismatch" 에러
- ❌ "invalid_client" 에러

→ Google Cloud Console에서 OAuth 클라이언트 ID/Secret 재확인 필요

---

### 3단계: Pro 플랜 확인

로그인 성공 후, 화면 **우측 하단**을 확인:

**Pro 플랜 사용자 (tears0427@gmail.com)**:
- ✅ **"✨ Pro 플랜 (무제한)"** 표시되어야 함

**Free 플랜 사용자**:
- ⚠️ "무료 이용이 X회 남았습니다" 표시

**Pro 플랜 표시가 안 되면?**
→ Supabase DB에서 `plan_type = 'pro'` 확인 필요

---

### 4단계: 카피 생성 테스트

#### 브리프 입력:

```
서비스명: 테스트 서비스
업종: SaaS
핵심 가치: AI로 업무를 자동화합니다
타겟 고객: 스타트업 대표
차별점: 5분 만에 설정 완료
톤앤매너: 담백
언어: 한국어
```

**"즉시 생성"** 버튼 클릭

**예상 결과**:
- ✅ 로딩 인디케이터 표시
- ✅ 3~10초 내 AI 카피 생성
- ✅ 결과 카드에 히어로, 서브헤딩, CTA 등 표시
- ✅ 복사 버튼 작동

**실패 시**:
- ❌ "OpenAI API 에러" → API 키 확인
- ❌ "사용량 초과" → Pro 플랜 설정 확인
- ❌ 로딩만 계속됨 → Vercel 로그 확인

---

### 5단계: 무제한 생성 테스트 (Pro 플랜)

**Pro 플랜 계정으로**:

1. 카피를 **3회 이상** 생성
2. 4번째, 5번째도 계속 생성 가능한지 확인

**예상 결과**:
- ✅ 제한 없이 계속 생성 가능
- ✅ 결제 모달이 뜨지 않음
- ✅ "✨ Pro 플랜 (무제한)" 표시 유지

---

### 6단계: Supabase 데이터 확인 (선택사항)

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속

2. 프로젝트 선택 → **Table Editor**

3. **`user_usage`** 테이블 선택

4. `tears0427@gmail.com` 계정 확인:
   ```
   email: tears0427@gmail.com
   usage_count: 3 이상 (생성한 횟수)
   plan_type: pro  ← 반드시 'pro'여야 함
   ```

---

## ✅ 성공 체크리스트

모든 항목에 체크되어야 완료입니다:

### 기본 기능
- [ ] Google 로그인 성공
- [ ] 로그인 후 이메일 표시
- [ ] 카피 생성 작동
- [ ] 생성된 카피 표시
- [ ] 복사 버튼 작동

### Pro 플랜 기능
- [ ] "✨ Pro 플랜 (무제한)" 표시
- [ ] 3회 이상 생성 가능
- [ ] 결제 모달이 뜨지 않음
- [ ] Supabase에 `plan_type: pro` 저장

### 데이터베이스
- [ ] Supabase user_usage 테이블 기록
- [ ] 생성할 때마다 usage_count 증가
- [ ] plan_type이 'pro'로 유지

---

## 🐛 문제 발생 시

### ❌ 로그인 실패

**증상**: "redirect_uri_mismatch" 또는 "invalid_client"

**해결**:
1. Google Cloud Console 확인:
   - 새 OAuth 클라이언트 ID/Secret이 맞는지 확인
   - 리디렉션 URI 설정 확인:
     ```
     https://deepaiauto.com/api/auth/callback/google
     https://www.deepaiauto.com/api/auth/callback/google
     ```

2. Vercel 환경 변수 재확인:
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `NEXTAUTH_URL=https://www.deepaiauto.com`

3. Vercel 재배포

---

### ❌ Pro 플랜 표시 안 됨

**증상**: Free 플랜으로 표시되거나 3회 제한

**해결**:

1. **관리자 페이지에서 다시 업그레이드**:
   - https://www.deepaiauto.com/admin 접속
   - 관리자 비밀번호 입력
   - `tears0427@gmail.com` 찾기
   - **"⬆️ Pro로 업그레이드"** 클릭

2. **로그아웃 후 재로그인**:
   - 우측 상단 → 로그아웃
   - 다시 Google 로그인

3. **브라우저 캐시 삭제** (1단계 반복)

---

### ❌ 카피 생성 실패

**증상**: 로딩 후 에러 또는 아무 반응 없음

**확인 사항**:

1. **OpenAI API 키**:
   - Vercel Dashboard → Environment Variables
   - `OPENAI_API_KEY` 확인
   - https://platform.openai.com/usage 에서 크레딧 확인

2. **Vercel 로그**:
   - Vercel Dashboard → Deployments → Functions 탭
   - 에러 메시지 확인

3. **브라우저 Console**:
   - F12 → Console 탭
   - 에러 메시지 확인

---

### ❌ Supabase 연결 실패

**증상**: 사용량이 기록되지 않음

**해결**:

1. Vercel 환경 변수 확인:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Supabase RLS 정책 확인

3. Vercel 재배포

---

## 📊 테스트 결과 보고

테스트 완료 후 다음 정보를 확인해주세요:

### 성공 ✅
```
✅ Google 로그인 성공
✅ Pro 플랜 표시됨
✅ 카피 3회 이상 생성 가능
✅ Supabase에 데이터 기록됨
```

### 실패 ❌
```
❌ 어떤 단계에서 실패했는지
❌ 에러 메시지 (스크린샷)
❌ 브라우저 Console 에러
```

---

## 🎯 추가 테스트 (선택사항)

### Free 플랜 계정으로 테스트

1. **다른 Gmail 계정**으로 로그인

2. 카피 **3회** 생성

3. **4번째 생성 시도**:
   - ✅ 결제 모달이 떠야 함
   - ✅ "무료 한도 도달" 메시지
   - ✅ 카카오페이 버튼 표시

---

## 🎉 완료!

모든 테스트를 통과했다면:

✅ **Google OAuth 정상 작동**  
✅ **Pro 플랜 무제한 사용 가능**  
✅ **Free 플랜 3회 제한 작동**  
✅ **Supabase 데이터 저장**  

**프로젝트가 완전히 배포되었습니다!** 🚀

---

## 📞 도움이 필요하면

테스트 중 문제가 발생하면:
1. 이 가이드의 "문제 발생 시" 섹션 참고
2. 에러 메시지 스크린샷 공유
3. 브라우저 Console 에러 확인
4. Vercel 로그 확인

---

**지금 바로 테스트를 시작하세요!** 

1단계부터 차근차근 진행하시고, 결과를 알려주세요! 😊

