export default function PrivacyPage() {
  return (
      <section className="card space-y-4">
      <h2 className="text-2xl font-semibold">개인정보처리방침</h2> 
      <p className="text-sm text-slate-300"> 
      랜딩페이지 문구 자동 생성기(이하 "서비스")는 이용자의 개인정보를 중요시하며, 관련 법규를 준수합니다. 
      본 방침은 서비스 이용 과정에서 수집되는 최소한의 정보와 그 목적을 안내하기 위해 작성되었습니다. 
      </p>
      <div className="space-y-3 text-sm text-slate-300">
        <div>
        <h3 className="font-semibold text-slate-100">1. 수집 항목 및 목적</h3> 
        <p>본 서비스는 계정 생성 없이 제공되며, 문의 시에만 이메일과 이름을 수집하여 답변 제공에 활용합니다.</p> 
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">2. 보관 기간</h3> 
          <p>수집된 개인정보는 문의 해결 후 30일 이내에 안전하게 파기됩니다.</p> 
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">3. 위탁 및 제3자 제공</h3> 
          <p>본 서비스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p> 
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">4. 이용자의 권리</h3> 
          <p>이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있으며, support@example.com으로 문의해주세요.</p> 
        </div>
      </div>
    </section>
  );
}