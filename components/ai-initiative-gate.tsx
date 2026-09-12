import { gateBoundaries, gateChecks, gateEngagement } from "@/lib/ai-initiative-gate";
import { SectionIntro } from "@/components/ui";

export function GateChecks({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="mt-12 grid gap-10 lg:grid-cols-3">
      {gateChecks.map((check, index) => (
        <li key={check.title} className="min-w-0 border-t border-line pt-6">
          <p className="text-sm font-medium text-teal" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-sm font-semibold uppercase leading-6 text-ink">
            {check.title}
          </h3>
          <p className="mt-5 text-lg font-medium leading-7 text-ink">{check.question}</p>
          <p className="mt-4 text-base leading-7 text-muted">{check.description}</p>
          {detailed ? (
            <p className="mt-4 text-base leading-7 text-muted">{check.detail}</p>
          ) : index === 0 ? (
            <p className="mt-4 text-base font-medium text-ink">Some criteria are hard stops.</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function GateEngagement() {
  return (
    <section className="section-pad border-t border-line">
      <div className="container-grid">
        <SectionIntro title="How the engagement runs" />
        <ol className="mt-12 space-y-8">
          {gateEngagement.map((step, index) => (
            <li key={step.title} className="grid gap-5 border-t border-line pt-8 md:grid-cols-[0.7fr_1fr] md:gap-10">
              <h3 className="text-xl font-semibold leading-8 text-ink">
                <span className="mr-4 text-sm font-medium text-teal" aria-hidden="true">{index + 1}.</span>
                {step.title}
              </h3>
              <div className="space-y-4 text-base leading-7 text-muted">
                <p>{step.description}</p>
                {step.outcome ? <p className="text-ink"><span className="font-medium">Outcome: </span>{step.outcome}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function GateBoundaries() {
  return (
    <section className="section-pad border-t border-line">
      <div className="container-grid grid gap-10 lg:grid-cols-[0.7fr_1fr]">
        <SectionIntro title="What this is not">
          <p>The purpose of the gate is independent decision support, not implementation sales.</p>
        </SectionIntro>
        <ul className="divide-y divide-line border-y border-line">
          {gateBoundaries.map((boundary) => (
            <li key={boundary} className="py-4 text-base leading-7 text-muted">{boundary}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
