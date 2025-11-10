export default function PrivacyPage() {
  return (
    <section className="card space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">개인정보처리방침</h1>
        <p className="text-sm text-slate-400">
          최종 수정일: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">1. 개인정보처리방침의 의의</h2>
          <p>
            랜딩페이지 문구 자동 생성기(이하 "서비스")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 
            「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법규를 준수합니다. 
            본 방침은 서비스 이용 과정에서 수집되는 개인정보와 그 목적, 처리 방법을 안내하기 위해 작성되었습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">2. 수집하는 개인정보의 항목 및 수집 방법</h2>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">2.1 수집 항목</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>회원가입 시:</strong> Google 계정 정보(이메일, 이름, 프로필 사진)</li>
              <li><strong>서비스 이용 시:</strong> 생성된 문구 데이터, 사용 이력, 사용량 정보</li>
              <li><strong>결제 시:</strong> 결제 정보(결제 수단, 결제 금액, 결제 일시)</li>
              <li><strong>자동 수집 정보:</strong> IP 주소, 쿠키, 접속 로그, 기기 정보, 브라우저 정보</li>
            </ul>
            <h3 className="font-semibold text-slate-100 mt-3">2.2 수집 방법</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Google OAuth를 통한 회원가입 및 로그인</li>
              <li>서비스 이용 과정에서 자동으로 생성되는 정보</li>
              <li>쿠키 및 로그 분석 도구를 통한 자동 수집</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">3. 개인정보의 처리 목적</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>서비스 제공:</strong> AI 기반 문구 생성 서비스 제공, 사용량 관리</li>
            <li><strong>회원 관리:</strong> 회원 식별, 본인 확인, 부정 이용 방지</li>
            <li><strong>서비스 개선:</strong> 서비스 품질 향상, 신규 기능 개발</li>
            <li><strong>마케팅:</strong> 서비스 안내, 이벤트 정보 제공 (동의 시)</li>
            <li><strong>법적 의무 이행:</strong> 관련 법령에 따른 의무 이행</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">4. 개인정보의 보유 및 이용 기간</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>회원 정보: 회원 탈퇴 시까지 (단, 관련 법령에 따라 일정 기간 보관 필요 시 해당 기간 동안 보관)</li>
            <li>결제 정보: 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따라 5년간 보관</li>
            <li>서비스 이용 기록: 「통신비밀보호법」에 따라 3개월간 보관</li>
            <li>문의 사항: 문의 해결 후 30일 이내 파기</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">5. 쿠키의 운영 및 거부</h2>
          <div className="space-y-2">
            <p>
              본 서비스는 이용자에게 개인화된 서비스를 제공하기 위해 쿠키를 사용합니다.
            </p>
            <h3 className="font-semibold text-slate-100">5.1 쿠키의 사용 목적</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>로그인 상태 유지 및 세션 관리</li>
              <li>이용자의 접속 빈도 및 방문 시간 분석</li>
              <li>서비스 이용 패턴 파악 및 맞춤형 서비스 제공</li>
            </ul>
            <h3 className="font-semibold text-slate-100 mt-3">5.2 쿠키 설정 거부 방법</h3>
            <p>
              이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹 브라우저 설정에서 쿠키 허용 여부를 선택할 수 있습니다. 
              다만, 쿠키 설치를 거부할 경우 서비스 이용에 어려움이 있을 수 있습니다.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">6. 제3자 서비스 및 개인정보 제공</h2>
          <div className="space-y-2">
            <p>본 서비스는 다음과 같은 제3자 서비스를 사용하며, 해당 서비스 제공자의 개인정보 처리 방침이 적용됩니다.</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Google AdSense:</strong> 광고 서비스 제공을 위해 쿠키 및 광고 식별자를 사용합니다. 
                Google의 개인정보 처리 방침은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>에서 확인할 수 있습니다.
              </li>
              <li>
                <strong>Google OAuth:</strong> 회원 인증을 위해 Google 계정 정보를 사용합니다. 
                Google의 개인정보 처리 방침은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>에서 확인할 수 있습니다.
              </li>
              <li>
                <strong>OpenAI:</strong> AI 문구 생성 서비스를 위해 입력된 브랜드 정보를 처리합니다. 
                OpenAI의 개인정보 처리 방침은 <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://openai.com/privacy</a>에서 확인할 수 있습니다.
              </li>
              <li>
                <strong>Supabase:</strong> 데이터베이스 및 인증 서비스를 제공합니다. 
                Supabase의 개인정보 처리 방침은 <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://supabase.com/privacy</a>에서 확인할 수 있습니다.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">7. 개인정보의 위탁 처리</h2>
          <p>
            본 서비스는 원활한 서비스 제공을 위해 필요한 경우 개인정보 처리 업무를 외부 전문업체에 위탁할 수 있으며, 
            위탁 시에는 위탁 계약서 등을 통하여 서비스 제공자의 개인정보 보호 관련 지시 엄수, 개인정보에 관한 비밀유지, 
            제3자 제공 금지 등에 관한 사항을 규정하고 감독하고 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">8. 개인정보의 안전성 확보 조치</h2>
          <p>본 서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>관리적 조치: 내부 관리 계획 수립 및 시행, 정기적 직원 교육</li>
            <li>기술적 조치: 개인정보 처리 시스템의 접근 권한 관리, 접근 통제 시스템 설치, 개인정보 암호화</li>
            <li>물리적 조치: 전산실, 자료보관실 등의 접근 통제</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">9. 이용자의 권리 및 행사 방법</h2>
          <p>
            이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>개인정보 열람 요구</li>
            <li>개인정보 정정·삭제 요구</li>
            <li>개인정보 처리정지 요구</li>
            <li>회원 탈퇴</li>
          </ul>
          <p className="mt-2">
            위 권리 행사는 서비스 내 설정 메뉴를 통해 직접 처리하거나, 
            아래 연락처로 요청하실 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">10. 개인정보 보호책임자</h2>
          <p>개인정보 처리에 관한 문의사항이 있으시면 아래로 연락해 주시기 바랍니다.</p>
          <div className="bg-slate-800/50 p-4 rounded-lg mt-2">
            <p><strong>이메일:</strong> tears0427@gmail.com</p>
            <p className="mt-1"><strong>처리 기간:</strong> 접수일로부터 10일 이내</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">11. 개인정보처리방침의 변경</h2>
          <p>
            본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 
            변경사항의 시행 7일 전부터 서비스 홈페이지를 통해 공지하겠습니다.
          </p>
        </div>
      </div>
    </section>
  );
}