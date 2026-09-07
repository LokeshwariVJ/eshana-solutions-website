import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { insightTitles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Editorial placeholders for Eshana Software Solutions writing on quality engineering, AI-assisted development, and release judgment.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Notes on quality, automation, and release judgment.">
        <p>
          A home for practical writing on how modern teams can move quickly
          without flattening quality into a checkbox.
        </p>
      </PageHero>
      <section className="section-pad">
        <div className="container-grid grid gap-px border border-line bg-line md:grid-cols-2">
          {insightTitles.map((title) => (
            <article key={title} className="bg-ivory p-7">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal">
                Essay
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-ink">
                {title}
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                Editorial placeholder for a future Eshana insight.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
