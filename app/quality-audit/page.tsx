import type { Metadata } from "next";
import { ButtonLink, CheckList, PageHero, SectionIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quality Audit",
  description:
    "A focused independent software Quality Audit for launch readiness, critical workflows, exploratory testing, and release-risk findings.",
  alternates: { canonical: "/quality-audit" },
};

const starterIncludes = [
  "One application",
  "Up to three critical user journeys",
  "Exploratory testing",
  "Critical defect analysis",
  "Quality summary",
  "30-minute review",
];

export default function QualityAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality Audit"
        title="Before you launch, let someone try to break it."
        actions={<ButtonLink href="/contact?service=quality-audit">Request a Quality Audit</ButtonLink>}
      >
        <p>
          A focused review for teams who want an independent look at the
          workflows, edge cases, and release risks that matter before launch.
        </p>
      </PageHero>

      <section className="section-pad border-b border-line">
        <div className="container-grid">
          <SectionIntro title="A simple three-step process." />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              ["1", "Tell us what you're building"],
              ["2", "We investigate"],
              ["3", "You receive actionable findings"],
            ].map(([step, title]) => (
              <article key={step} className="bg-ivory p-7">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal">
                  Step {step}
                </p>
                <h2 className="mt-5 text-2xl font-semibold text-ink">{title}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container-grid grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal">
              Starter Audit
            </p>
            <h2 className="mt-4 text-5xl font-semibold text-ink">
              Starting at $299
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              Payments are not implemented yet. For now, the audit starts with a
              conversation and a clear scope.
            </p>
          </div>
          <div className="border border-line bg-surface p-7">
            <CheckList items={starterIncludes} />
          </div>
        </div>
      </section>
    </>
  );
}
