import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PageHero, TagList } from "@/components/ui";
import { selectedWork, siteConfig } from "@/lib/site";

const work = selectedWork[1];
const socialTitle = "AEC Quality Workflow | Eshana Software Solutions";
const socialDescription = "A digital QA/QC workflow for architecture and engineering project reviews.";
const socialImage = { url: work.image, width: work.imageWidth, height: work.imageHeight, alt: work.imageAlt };

export const metadata: Metadata = {
  title: "AEC Quality Workflow",
  description:
    "A digital engineering QA/QC review workflow built with Next.js, Supabase, Playwright, and Vercel.",
  alternates: { canonical: "/work/aec-quality-workflow" },
  openGraph: {
    type: "website", title: socialTitle, description: socialDescription,
    url: `${siteConfig.url}${work.href}`, siteName: siteConfig.name, images: [socialImage],
  },
  twitter: { card: "summary_large_image", title: socialTitle, description: socialDescription, images: [socialImage] },
};

export default function AecQualityWorkflowPage() {
  return (
    <>
      <PageHero eyebrow="Selected Work" title="AEC Quality Workflow">
        <p>Digitizing an engineering QA/QC review process.</p>
      </PageHero>
      <section className="section-pad">
        <div className="container-grid space-y-10">
          <div className="rounded-[2px] border border-line bg-paper p-3 md:p-4">
            <Image
              src={work.image}
              alt={work.imageAlt}
              width={work.imageWidth}
              height={work.imageHeight}
              priority
              sizes="(min-width: 1180px) 1180px, calc(100vw - 2rem)"
              className="h-auto w-full rounded-[2px] border border-line bg-ivory"
            />
          </div>
          <div className="max-w-3xl space-y-7">
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
