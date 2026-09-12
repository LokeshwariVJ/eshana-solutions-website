import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PageHero, TagList } from "@/components/ui";
import { selectedWork, siteConfig } from "@/lib/site";

const work = selectedWork[0];
const socialTitle = "TriageZero | Eshana Software Solutions";
const socialDescription = "AI-assisted regression failure investigation and release-risk analysis.";
const socialImage = { url: work.image, width: work.imageWidth, height: work.imageHeight, alt: work.imageAlt };

export const metadata: Metadata = {
  title: "TriageZero",
  description:
    "AI-assisted regression failure investigation using Playwright, Gemini, Google ADK, and Google Cloud.",
  alternates: { canonical: "/work/triagezero" },
  openGraph: {
    type: "website", title: socialTitle, description: socialDescription,
    url: `${siteConfig.url}${work.href}`, siteName: siteConfig.name, images: [socialImage],
  },
  twitter: { card: "summary_large_image", title: socialTitle, description: socialDescription, images: [socialImage] },
};

export default function TriageZeroPage() {
  return (
    <>
      <PageHero eyebrow="Selected Work" title="TriageZero">
        <p>AI-assisted regression failure investigation.</p>
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
