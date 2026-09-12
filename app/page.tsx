import {
  auditIncludes,
  primaryServices,
  secondaryCapabilities,
  selectedWork,
} from "@/lib/site";
import {
  ButtonLink,
  CheckList,
  SectionIntro,
  WorkPreview,
} from "@/components/ui";
import { gatePath } from "@/lib/ai-initiative-gate";

export default function Home() {
  return (
    <>
      <section className="border-b border-line py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10 xl:gap-12 xl:px-12">
          <HeroCopy />
          <CompactReleaseJourney />
        </div>
      </section>

      <ImpactStrip />

      <section className="section-pad border-b border-line bg-surface">
        <div className="container-grid grid gap-12 lg:grid-cols-[0.8fr_1fr]">
          <SectionIntro title="Software is being built faster than ever. Quality still takes judgment." />
          <div className="space-y-6 text-lg leading-8 text-muted">
            <p>
              Modern teams can prototype, refactor, and generate code at a pace
              that would have seemed impossible a few years ago. That speed is
              valuable, but it also compresses the time teams have to ask hard
              questions about risk.
            </p>
            <p>
              AI-assisted coding makes independent quality thinking more
              important, not less. Someone still has to look past the happy path
              and ask: What happens when this API fails? What happens when
              authentication behaves differently across devices? What happens on
              the second attempt? Which failures should actually stop a release?
            </p>
            <p className="text-xl font-semibold text-ink">
              That&apos;s where Eshana comes in.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line">
        <div className="container-grid">
          <SectionIntro
            eyebrow="Services"
            title="Quality support built around how your product actually works."
          />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {primaryServices.map((service) => (
              <article key={service.title} className="bg-ivory p-7">
                <h3 className="text-2xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-3">
            {secondaryCapabilities.map((capability) => (
              <li
                key={capability}
                className="border border-line bg-surface px-4 py-2 text-sm font-medium text-muted"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-grid grid gap-8 lg:grid-cols-[0.65fr_1fr] lg:gap-12">
          <div>
            <p className="mb-4 text-sm font-medium uppercase text-teal">AI Initiative Gate</p>
            <h2 className="text-3xl font-semibold text-ink">Before you fund the next AI idea, test the business case.</h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-muted">
            <p>Eshana evaluates feasibility, infrastructure readiness, ownership, risk, ROI, and pilot success criteria before money moves.</p>
            <p className="font-medium text-ink">Workshop — $1,500 fixed</p>
            <p className="text-sm">Workshop fee credited toward a Full Gate Assessment if you proceed within 30 days.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href={gatePath}>Explore the AI Initiative Gate</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line bg-paper">
        <div className="container-grid grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <SectionIntro
              eyebrow="Featured"
              title="The Eshana Quality Audit"
            >
              <p>An independent second set of eyes before you ship.</p>
            </SectionIntro>
            <p className="mt-8 text-4xl font-semibold text-ink">
              Starting at $299
            </p>
            <div className="mt-8">
              <ButtonLink href="/quality-audit">Request a Quality Audit</ButtonLink>
            </div>
          </div>
          <div className="border border-line bg-surface p-7">
            <CheckList items={auditIncludes} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line">
        <div className="container-grid">
          <SectionIntro
            eyebrow="Selected Work"
            title="Focused software quality work with modern engineering teams."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {selectedWork.map((work) => (
              <WorkPreview key={work.slug} {...work} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-line bg-surface">
        <div className="container-grid">
          <SectionIntro title="Engineering discipline without enterprise consulting overhead." />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              "Independent thinking",
              "Practical automation",
              "Human judgment",
            ].map((principle) => (
              <article key={principle} className="bg-surface p-7">
                <h3 className="text-2xl font-semibold text-ink">
                  {principle}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-grid">
          <div className="max-w-3xl">
            <h2 className="text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Not sure whether your product is ready to ship?
            </h2>
            <p className="mt-6 text-xl leading-8 text-muted">
              We&apos;ll take an independent look.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/quality-audit">
                Start with a Quality Audit
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Tell us what you&apos;re building
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroCopy() {
  return (
    <div className="w-full min-w-0 max-w-[40rem]">
      <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal">
        Software quality. Real impact.
      </p>
      <h1 className="max-w-[14.5ch] text-balance text-5xl font-black leading-[0.92] text-ink md:text-6xl lg:max-w-none lg:text-[3.1rem] xl:text-[3.25rem] 2xl:text-[3.5rem]">
        Build fast.
        <br />
        Ship with confidence.
      </h1>
      <div className="mt-8 max-w-2xl space-y-5 text-pretty text-lg leading-8 text-muted md:text-xl md:leading-9">
        <p>
          Quality engineering, test automation, and practical software solutions
          for teams building modern applications.
        </p>
        <p>
          From startup MVPs to complex enterprise platforms, Eshana helps teams
          find risk earlier, automate what matters, and release software with
          greater confidence.
        </p>
      </div>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/quality-audit">Get a Quality Audit</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Explore our work
        </ButtonLink>
      </div>
    </div>
  );
}

function CompactReleaseJourney() {
  return (
    <aside
      aria-labelledby="release-journey-title"
      className="w-full min-w-0 max-w-full self-center lg:border-l lg:border-line lg:pl-10 xl:pl-12"
    >
      <div className="w-full max-w-[760px]">
        <h2
          id="release-journey-title"
          className="max-w-[18rem] text-xs font-semibold uppercase leading-5 tracking-[0.24em] text-teal"
        >
          A more confident release journey
        </h2>
        <div className="mt-4 h-px w-16 bg-teal" aria-hidden="true" />

        <div className="relative mt-9">
          <div
            className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] border-t border-dotted border-teal/45 md:block"
            aria-hidden="true"
          />
          <ol className="grid gap-5 md:grid-cols-5 md:gap-0">
            {journeyStages.map((stage, index) => (
              <CompactJourneyStage
                key={stage.name}
                {...stage}
                isLast={index === journeyStages.length - 1}
              />
            ))}
          </ol>
        </div>

        <FeedbackLoop />

        <OutcomeStrip />
      </div>
    </aside>
  );
}

const journeyStages = [
  {
    icon: "file",
    name: "Plan",
    supporting: ["Understand needs", "and risks"],
  },
  {
    icon: "code",
    name: "Build",
    supporting: ["Quality from", "the start"],
  },
  {
    icon: "search",
    name: "Test",
    supporting: ["Validate UI,", "APIs & data"],
  },
  {
    icon: "bars",
    name: "Assess",
    supporting: ["Identify release", "risk"],
  },
  {
    icon: "rocket",
    name: "Release",
    supporting: ["Ship with", "confidence"],
  },
] as const;

function CompactJourneyStage({
  icon,
  name,
  supporting,
  isLast,
}: {
  icon: IconName;
  name: string;
  supporting: readonly string[];
  isLast: boolean;
}) {
  return (
    <li
      data-journey-stage
      className="relative grid grid-cols-[2.75rem_1fr] gap-4 md:block md:min-w-0 md:px-1.5 md:text-center"
    >
      <div className="relative z-10 flex md:mb-4 md:justify-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-line bg-ivory text-teal md:h-12 md:w-12">
          <LineIcon name={icon} className="h-5 w-5" />
        </div>
        {!isLast ? (
          <>
            <div
              className="absolute left-[1.35rem] top-11 h-[calc(100%+1.25rem)] border-l border-dotted border-teal/45 md:hidden"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 12 12"
              className="absolute right-[-0.2rem] top-[1.14rem] hidden h-3 w-3 text-teal/60 md:block"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4 2l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.4"
              />
            </svg>
          </>
        ) : null}
      </div>
      <div className="pb-6 md:pb-0">
        <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink md:text-[0.76rem] xl:text-[0.82rem]">
          {name}
        </h3>
        <p className="mt-2 text-[0.82rem] leading-5 text-muted md:text-[0.76rem] xl:text-[0.82rem]">
          {supporting.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

function FeedbackLoop() {
  return (
    <div className="mt-1 md:mt-9">
      <div className="hidden md:block" aria-hidden="true">
        <div className="mx-auto h-10 w-[80%] rounded-b-[2rem] border-x border-b border-dotted border-teal/45" />
      </div>
      <p className="mt-3 text-center text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.22em] text-teal">
        Continuous feedback. Better software.
      </p>
    </div>
  );
}

function OutcomeStrip() {
  return (
    <div className="mt-7 border-t border-line pt-5">
      <ul className="grid gap-px bg-line sm:grid-cols-3">
        {outcomes.map((outcome) => (
          <li
            key={outcome[0]}
            className="bg-ivory px-3 py-3 text-center text-[0.82rem] font-medium leading-5 text-ink"
          >
            <span className="block">{outcome[0]}</span>
            <span className="block">{outcome[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const outcomes = [
  ["Higher quality", "software"],
  ["Faster,", "safer releases"],
  ["Happier teams", "and users"],
] as const;

const impactItems = [
  { icon: "target", strong: "Reduce", rest: "production issues" },
  { icon: "bolt", strong: "Accelerate", rest: "release cycles" },
  { icon: "team", strong: "Improve", rest: "team productivity" },
  { icon: "shield", strong: "Build", rest: "customer trust" },
  { icon: "bars", strong: "Deliver", rest: "better software" },
] as const;

function ImpactStrip() {
  return (
    <section aria-label="Quality impact" className="border-b border-line">
      <div className="container-grid">
        <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {impactItems.map((item, index) => (
            <ImpactItem key={item.rest} {...item} isFirst={index === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ImpactItem({
  icon,
  strong,
  rest,
  isFirst,
}: {
  icon: IconName;
  strong: string;
  rest: string;
  isFirst: boolean;
}) {
  return (
    <li
      className={`flex items-start gap-4 py-7 text-base leading-6 text-muted lg:px-6 ${
        isFirst ? "" : "border-t border-line sm:border-l sm:border-t-0"
      }`}
    >
      <LineIcon name={icon} className="mt-1 text-teal" />
      <p>
        <span className="block font-semibold text-ink">{strong}</span>
        {rest}
      </p>
    </li>
  );
}

type IconName =
  | "bars"
  | "bolt"
  | "code"
  | "file"
  | "rocket"
  | "search"
  | "shield"
  | "target"
  | "team";

function LineIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.6,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-6 w-6 shrink-0 ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {name === "file" ? (
        <>
          <path {...common} d="M7 3h7l4 4v14H7V3Z" />
          <path {...common} d="M14 3v5h4" />
          <path {...common} d="M10 12h5M10 16h4" />
        </>
      ) : null}
      {name === "code" ? (
        <>
          <path {...common} d="m9 8-4 4 4 4" />
          <path {...common} d="m15 8 4 4-4 4" />
          <path {...common} d="m13 6-2 12" />
        </>
      ) : null}
      {name === "search" ? (
        <>
          <circle {...common} cx="11" cy="11" r="6" />
          <path {...common} d="m16 16 4 4" />
          <path {...common} d="m8.5 11 1.8 1.8 3.4-4" />
        </>
      ) : null}
      {name === "shield" ? (
        <>
          <path
            {...common}
            d="M12 3 19 6v5c0 4.6-2.8 7.8-7 10-4.2-2.2-7-5.4-7-10V6l7-3Z"
          />
          <path {...common} d="m9 12 2 2 4-5" />
        </>
      ) : null}
      {name === "bars" ? (
        <>
          <path {...common} d="M5 19V11" />
          <path {...common} d="M12 19V5" />
          <path {...common} d="M19 19v-7" />
          <path {...common} d="M4 19h16" />
        </>
      ) : null}
      {name === "rocket" ? (
        <>
          <path
            {...common}
            d="M13 4c3.5.2 6.3 3 6.5 6.5L14 16l-6-6 5-6Z"
          />
          <path {...common} d="M8 10 5 11l-2 4 4-2" />
          <path {...common} d="M14 16l-1 3-4 2 2-4" />
          <circle {...common} cx="14.5" cy="8.5" r="1.5" />
        </>
      ) : null}
      {name === "team" ? (
        <>
          <path {...common} d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path {...common} d="M3.5 20a5 5 0 0 1 10 0" />
          <path {...common} d="M16.5 11.5a2.5 2.5 0 1 0 0-5" />
          <path {...common} d="M15.5 15.5A4.5 4.5 0 0 1 20.5 20" />
        </>
      ) : null}
      {name === "target" ? (
        <>
          <circle {...common} cx="12" cy="12" r="8" />
          <circle {...common} cx="12" cy="12" r="3" />
          <path {...common} d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
        </>
      ) : null}
      {name === "bolt" ? (
        <path {...common} d="M13 2 5 14h6l-1 8 9-13h-6l1-7Z" />
      ) : null}
    </svg>
  );
}
