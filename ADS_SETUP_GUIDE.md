# 광고 수익화 설정 가이드

## 📋 개요

이 프로젝트는 Google AdSense와 카카오 애드핏을 지원합니다. 두 가지 광고 플랫폼 중 하나 또는 둘 다 사용할 수 있습니다.

---

## 🎯 1. Google AdSense 설정

### 1.1 AdSense 계정 생성

1. [Google AdSense](https://www.google.com/adsense/) 접속
2. Google 계정으로 로그인
3. **시작하기** 클릭
4. 웹사이트 URL 입력: `https://www.deepaiauto.com`
5. 계정 정보 입력 및 제출
6. 승인 대기 (보통 1-2주 소요)

### 1.2 광고 단위 생성

1. AdSense 대시보드 → **광고** 메뉴
2. **광고 단위** → **새 광고 단위** 클릭
3. 광고 단위 이름 입력 (예: "사이드바 광고")
4. 광고 형식 선택:
   - **반응형 광고** (권장)
   - 또는 특정 크기 선택
5. **만들기** 클릭
6. **광고 단위 ID** 복사 (예: `1234567890`)

### 1.3 환경 변수 설정

**로컬 개발 (`.env.local`)**:
```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_1=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_2=0987654321
```

**Vercel 배포 환경**:
1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-xxxxxxxxxxxxxxxx`
   - `NEXT_PUBLIC_ADSENSE_SLOT_1` = 첫 번째 광고 단위 ID
   - `NEXT_PUBLIC_ADSENSE_SLOT_2` = 두 번째 광고 단위 ID
4. Production, Preview, Development 모두 체크

---

## 🎯 2. 카카오 애드핏 설정

### 2.1 애드핏 계정 생성

1. [카카오 애드핏](https://adfit.kakao.com/) 접속
2. 카카오 계정으로 로그인
3. **회원가입** 또는 **로그인**
4. 사이트 정보 입력:
   - 사이트 URL: `https://www.deepaiauto.com`
   - 사이트명: 랜딩페이지 문구 생성기
5. 승인 대기 (보통 1-3일 소요)

### 2.2 광고 단위 생성

1. 애드핏 대시보드 → **광고 단위 관리**
2. **새 광고 단위 만들기** 클릭
3. 광고 단위 이름 입력
4. 광고 크기 선택 (예: 300x250, 728x90 등)
5. **생성** 클릭
6. **광고 단위 ID** 복사 (예: `DAN-xxxxxxxxxx`)

### 2.3 환경 변수 설정

**로컬 개발 (`.env.local`)**:
```bash
NEXT_PUBLIC_KAKAO_ADFIT_KEY=your-adfit-key
NEXT_PUBLIC_KAKAO_ADFIT_UNIT_1=DAN-xxxxxxxxxx
NEXT_PUBLIC_KAKAO_ADFIT_UNIT_2=DAN-yyyyyyyyyy
```

**Vercel 배포 환경**:
1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:
   - `NEXT_PUBLIC_KAKAO_ADFIT_KEY` = 애드핏 키
   - `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_1` = 첫 번째 광고 단위 ID
   - `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_2` = 두 번째 광고 단위 ID
4. Production, Preview, Development 모두 체크

---

## 📍 3. 광고 배치 위치

현재 다음 위치에 광고가 배치되어 있습니다:

### 3.1 사이드바 광고 (데스크톱만)
- 위치: 폼 영역 하단
- 형식: 세로형 (vertical)
- 환경 변수: `NEXT_PUBLIC_ADSENSE_SLOT_1` 또는 `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_1`

### 3.2 결과 영역 하단 광고
- 위치: 결과 카드/미리보기 하단
- 형식: 가로형 (horizontal)
- 환경 변수: `NEXT_PUBLIC_ADSENSE_SLOT_2` 또는 `NEXT_PUBLIC_KAKAO_ADFIT_UNIT_2`

### 3.3 추가 광고 배치

다른 위치에 광고를 추가하려면:

```tsx
import { AdSense, KakaoAdFit } from "@/app/_components/Ads";

// 예시: 헤더 하단 광고
<AdSense 
  adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_3 || ""} 
  adFormat="horizontal"
  className="my-4"
/>
```

---

## ⚙️ 4. 사용 방법

### 4.1 Google AdSense만 사용

`app/page.tsx`에서:
```tsx
<AdSense 
  adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1 || ""} 
  adFormat="vertical"
/>
```

### 4.2 카카오 애드핏만 사용

`app/page.tsx`에서:
```tsx
<KakaoAdFit 
  unitId={process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_1 || ""} 
/>
```

### 4.3 둘 다 사용 (A/B 테스트)

환경 변수로 제어하거나, 조건부 렌더링 사용:
```tsx
{process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
  <AdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1 || ""} />
) : (
  <KakaoAdFit unitId={process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT_1 || ""} />
)}
```

---

## 📊 5. 수익 최적화 팁

### 5.1 광고 위치
- 사용자가 자연스럽게 볼 수 있는 위치
- 콘텐츠와 너무 가깝지 않게 (클릭 오류 방지)
- 모바일과 데스크톱 모두 고려

### 5.2 광고 개수
- 페이지당 3-4개 권장
- 너무 많으면 사용자 경험 저하

### 5.3 광고 크기
- 반응형 광고 사용 권장
- 모바일: 300x250, 320x50
- 데스크톱: 728x90, 300x250, 160x600

---

## 🐛 6. 트러블슈팅

### 문제: 광고가 표시되지 않음

**해결 방법**:
1. 환경 변수가 올바르게 설정되었는지 확인
2. 브라우저 콘솔에서 에러 확인
3. AdSense/애드핏 승인 상태 확인
4. Vercel 재배포 확인

### 문제: 광고가 너무 느리게 로드됨

**해결 방법**:
- `strategy="lazyOnload"` 사용 (이미 적용됨)
- 광고 개수 줄이기
- 광고 위치 조정

---

## ✅ 체크리스트

### Google AdSense
- [ ] AdSense 계정 생성 및 승인
- [ ] 광고 단위 2개 이상 생성
- [ ] Client ID 및 광고 단위 ID 확인
- [ ] 환경 변수 설정 (로컬 및 Vercel)
- [ ] 배포 후 광고 표시 확인

### 카카오 애드핏
- [ ] 애드핏 계정 생성 및 승인
- [ ] 광고 단위 2개 이상 생성
- [ ] 애드핏 키 및 광고 단위 ID 확인
- [ ] 환경 변수 설정 (로컬 및 Vercel)
- [ ] 배포 후 광고 표시 확인

---

## 📝 참고사항

- 광고 승인까지 시간이 걸릴 수 있습니다 (1일~2주)
- 승인 전에는 테스트 광고가 표시됩니다
- 수익은 클릭 수와 노출 수에 따라 결정됩니다
- 두 플랫폼을 동시에 사용할 수 있지만, 같은 위치에는 하나만 배치하는 것을 권장합니다

