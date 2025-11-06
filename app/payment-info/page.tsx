export default function PaymentInfoPage() {
  return (
    <section className="space-y-8">
      <div className="card space-y-4 text-center">
        <h2 className="text-3xl font-semibold">결제 안내</h2>
        <p className="text-sm text-slate-300">
          프로 요금제 이용을 위한 송금 안내입니다.
        </p>
      </div>

      <div className="card space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">💳 프로 요금제</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">월 이용료</span>
              <span className="font-semibold">₩19,000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">생성 횟수</span>
              <span className="font-semibold">무제한</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">지원 기능</span>
              <span className="font-semibold">모든 기능</span>
            </div>
          </div>
        </div>

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
    </section>
  );
}

