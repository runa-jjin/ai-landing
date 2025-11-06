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
    <section className="space-y-8">
      <div className="card space-y-2 text-center">
        <h2 className="text-3xl font-semibold">요금제</h2> 
        <p className="text-sm text-slate-300">필요에 맞는 요금제를 선택하고 AI 카피라이팅을 시작하세요.</p> 
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
            <div key={plan.name} className="card space-y-6 flex flex-col"> 
            <div className="space-y-1">
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3> 
            <p className="text-2xl font-bold text-primary">{plan.price}</p>
            <p className="text-xs text-slate-400">{plan.description}</p> 
            </div>
            <ul className="space-y-2 text-sm text-slate-200 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  <span>{feature}</span> 
                </li>
              ))}
            </ul>
            <a
              href={plan.buttonLink}
              target={plan.buttonLink.startsWith('http') ? '_blank' : undefined}
              rel={plan.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`
                w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5
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
    </section>
  );
}