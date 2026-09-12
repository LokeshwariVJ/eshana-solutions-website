import type { Metadata } from "next";
import { GateBoundaries, GateChecks, GateEngagement } from "@/components/ai-initiative-gate";
import { ButtonLink, PageHero, SectionIntro } from "@/components/ui";
import { gateContactPath, gateDeliverables, gatePath } from "@/lib/ai-initiative-gate";
import { siteConfig } from "@/lib/site";

const title = "AI Initiative Gate | Eshana Software Solutions";
const description =
  "Evaluate AI initiatives before funding them. Eshana assesses feasibility, infrastructure readiness, ownership, risk, ROI, and pilot success criteria to provide evidence-backed Go, Conditional, or No-Go recommendations.";
const url = `${siteConfig.url}${gatePath}`;

export const metadata: Metadata = {
  title: "AI Initiative Gate",
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", title, description, url, siteName: siteConfig.name },
  twitter: { card: "summary", title, description },
};

const questions = [
  "Is the idea feasible?",
  "Is the data usable?",
  "What infrastructure is missing?",
  "Who owns it after launch?",
  "What will it actually cost?",
  "What should the pilot prove?",
  "When should the team stop?",
];

const comparison = [
  {
    title: "Without a gate",
    points: [
      "An idea gets funded because someone senior liked it.",
      "No baseline is captured.",
      "Infrastructure costs appear halfway through.",
      "Ownership is unclear after go-live.",
      "The year-end KPI says: ‘we did some AI.’",
    ],
  },
  {
    title: "With a gate",
    points: [
      "Every idea answers the same questions before funding.",
      "Baseline and success criteria are agreed up front.",
      "Infrastructure gaps and costs are visible early.",
      "An owner is named or the idea does not pass.",
      "Leadership can report which ideas were assessed, piloted, scaled, or stopped — and why.",
    ],
  },
];

const example = [
  {
    check: "Intake",
    finding: "Clear business problem and baseline, but no operating owner and no allocated budget.",
    result: "Fail — hard stop",
  },
  {
    check: "Infrastructure",
    finding: "APIs available, but sensitive vendor bank data cannot leave the environment, monitoring is missing, and additional infrastructure is required.",
    result: "Upgrade needed",
  },
  {
    check: "ROI",
    finding: "Claimed productivity improvement becomes much smaller after review effort, adoption, recurring cost, and realism adjustments.",
    result: "Weak payback",
  },
  {
    check: "Recommendation",
    finding: "Do not fund as scoped. Revisit only if ownership is assigned and infrastructure economics improve.",
    result: "No-Go",
  },
];

export default function AiInitiativeGatePage() {
  return (
    <>
      <script
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
            <ButtonLink href={gateContactPath}>Assess your idea list</ButtonLink>
            <ButtonLink href="#how-the-gate-works" variant="secondary">See how the gate works</ButtonLink>
          </>
        }
      >
        <p>A short, fixed-scope gate that helps leadership decide which AI initiatives are worth a pilot — and what they must prove before scaling.</p>
        <p>This is an independent decision gate before money moves.</p>
      </PageHero>

      <section className="section-pad border-b border-line">
        <div className="container-grid grid gap-12 lg:grid-cols-2">
          <SectionIntro title="Ideas are not the problem. Deciding is.">
            <p>Most organizations already have more AI ideas than they can reasonably fund.</p>
            <p>Chatbots. Document processing. Forecasting. Automation. Internal copilots. Customer-facing assistants.</p>
          </SectionIntro>
          <div>
            <h3 className="text-lg font-medium text-ink">The harder questions are:</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {questions.map((question) => <li key={question} className="py-3 text-base leading-7 text-muted">{question}</li>)}
            </ul>
            <p className="mt-6 text-lg font-medium leading-8 text-ink">The gate forces those questions to be answered before significant investment begins.</p>
          </div>
        </div>
      </section>

      <section aria-label="Without a gate and with a gate" className="section-pad border-b border-line">
        <div className="container-grid grid gap-12 md:grid-cols-2">
          {comparison.map((column, index) => (
            <div key={column.title} className={index === 1 ? "border-t border-line pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0" : ""}>
              <h2 className="text-sm font-semibold uppercase text-teal">{column.title}</h2>
              <ul className="mt-7 space-y-5">
                {column.points.map((point) => <li key={point} className="text-lg leading-8 text-muted">{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="how-the-gate-works" className="section-pad scroll-mt-8">
        <div className="container-grid">
          <SectionIntro title="Three checks. One decision.">
            <p>Every idea finishes with a Go, Conditional, or No-Go recommendation — supported by evidence.</p>
          </SectionIntro>
          <GateChecks detailed />
        </div>
      </section>

      <section className="section-pad border-y border-line bg-paper">
        <div className="container-grid">
          <SectionIntro title="Worked example: invoice extraction">
            <p>Illustrative numbers only.</p>
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
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="text-xl font-semibold text-ink">Working method</h3>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-muted">Your team keeps the framework and can reuse it for future ideas. The goal is not dependency on Eshana.</p>
          </div>
        </div>
      </section>

      <GateEngagement />
      <GateBoundaries />

      <section className="section-pad border-t border-line">
        <div className="container-grid grid gap-12 lg:grid-cols-2">
          <SectionIntro title="Why Eshana">
            <p>Eshana brings nearly a decade of software quality experience across environments where unverified assumptions can be expensive.</p>
            <p>The same discipline applies here:</p>
            <ul className="space-y-2 border-l border-line pl-5">
              <li>define the criterion</li>
              <li>capture the evidence</li>
              <li>rate the result</li>
              <li>make the decision</li>
            </ul>
          </SectionIntro>
          <div className="space-y-8">
            <div className="border-t border-line pt-6">
              <h3 className="text-2xl font-semibold text-ink">Independent by design</h3>
              <p className="mt-4 text-lg leading-8 text-muted">Eshana does not sell an AI platform or implementation product through this assessment, so there is no incentive to force a &ldquo;yes.&rdquo;</p>
            </div>
            <div className="border-t border-line pt-6">
              <h3 className="text-2xl font-semibold text-ink">Small-team attention</h3>
              <p className="mt-4 text-lg leading-8 text-muted">Clients work directly with experienced practitioners, not through layers of account management.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-line bg-paper">
        <div className="container-grid">
          <SectionIntro title="Have an AI idea list already?">
            <p>Send us the rough list. It does not need to be polished.</p>
            <p>We&apos;ll come back with:</p>
            <ul className="space-y-2">
              <li>a proposed workshop approach</li>
              <li>the three questions we would ask first</li>
              <li>what information would be useful before the session</li>
            </ul>
          </SectionIntro>
          <div className="mt-9">
            <ButtonLink href={gateContactPath}>Start with your idea list</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
