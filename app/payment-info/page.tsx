export default function PaymentInfoPage() {
  return (
    <section className="space-y-8">
      <div className="card space-y-4 text-center">
        <h1 className="text-3xl font-bold">결제 안내</h1>
        <p className="text-base text-slate-300 leading-relaxed">
          프로 요금제 이용을 위한 결제 안내입니다. 카카오페이를 통해 간편하게 결제하실 수 있으며, 
          결제 후 24시간 내 계정이 업그레이드됩니다.
        </p>
      </div>

      {/* 프로 요금제 상세 정보 */}
      <div className="card space-y-6">
        <h2 className="text-2xl font-bold text-white">💎 프로 요금제 상세 정보</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-100 mb-2">📊 포함된 기능</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>무제한 카피 생성 (월 제한 없음)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>JSON 스키마 기반 상세 결과 제공</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>브랜드 보이스 요약 제공</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>팀 공유 링크 기능</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>CSV 내보내기 기능</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>우선 고객 지원</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-100 mb-2">💰 요금 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">월 이용료</span>
                  <span className="font-semibold text-primary">₩19,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">결제 주기</span>
                  <span className="font-semibold">월간 자동 결제</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">무료 체험</span>
                  <span className="font-semibold">월 3회 제공</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">환불 정책</span>
                  <a href="/refund" className="font-semibold text-primary hover:underline">
                    환불 규정 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white">💳 결제 방법</h2>

        <div className="rounded-lg bg-slate-800/50 p-6 space-y-4">
          <h4 className="font-semibold text-lg">📤 송금 방법</h4>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-400 mb-1">1. 카카오페이로 송금</p>
              <div className="bg-slate-900 rounded p-3 space-y-2">
                <p className="text-slate-300">
                  아래 버튼을 눌러 카카오페이로 송금해주세요.
                </p>
                <a
                  href="https://qr.kakaopay.com/FaHneA0xp251c06091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full rounded-lg bg-yellow-400 text-yellow-900 px-4 py-2 font-semibold transition-transform hover:-translate-y-0.5"
                >
                  💛 카카오페이로 송금하기 (₩19,000)
                </a>
                <p className="text-xs text-slate-500">
                  카카오톡이 설치된 기기에서만 작동합니다.
                </p>
              </div>
            </div>

            <div>
              <p className="text-slate-400 mb-1">2. 송금 후 이메일 전송</p>
              <div className="bg-slate-900 rounded p-3 space-y-2">
                <p className="text-slate-300">
                  <span className="text-slate-500">받는 사람:</span> tears0427@gmail.com
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-500">제목:</span> 프로 요금제 결제 완료
                </p>
                <div className="text-slate-300">
                  <p className="text-slate-500 mb-1">내용:</p>
                  <div className="bg-slate-950 rounded p-2 text-xs">
                    - 입금자명: 홍길동<br/>
                    - 로그인 이메일: user@example.com<br/>
                    - 입금 일시: 2025-11-11 14:30
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-slate-400 mb-1">3. 계정 업그레이드</p>
              <p className="text-slate-300">
                확인 후 24시간 내 계정을 업그레이드해드립니다.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-400/10 border border-yellow-400/30 p-4 text-sm">
          <p className="text-yellow-400 font-semibold mb-2">💡 카카오페이가 편해요!</p>
          <p className="text-slate-300 mb-3">
            카카오톡만 있으면 간편하게 송금할 수 있습니다.<br/>
            위의 노란색 버튼을 눌러주세요.
          </p>
        </div>

        <div className="text-xs text-slate-500 space-y-1">
          <p>• 송금 전 이메일 주소를 정확히 확인해주세요.</p>
          <p>• 환불은 이용 시작 전에만 가능합니다.</p>
          <p>• 문의사항은 tears0427@gmail.com으로 연락주세요.</p>
        </div>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="card space-y-4">
        <h2 className="text-2xl font-bold text-white">❓ 결제 관련 자주 묻는 질문</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q1. 결제 후 언제부터 사용할 수 있나요?</h3>
            <p className="text-sm text-slate-300">
              결제 확인 후 24시간 이내에 계정이 업그레이드됩니다. 이메일로 입금 정보를 보내주시면 
              빠르게 처리해드립니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q2. 자동 결제가 되나요?</h3>
            <p className="text-sm text-slate-300">
              현재는 수동 결제 방식을 사용하고 있습니다. 매월 결제일 전에 안내 메일을 보내드리며, 
              카카오페이를 통해 간편하게 결제하실 수 있습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q3. 환불이 가능한가요?</h3>
            <p className="text-sm text-slate-300">
              이용 시작 전에만 환불이 가능합니다. 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따라 
              환불이 처리됩니다. 상세한 환불 규정은 <a href="/refund" className="text-primary hover:underline">환불 규정 페이지</a>에서 확인하실 수 있습니다. 
              환불 요청은 tears0427@gmail.com으로 문의해주세요.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q4. 다른 결제 수단을 사용할 수 있나요?</h3>
            <p className="text-sm text-slate-300">
              현재는 카카오페이를 통한 결제만 지원하고 있습니다. 다른 결제 수단이 필요하시면 
              tears0427@gmail.com으로 문의해주세요.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-100">Q5. 프로 요금제를 취소할 수 있나요?</h3>
            <p className="text-sm text-slate-300">
              언제든지 프로 요금제를 취소하실 수 있습니다. 취소하시면 다음 결제 주기부터 
              무료 플랜으로 전환되며, 이미 결제된 기간은 그대로 사용하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

