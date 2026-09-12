import type { Metadata } from "next";
import { headers } from "next/headers";
import { GateChecks, GateEngagement } from "@/components/ai-initiative-gate";
import { ButtonLink, PageHero, SectionIntro } from "@/components/ui";
import { gateContactPath, gateDeliverables, gatePath } from "@/lib/ai-initiative-gate";
import { siteConfig } from "@/lib/site";
import { brandSocialImage } from "@/lib/social";

const title = "AI Initiative Gate | Eshana Software Solutions";
const description =
  "Evaluate AI initiatives before funding them. Eshana assesses feasibility, infrastructure readiness, ownership, risk, ROI, and pilot success criteria to provide evidence-backed Go, Conditional, or No-Go recommendations.";
const url = `${siteConfig.url}${gatePath}`;

export const metadata: Metadata = {
  title: "AI Initiative Gate",
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", title, description, url, siteName: siteConfig.name, images: [brandSocialImage] },
  twitter: { card: "summary_large_image", title, description, images: [brandSocialImage] },
};

const questions = [
  "Is the idea feasible?",
  "Is the data usable?",
  "What infrastructure is missing?",
  "Who owns it after launch?",
  "What will it actually cost?",
  "What should the pilot prove?",
];

const example = [
  {
    check: "Intake",
    finding: "Clear problem and baseline; no operating owner or budget.",
    result: "Fail — hard stop",
  },
  {
    check: "Infrastructure",
    finding: "APIs available; sensitive data must stay in the environment and monitoring is missing.",
    result: "Upgrade needed",
  },
  {
    check: "ROI",
    finding: "Review effort, adoption, and recurring costs weaken the expected return.",
    result: "Weak payback",
  },
  {
    check: "Recommendation",
    finding: "Revisit after assigning ownership and improving infrastructure economics.",
    result: "No-Go",
  },
];

export default async function AiInitiativeGatePage() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Initiative Gate",
            serviceType: "AI Initiative Assessment",
            description,
            url,
            provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="AI Initiative Assessment"
        title="Before you fund the next AI idea, test the business case."
        actions={
          <>
            <ButtonLink href={gateContactPath}>Start with your idea list</ButtonLink>
            <ButtonLink href="#how-the-gate-works" variant="secondary">See how the Gate works</ButtonLink>
          </>
        }
      >
        <p>A short, fixed-scope gate that helps leadership decide which AI initiatives are worth a pilot — and what they must prove before scaling.</p>
      </PageHero>

      <section className="section-pad border-b border-line">
        <div className="container-grid grid gap-12 lg:grid-cols-2">
          <SectionIntro title="Ideas are not the problem. Deciding is.">
            <p>Most organizations already have more AI ideas than they can reasonably fund.</p>
          </SectionIntro>
          <div>
            <h3 className="text-lg font-medium text-ink">The harder questions are:</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {questions.map((question) => <li key={question} className="py-3 text-base leading-7 text-muted">{question}</li>)}
            </ul>
            <p className="mt-6 text-lg font-medium leading-8 text-ink">The Gate forces those questions to be answered before significant investment begins.</p>
          </div>
        </div>
      </section>

      <section id="how-the-gate-works" className="section-pad scroll-mt-20">
        <div className="container-grid">
          <SectionIntro title="How the Gate works" />
          <GateChecks />
          <p className="mt-10 text-base leading-7 text-ink">Every initiative receives one recommendation: <span className="font-medium text-teal">Go · Conditional · No-Go</span></p>
        </div>
      </section>

      <GateEngagement />

      <section className="section-pad">
        <div className="container-grid">
          <SectionIntro title="What you receive" />
          <dl className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {gateDeliverables.map((item) => (
              <div key={item.title} className="border-t border-line pt-6">
                <dt className="text-xl font-semibold text-ink">{item.title}</dt>
                <dd className="mt-3 text-base leading-7 text-muted">{item.description}</dd>
              </div>
            ))}
          </dl>

        </div>
      </section>

      <section className="section-pad border-y border-line bg-paper">
        <div className="container-grid">
          <SectionIntro title="Worked example: invoice extraction">
            <p>Illustrative example only.</p>
          </SectionIntro>
          <div
            role="region"
            aria-label="Invoice extraction assessment"
            tabIndex={0}
            className="mt-10 overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
          <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-sm leading-6 md:text-base md:leading-7">
            <caption className="sr-only">Illustrative invoice extraction assessment. Conceptual findings; no financial figures.</caption>
            <thead>
              <tr className="border-y border-line">
                <th scope="col" className="w-[26%] py-4 pr-3 font-semibold text-ink md:w-[20%] md:pr-6">Check</th>
                <th scope="col" className="w-[49%] py-4 pr-3 font-semibold text-ink md:w-[58%] md:pr-6">Finding</th>
                <th scope="col" className="py-4 font-semibold text-ink">Result</th>
              </tr>
            </thead>
            <tbody>
              {example.map((row) => (
                <tr key={row.check} className="border-b border-line align-top">
                  <th scope="row" className="py-5 pr-3 font-medium text-ink md:pr-6">{row.check}</th>
                  <td className="py-5 pr-3 text-muted md:pr-6">{row.finding}</td>
                  <td className="py-5 font-medium text-ink">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

        </div>
      </section>



      <section className="section-pad border-t border-line">
        <div className="container-grid grid gap-12 lg:grid-cols-2">
          <SectionIntro title="Why Eshana">
            <p>Eshana brings nearly a decade of software quality experience across environments where unverified assumptions can be expensive.</p>
          </SectionIntro>
          <div className="space-y-8">
            <div className="border-t border-line pt-6">
              <h3 className="text-2xl font-semibold text-ink">Independent by design</h3>
              <p className="mt-4 text-lg leading-8 text-muted">We do not sell an AI platform through this assessment, so there is no incentive to force a &ldquo;yes.&rdquo;</p>
            </div>
            <div className="border-t border-line pt-6">
              <h3 className="text-2xl font-semibold text-ink">Evidence over enthusiasm</h3>
              <p className="mt-4 text-lg leading-8 text-muted">Define the criterion, capture the evidence, make the decision.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-paper">
        <div className="container-grid">
          <SectionIntro title="Have an AI idea list already?">
            <p>Send us the rough list. It does not need to be polished.</p>
          </SectionIntro>
          <div className="mt-9">
            <ButtonLink href={gateContactPath}>Start with your idea list</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
