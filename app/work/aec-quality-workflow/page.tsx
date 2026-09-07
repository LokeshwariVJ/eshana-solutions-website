import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PageHero, TagList } from "@/components/ui";
import { selectedWork } from "@/lib/site";

const work = selectedWork[1];

export const metadata: Metadata = {
  title: "AEC Quality Workflow",
  description:
    "A digital engineering QA/QC review workflow built with Next.js, Supabase, Playwright, and Vercel.",
  alternates: { canonical: "/work/aec-quality-workflow" },
};

export default function AecQualityWorkflowPage() {
  return (
    <>
      <PageHero eyebrow="Selected Work" title="AEC Quality Workflow">
        <p>Digitizing an engineering QA/QC review process.</p>
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
                This workflow turns an engineering QA/QC review process into a
                clearer digital system with structured reviews, traceable
                checks, and workflow visibility across teams.
              </p>
              <p>
                The emphasis is on reducing process friction while preserving
                the judgment and accountability that quality review requires.
              </p>
            </div>
            <ButtonLink href="/contact">Discuss process automation</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
