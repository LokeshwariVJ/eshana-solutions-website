import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="container-grid grid items-start gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
          <div className="relative aspect-[4/5] w-full min-w-0 max-w-80 overflow-hidden rounded-[2px] border border-line lg:max-w-[25rem]">
            <Image
              src="/images/founder-lokeshwari.jpg"
              alt="Lokeshwari Padmanabhan, Founder and Quality Engineering Consultant at Eshana Software Solutions"
              fill
              sizes="(min-width: 1150px) 400px, (min-width: 1024px) calc((100vw - 80px) * 0.375), (min-width: 352px) 320px, calc(100vw - 32px)"
              className="object-cover object-center"
            />
          </div>
          <div className="min-w-0">
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
