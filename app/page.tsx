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

export default function Home() {
  return (
    <>
      <section className="section-pad border-b border-line">
        <div className="container-grid">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal">
                Eshana Software Solutions LLC
              </p>
              <h1 className="text-balance text-6xl font-semibold leading-[0.9] text-ink md:text-8xl">
                Build fast.
                <br />
                Ship with confidence.
              </h1>
              <div className="mt-8 max-w-3xl space-y-5 text-pretty text-lg leading-8 text-muted md:text-xl md:leading-9">
                <p>
                  Quality engineering, test automation, and practical software
                  solutions for teams building modern applications.
                </p>
                <p>
                  From startup MVPs to complex enterprise platforms, Eshana
                  helps teams find risk earlier, automate what matters, and
                  release software with greater confidence.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/quality-audit">Get a Quality Audit</ButtonLink>
                <ButtonLink href="/work" variant="secondary">
                  Explore our work
                </ButtonLink>
              </div>
            </div>
            <p className="border-l border-line pl-6 text-base leading-8 text-muted lg:mb-3">
              Software quality experience across payments, banking,
              e-commerce, APIs, data platforms, SaaS, and AI-assisted
              development.
            </p>
          </div>
        </div>
      </section>

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
