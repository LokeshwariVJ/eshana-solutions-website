import { gateChecks, gateEngagement } from "@/lib/ai-initiative-gate";
import { SectionIntro } from "@/components/ui";

export function GateChecks() {
  return (
    <ol className="mt-12 grid gap-10 lg:grid-cols-3">
      {gateChecks.map((check, index) => (
        <li key={check.title} className="min-w-0 border-t border-line pt-6">
          <p className="text-sm font-medium text-teal" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 text-sm font-semibold uppercase leading-6 text-ink">{check.title}</h3>
          <p className="mt-5 text-base leading-7 text-muted">{check.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function GateEngagement() {
  return (
    <section className="section-pad border-t border-line">
      <div className="container-grid">
        <SectionIntro title="How to engage" />
        <ol className="mt-12 space-y-8">
          {gateEngagement.map((step, index) => (
            <li key={step.title} className="grid gap-5 border-t border-line pt-8 md:grid-cols-[0.7fr_1fr] md:gap-10">
              <div className="min-w-0">
                <p className="mb-3 text-sm font-medium uppercase text-teal">{String(index + 1).padStart(2, "0")} — {step.stage}</p>
                <h3 className="text-xl font-semibold leading-8 text-ink">{step.title}</h3>
                <p className="mt-4 text-2xl font-semibold text-ink">{step.price}</p>
              </div>
              <div className="min-w-0 space-y-4 text-base leading-7 text-muted">
                {step.scope ? <p className="font-medium text-ink">{step.scope}</p> : null}
                <p>{step.description}</p>
                {step.includes ? (
                  <>
                    <p className="font-medium text-ink">Includes:</p>
                    <ul className="list-disc space-y-2 pl-5">
                      {step.includes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </>
                ) : null}
                {step.additional ? <p className="font-medium text-ink">{step.additional}</p> : null}
                {step.note ? <p className="border-t border-line pt-4 text-sm font-medium text-ink">{step.note}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
