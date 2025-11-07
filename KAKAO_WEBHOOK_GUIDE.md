# 카카오 웹훅 설정 가이드

## 📌 웹훅이란?

웹훅(Webhook)은 카카오 서버에서 특정 이벤트가 발생했을 때 개발자 서버로 실시간 알림을 보내는 기능입니다.

## ⚠️ 중요: OAuth 로그인과는 무관합니다!

**웹훅은 OAuth 로그인 자체와는 직접적인 관련이 없습니다.** 웹훅은 다음 용도로 사용됩니다:

- **회원 탈퇴 알림**: 사용자가 카카오에서 계정을 삭제했을 때 알림
- **연결 해제 알림**: 사용자가 앱 연결을 해제했을 때 알림
- **개인정보 처리**: 회원 탈퇴 정보를 받아서 데이터베이스에서 사용자 정보 삭제

## 🔧 웹훅 설정 방법 (선택사항)

웹훅은 **나중에 설정해도 됩니다**. 현재 400 Bad Request 에러와는 무관합니다.

### 1단계: 웹훅 설정 페이지 접속

1. 카카오 개발자 센터 → 애플리케이션 선택
2. **제품 설정** → **카카오 로그인** → **사용 설정** 메뉴
3. **웹훅 바로가기** 클릭

### 2단계: 웹훅 URL 등록

1. **계정 상태 변경 웹훅(User Unlinked)** 또는 **연결 해제 웹훅** 선택
2. 웹훅 URL 입력:
   ```
   https://www.deepaiauto.com/api/webhook/kakao
   ```
3. **저장** 클릭

### 3단계: 웹훅 엔드포인트 구현 (선택사항)

웹훅을 받을 API 엔드포인트를 구현해야 합니다:

```typescript
// app/api/webhook/kakao/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 회원 탈퇴 처리
    if (body.event === 'user.unlinked') {
      const userId = body.user_id
      // 데이터베이스에서 사용자 정보 삭제
      // await deleteUser(userId)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## ⚠️ 현재는 웹훅 설정 불필요

**현재 400 Bad Request 에러는 웹훅과 무관합니다.** 

웹훅은 다음 경우에만 필요합니다:
- 회원 탈퇴 시 데이터베이스에서 사용자 정보를 자동으로 삭제하고 싶을 때
- 카카오 계정 연결 해제 시 알림을 받고 싶을 때

**OAuth 로그인 자체는 웹훅 없이도 정상 작동합니다.**

## 🎯 현재 집중해야 할 사항

400 Bad Request 에러 해결을 위해 다음을 확인하세요:

1. ✅ Redirect URI 확인 (완료)
2. ✅ Web 플랫폼 등록 확인 (완료)
3. ⚠️ **카카오 로그인 활성화 확인** (제품 설정 → 카카오 로그인 → 활성화 설정이 ON인지)
4. ⚠️ **동의항목 확인** (제품 설정 → 카카오 로그인 → 동의항목에서 다음이 설정되어 있는지):
   - 닉네임 (필수 또는 선택)
   - 프로필 사진 (선택)
   - 카카오계정(이메일) (필수 또는 선택)
5. ⚠️ **Vercel 환경 변수 확인**:
   - `AUTH_KAKAO_ID`가 카카오 개발자 센터의 REST API 키와 일치하는지
   - `NEXTAUTH_URL`이 올바르게 설정되어 있는지

