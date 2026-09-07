import type { Metadata } from "next";
import { PageHero, SectionIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eshana Software Solutions is an Arizona-based founder-led Quality Engineering consultancy led by Lokeshwari Padmanabhan.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Senior experience. Small-team attention.">
        <p>
          Eshana Software Solutions is an Arizona-based, founder-led consultancy
          helping software teams improve quality, automation, and release
          confidence without adding enterprise consulting overhead.
        </p>
      </PageHero>

      <section className="section-pad">
        <div className="container-grid grid gap-12 lg:grid-cols-[0.55fr_1fr]">
          <div className="min-h-[24rem] border border-line bg-paper p-6">
            <div className="flex h-full items-end border border-dashed border-line bg-surface p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                Founder photo
              </p>
            </div>
          </div>
          <div>
            <SectionIntro title="Lokeshwari Padmanabhan">
              <p>Founder & Quality Engineering Consultant</p>
            </SectionIntro>
            <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
              <p>
                Lokeshwari brings approximately ten years of experience across
                banking, payments, e-commerce, SaaS, APIs, data platforms, and
                modern web applications.
              </p>
              <p>
                Her technology experience includes Selenium, Cypress,
                Playwright, Postman, Python, SQL, and CI/CD. Recent work focuses
                on AI-assisted development and Quality Engineering: using modern
                tools to move faster while keeping human judgment at the center
                of release decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
