export default function TermsPage() {
  return (
    <section className="card space-y-4">
      <h2 className="text-2xl font-semibold">이용약관</h2> 
        <div className="space-y-3 text-sm text-slate-300">
        <div>
      <h3 className="font-semibold text-slate-100">제 1조 목적</h3> 
      <p>본 약관은 서비스 이용과 관련된 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.</p> 
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">제 2조 서비스 이용</h3> 
          <p>이용자는 AI가 생성한 결과를 참고 자료로 활용해야 하며, 모든 콘텐츠의 최종 검토는 이용자의 책임입니다.</p> 
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">제 3조 요금 및 결제</h3> 
          <p>무료 체험 한도 이후 추가 사용 시 결제 페이지에 명시된 요금제에 따라 과금이 발생할 수 있습니다.</p> 
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">제 4조 책임의 한계</h3> 
          <p>본 서비스는 생성된 카피의 법적 적합성을 보장하지 않으며, 이용자는 관련 법규를 준수해야 합니다.</p> 
        </div>
      </div>
    </section>
  );
}