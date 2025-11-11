export default function RefundPage() {
  return (
    <section className="space-y-4 pt-24 max-w-6xl mx-auto px-4">
      <div className="card space-y-2 p-3">
        <h1 className="text-xl font-bold">환불 규정</h1>
        <p className="text-xs text-slate-400">
          최종 수정일: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="card space-y-3 p-3 text-xs text-slate-300 leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 1조 (목적)</h2>
          <p>
            본 환불 규정은 랜딩페이지 문구 자동 생성기(이하 "서비스")의 유료 요금제 결제 및 환불에 관한 사항을 규정함을 목적으로 합니다.
            본 규정은 「전자상거래 등에서의 소비자 보호에 관한 법률」 및 관련 법령을 준수합니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 2조 (적용 범위)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>본 환불 규정은 프로 요금제(월 ₩19,000) 및 에이전시 요금제(월 ₩39,000)에 적용됩니다.</li>
            <li>무료 요금제(스타터)는 환불 대상이 아닙니다.</li>
            <li>본 규정에 명시되지 않은 사항은 관련 법령 및 일반 상관례에 따릅니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 3조 (환불 가능 기간 및 조건)</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">3.1 이용 시작 전 환불</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>결제 완료 후 서비스 이용을 시작하기 전에는 100% 환불이 가능합니다.</li>
                <li>계정 업그레이드가 완료되기 전(결제 확인 후 24시간 이내)에는 전액 환불이 가능합니다.</li>
                <li>환불 요청은 결제일로부터 7일 이내에 가능합니다.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">3.2 이용 시작 후 환불</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>서비스 이용을 시작한 후에는 「전자상거래 등에서의 소비자 보호에 관한 법률」 제17조 제2항에 따라 환불이 제한될 수 있습니다.</li>
                <li>다만, 다음의 경우에는 환불이 가능합니다:
                  <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                    <li>서비스의 중대한 결함으로 인해 정상적인 이용이 불가능한 경우</li>
                    <li>서비스 제공자가 약정한 내용과 다르게 서비스가 제공된 경우</li>
                    <li>서비스 제공자의 귀책사유로 인한 서비스 중단이 30일 이상 지속된 경우</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 4조 (환불 금액 계산)</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">4.1 전액 환불</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>이용 시작 전 환불: 결제 금액의 100% 환불</li>
                <li>계정 업그레이드 전 환불: 결제 금액의 100% 환불</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">4.2 부분 환불</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>이용 시작 후 환불이 가능한 경우: 잔여 기간에 해당하는 금액만 환불</li>
                <li>환불 금액 = (결제 금액 ÷ 총 이용 기간) × 잔여 이용 기간</li>
                <li>이용 기간은 일 단위로 계산되며, 1일 미만은 1일로 계산합니다.</li>
                <li>이미 사용한 기간에 대해서는 환불되지 않습니다.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">4.3 환불 제외 금액</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>이미 사용한 서비스에 대한 대가</li>
                <li>환불 처리 수수료(단, 서비스 제공자의 귀책사유인 경우 제외)</li>
                <li>결제 대행 수수료(카카오페이 등)</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 5조 (환불 절차)</h2>
          <div className="space-y-2">
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>환불 요청: tears0427@gmail.com으로 환불 요청 이메일 발송
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>제목: 환불 요청</li>
                  <li>내용: 로그인 이메일, 결제 일시, 입금자명, 환불 사유</li>
                </ul>
              </li>
              <li>환불 요청 확인: 서비스 제공자가 환불 요청을 확인하고 검토합니다 (영업일 기준 1-2일 소요)</li>
              <li>환불 승인: 환불 조건에 해당하는 경우 환불을 승인합니다</li>
              <li>환불 처리: 승인 후 영업일 기준 3-5일 이내에 환불을 처리합니다</li>
              <li>환불 완료: 환불이 완료되면 이메일로 안내합니다</li>
            </ol>
            <div className="bg-yellow-400/10 border border-yellow-400/30 p-3 rounded-lg mt-3">
              <p className="text-yellow-400 font-semibold mb-1">💡 환불 처리 기간</p>
              <p className="text-slate-300">
                환불 요청 접수 후 영업일 기준 5-7일 이내에 환불 처리가 완료됩니다. 
                카카오페이를 통한 환불의 경우, 카카오페이 정책에 따라 추가 시간이 소요될 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 6조 (환불 불가 사유)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>이용자가 서비스를 정상적으로 이용한 후 단순 변심으로 인한 환불 요청</li>
            <li>이용자의 귀책사유로 인한 계정 정지 또는 이용 제한</li>
            <li>이용자가 약관을 위반하여 서비스 이용이 제한된 경우</li>
            <li>무료 체험 기간 종료 후 환불 요청</li>
            <li>결제일로부터 7일이 경과한 후의 환불 요청 (단, 서비스 제공자의 귀책사유인 경우 제외)</li>
            <li>이용자가 생성한 콘텐츠의 품질이나 결과에 대한 불만으로 인한 환불 요청</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 7조 (요금제 취소 및 변경)</h2>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-100 mb-1">7.1 요금제 취소</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>이용자는 언제든지 요금제를 취소할 수 있습니다.</li>
              <li>요금제 취소 시 다음 결제 주기부터 무료 요금제로 전환됩니다.</li>
              <li>이미 결제된 기간은 그대로 사용할 수 있으며, 환불되지 않습니다.</li>
              <li>요금제 취소는 tears0427@gmail.com으로 요청하실 수 있습니다.</li>
            </ul>
            <h3 className="text-sm font-semibold text-slate-100 mb-1 mt-3">7.2 요금제 변경</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>프로 요금제에서 에이전시 요금제로 변경 시, 잔여 기간에 대한 차액을 추가 결제합니다.</li>
              <li>에이전시 요금제에서 프로 요금제로 변경 시, 잔여 기간에 대한 차액은 다음 결제 시 반영됩니다.</li>
              <li>요금제 변경은 tears0427@gmail.com으로 문의해주세요.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 8조 (환불 방법)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>환불은 원칙적으로 결제 시 사용한 결제 수단으로 환불됩니다.</li>
            <li>카카오페이를 통한 결제의 경우, 카카오페이 계정으로 환불됩니다.</li>
            <li>결제 수단이 변경되었거나 환불이 불가능한 경우, 이용자와 협의하여 다른 방법으로 환불할 수 있습니다.</li>
            <li>환불 시 결제 대행 수수료는 차감될 수 있습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 9조 (분쟁 해결)</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>환불 관련 분쟁이 발생한 경우, 이용자와 서비스 제공자는 성실히 협의하여 해결합니다.</li>
            <li>협의가 이루어지지 않는 경우, 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따라 소비자분쟁조정위원회에 조정을 신청할 수 있습니다.</li>
            <li>서비스 제공자와 이용자 간에 발생한 분쟁에 관한 소송은 제소 당시의 이용자의 주소를 관할하는 지방법원의 전속관할로 합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">제 10조 (환불 문의)</h2>
          <p className="mb-2">
            환불 관련 문의사항이 있으시면 아래 연락처로 문의해주시기 바랍니다.
          </p>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <p><strong>이메일:</strong> tears0427@gmail.com</p>
            <p className="mt-1"><strong>처리 기간:</strong> 접수일로부터 영업일 기준 5-7일 이내</p>
            <p className="mt-1"><strong>운영 시간:</strong> 평일 09:00 - 18:00 (주말 및 공휴일 제외)</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-2">부칙</h2>
          <p>본 환불 규정은 {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}부터 시행됩니다.</p>
          <p className="mt-2">
            본 규정은 관련 법령의 변경 또는 서비스 정책 변경에 따라 수정될 수 있으며, 
            변경 시 서비스 홈페이지를 통해 공지합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

