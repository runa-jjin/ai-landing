export default function TermsPage() {
  return (
    <section className="card space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">이용약관</h1>
        <p className="text-sm text-slate-400">
          최종 수정일: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 1조 (목적)</h2>
          <p>
            본 약관은 랜딩페이지 문구 자동 생성기(이하 "서비스")가 제공하는 AI 기반 문구 생성 서비스의 이용과 관련하여 
            서비스 제공자와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 2조 (용어의 정의)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>"서비스"</strong>란 AI 기반 랜딩페이지 문구 자동 생성 서비스를 의미합니다.</li>
            <li><strong>"이용자"</strong>란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 의미합니다.</li>
            <li><strong>"회원"</strong>이란 서비스에 회원등록을 하고 서비스를 이용하는 자를 의미합니다.</li>
            <li><strong>"콘텐츠"</strong>란 서비스를 통해 생성된 모든 문구, 텍스트, 카피를 의미합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 3조 (약관의 게시와 개정)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
            <li>서비스 제공자는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
            <li>약관이 개정되는 경우 개정 약관의 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</li>
            <li>이용자는 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 4조 (회원가입 및 계정 관리)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>이용자는 Google 계정을 통해 회원가입을 할 수 있습니다.</li>
            <li>회원가입 시 제공하는 정보는 실제 정보를 기재해야 하며, 허위 정보를 제공한 경우 서비스 이용이 제한될 수 있습니다.</li>
            <li>이용자는 계정 정보를 타인에게 양도하거나 대여할 수 없으며, 계정의 관리 책임은 이용자 본인에게 있습니다.</li>
            <li>서비스 제공자는 이용자의 계정이 부정하게 사용되었다고 판단되는 경우, 해당 계정의 이용을 제한할 수 있습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 5조 (서비스의 제공 및 변경)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>서비스 제공자는 다음과 같은 서비스를 제공합니다:
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>AI 기반 랜딩페이지 문구 자동 생성 서비스</li>
                <li>생성된 문구의 미리보기 및 다운로드 기능</li>
                <li>사용량 관리 및 결제 서비스</li>
              </ul>
            </li>
            <li>서비스 제공자는 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.</li>
            <li>서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등을 명시하여 사전에 공지합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 6조 (서비스의 중단)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>서비스 제공자는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
            <li>서비스 제공자는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 서비스 제공자가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.</li>
            <li>사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 서비스 제공자는 제8조에 정한 방법으로 이용자에게 통지하고 당초 서비스 제공에서 예정한 보상금을 지급합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 7조 (이용자의 의무)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>이용자는 다음 행위를 하여서는 안 됩니다:
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>신청 또는 변경 시 허위내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>서비스 제공자가 게시한 정보의 변경</li>
                <li>서비스 제공자가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>서비스 제공자와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>서비스 제공자 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                <li>서비스의 안정적 운영을 방해할 수 있는 행위</li>
              </ul>
            </li>
            <li>이용자는 AI가 생성한 결과를 참고 자료로 활용해야 하며, 모든 콘텐츠의 최종 검토 및 법적 적합성 확인은 이용자의 책임입니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 8조 (요금 및 결제)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>서비스는 기본적으로 무료 체험을 제공하며, 무료 체험 한도는 서비스 내에 명시된 바에 따릅니다.</li>
            <li>무료 체험 한도 초과 시 유료 요금제를 이용할 수 있으며, 요금제의 종류 및 금액은 결제 페이지에 명시됩니다.</li>
            <li>결제는 신용카드, 계좌이체 등 서비스 제공자가 제공하는 결제수단을 통해 이루어집니다.</li>
            <li>결제 후 환불은 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따라 처리됩니다.</li>
            <li>서비스 제공자는 요금제를 변경할 수 있으며, 변경 시 기존 이용자에게 사전에 공지합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 9조 (지적재산권)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>서비스 제공자가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 서비스 제공자에 귀속됩니다.</li>
            <li>이용자가 서비스를 통해 생성한 콘텐츠에 대한 저작권은 이용자에게 귀속되며, 이용자는 해당 콘텐츠를 자유롭게 이용할 수 있습니다.</li>
            <li>이용자는 서비스를 통해 생성된 콘텐츠를 상업적 목적으로 이용할 수 있으나, 서비스 제공자에 대한 저작권 표시는 선택사항입니다.</li>
            <li>이용자는 서비스 제공자의 사전 승인 없이 서비스를 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 10조 (개인정보보호)</h2>
          <p>
            서비스 제공자는 이용자의 개인정보 보호를 위하여 노력합니다. 이용자의 개인정보 보호에 관해서는 관련법령 및 
            서비스 제공자가 정하는 "개인정보처리방침"에 정한 바에 따릅니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 11조 (책임의 한계)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>서비스 제공자는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
            <li>서비스 제공자는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
            <li>서비스 제공자는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
            <li>서비스 제공자는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</li>
            <li>서비스 제공자는 AI가 생성한 콘텐츠의 법적 적합성, 정확성, 완전성을 보장하지 않으며, 이용자는 생성된 콘텐츠를 사용하기 전에 반드시 검토하고 필요한 경우 법적 자문을 받아야 합니다.</li>
            <li>서비스 제공자는 이용자가 서비스를 이용하여 발생한 모든 손해에 대하여 책임을 지지 않습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 12조 (분쟁의 해결)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>서비스 제공자는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
            <li>서비스 제공자와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다.</li>
            <li>서비스 제공자와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법을 적용합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">제 13조 (회원 탈퇴 및 자격 상실)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>이용자는 언제든지 서비스 내 설정 메뉴를 통해 회원 탈퇴를 요청할 수 있으며, 서비스 제공자는 즉시 회원 탈퇴를 처리합니다.</li>
            <li>이용자가 다음 각 호의 사유에 해당하는 경우, 서비스 제공자는 회원 자격을 제한 및 정지시킬 수 있습니다:
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                <li>서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
              </ul>
            </li>
            <li>서비스 제공자가 회원 자격을 제한·정지시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 서비스 제공자는 회원 자격을 상실시킬 수 있습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-3">부칙</h2>
          <p>본 약관은 {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}부터 시행됩니다.</p>
        </div>
      </div>
    </section>
  );
}