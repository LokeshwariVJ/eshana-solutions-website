import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PageHero, TagList } from "@/components/ui";
import { selectedWork } from "@/lib/site";

const work = selectedWork[0];

export const metadata: Metadata = {
  title: "TriageZero",
  description:
    "AI-assisted regression failure investigation using Playwright, Gemini, Google ADK, and Google Cloud.",
  alternates: { canonical: "/work/triagezero" },
};

export default function TriageZeroPage() {
  return (
    <>
      <PageHero eyebrow="Selected Work" title="TriageZero">
        <p>AI-assisted regression failure investigation.</p>
      </PageHero>
      <section className="section-pad">
        <div className="container-grid grid gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div className="border border-line bg-paper p-4">
            <Image
              src={work.image}
              alt=""
              width={900}
              height={520}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="space-y-7">
            <TagList tags={work.tags} />
            <div className="space-y-5 text-lg leading-8 text-muted">
              <p>
                TriageZero explores how regression failures can be investigated
                faster without handing release judgment to automation. The
                system focuses on collecting useful signals, explaining likely
                failure causes, and helping engineers decide what needs human
                review.
              </p>
              <p>
                The work combines browser automation, structured failure
                context, and AI-assisted analysis so teams can spend less time
                decoding noisy test output and more time understanding product
                risk.
              </p>
            </div>
            <ButtonLink href="/contact">Talk about regression quality</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
