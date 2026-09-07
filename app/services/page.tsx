import type { Metadata } from "next";
import { ButtonLink, PageHero, SectionIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Quality Engineering, automation engineering, API testing, and AI-assisted quality services for modern software teams.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    title: "Quality Engineering",
    body: "Independent product risk review across user journeys, integrations, authentication, data behavior, browser support, and release readiness. The goal is not to test everything. The goal is to find the issues that should change a decision.",
    points: ["Release-risk assessment", "Exploratory testing", "QA strategy"],
  },
  {
    title: "Automation Engineering",
    body: "Automation should protect important workflows, clarify failures, and earn its maintenance cost. Eshana builds practical coverage around the flows your customers and teams rely on.",
    points: ["Playwright and Cypress suites", "API test coverage", "CI/CD quality gates"],
  },
  {
    title: "AI & Modern Quality Engineering",
    body: "AI can speed up coding, test design, investigation, and documentation. Quality Engineering keeps that speed grounded by validating behavior, assumptions, and release risk.",
    points: [
      "AI-assisted test design",
      "Regression failure investigation",
      "Human review of quality signals",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Practical quality engineering for teams moving quickly.">
        <p>
          Eshana helps teams improve software quality through thoughtful test
          strategy, workflow-centered automation, API validation, and modern QA
          practices that fit lean engineering teams.
        </p>
      </PageHero>

      <section className="section-pad">
        <div className="container-grid space-y-10">
          {services.map((service) => (
            <article
              key={service.title}
              className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[0.45fr_1fr]"
            >
              <h2 className="text-3xl font-semibold text-ink">
                {service.title}
              </h2>
              <div>
                <p className="text-lg leading-8 text-muted">{service.body}</p>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="border border-line bg-surface px-4 py-2 text-sm font-medium text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad border-t border-line bg-paper">
        <div className="container-grid">
          <SectionIntro title="Start with a focused audit, or build a longer-term quality foundation." />
          <div className="mt-8">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
