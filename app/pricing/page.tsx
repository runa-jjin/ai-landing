"use client";

const getPaymentUrl = () => {
  return typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_PAYMENT_URL || "/payment-info")
    : "/payment-info";
};

const plans = [
  {
    name: "스타터",
    price: "무료", 
    description: "월 3회 카피 생성", 
    features: ["무료 3회 생성", "JSON 스키마 기반 결과", "브랜드 보이스 요약 제공"],
    buttonText: "무료로 시작하기",
    buttonLink: "/auth/signin",
    buttonStyle: "secondary"
  },
  {
    name: "프로",
    price: "₩19,000",
    description: "마케팅 팀을 위한 무제한 생성", 
    features: ["무제한 카피 생성", "팀 공유 링크", "CSV 내보내기"],
    buttonText: "💛 카카오페이로 결제",
    get buttonLink() { return getPaymentUrl(); },
    buttonStyle: "primary"
  },
  {
    name: "에이전시",
    price: "₩39,000",
    description: "에이전시 협업을 위한 확장 기능",
    features: ["다중 브랜드 관리", "전담 성공 매니저", "커스텀 프롬프트 컨설팅"],
    buttonText: "문의하기",
    buttonLink: "mailto:tears0427@gmail.com?subject=에이전시 플랜 문의",
    buttonStyle: "secondary"
  }
];

export default function PricingPage() {
  return (
    <section className="space-y-6 pt-24">
      <div className="card space-y-3 text-center p-4">
        <h1 className="text-2xl font-bold">요금제</h1> 
        <p className="text-sm text-slate-300 leading-relaxed">
          필요에 맞는 요금제를 선택하고 AI 카피라이팅을 시작하세요. 
          무료 체험으로 서비스 품질을 먼저 확인하신 후 유료 플랜으로 업그레이드하실 수 있습니다.
        </p> 
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
            <div key={plan.name} className="card space-y-4 flex flex-col p-4"> 
            <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3> 
            <p className="text-xl font-bold text-primary">{plan.price}</p>
            <p className="text-xs text-slate-400">{plan.description}</p> 
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  <span>{feature}</span> 
                </li>
              ))}
            </ul>
            <a
              href={plan.buttonLink}
              target={plan.buttonLink.startsWith('http') ? '_blank' : undefined}
              rel={plan.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`
                w-full rounded-lg px-3 py-2 text-center text-xs font-semibold transition-all hover:-translate-y-0.5
                ${plan.buttonStyle === 'primary' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700' 
                  : 'border border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700'
                }
              `}
            >
              {plan.buttonText}
            </a>
          </div>
        ))}
      </div>

      {/* 요금제 비교표 */}
      <div className="card space-y-3 p-4">
        <h2 className="text-xl font-bold text-white">📊 요금제 비교</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-2 px-3 font-semibold text-slate-100">기능</th>
                <th className="text-center py-2 px-3 font-semibold text-slate-100">스타터</th>
                <th className="text-center py-2 px-3 font-semibold text-primary">프로</th>
                <th className="text-center py-2 px-3 font-semibold text-slate-100">에이전시</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">월 생성 횟수</td>
                <td className="text-center py-2 px-3">3회</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">무제한</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">무제한</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">JSON 스키마 결과</td>
                <td className="text-center py-2 px-3">✓</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">브랜드 보이스 요약</td>
                <td className="text-center py-2 px-3">✓</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">팀 공유 링크</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">CSV 내보내기</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">다중 브랜드 관리</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-2 px-3">전담 성공 매니저</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
              <tr>
                <td className="py-2 px-3">커스텀 프롬프트 컨설팅</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3">-</td>
                <td className="text-center py-2 px-3 font-semibold text-primary">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 자주 묻는 질문 */}
      <div className="card space-y-3 p-4">
        <h2 className="text-xl font-bold text-white">❓ 요금제 관련 자주 묻는 질문</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-slate-100">Q1. 무료 플랜으로도 충분한가요?</h3>
            <p className="text-xs text-slate-300">
              무료 플랜은 월 3회까지 생성할 수 있어 개인 프로젝트나 소규모 테스트에는 충분합니다. 
              하지만 마케팅 팀이나 정기적인 카피 생성이 필요한 경우 프로 요금제를 추천합니다.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-slate-100">Q2. 프로 요금제와 에이전시 플랜의 차이는 무엇인가요?</h3>
            <p className="text-xs text-slate-300">
              프로 요금제는 개인이나 소규모 팀을 위한 플랜이며, 에이전시 플랜은 여러 브랜드를 관리하는 
              에이전시나 대규모 팀을 위한 플랜입니다. 에이전시 플랜에는 전담 성공 매니저와 커스텀 프롬프트 
              컨설팅이 포함됩니다.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-slate-100">Q3. 요금제를 나중에 변경할 수 있나요?</h3>
            <p className="text-xs text-slate-300">
              네, 언제든지 요금제를 변경하실 수 있습니다. 업그레이드 시 즉시 적용되며, 다운그레이드 시에는 
              다음 결제 주기부터 적용됩니다.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-semibold text-slate-100">Q4. 연간 결제 할인이 있나요?</h3>
            <p className="text-xs text-slate-300">
              현재는 월간 결제만 지원하고 있습니다. 연간 결제 할인에 대한 문의는 
              tears0427@gmail.com으로 연락주세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}