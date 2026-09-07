import type { Metadata } from "next";
import { PageHero, WorkPreview } from "@/components/ui";
import { selectedWork } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected Eshana Software Solutions work across regression investigation and QA/QC workflow digitization.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected work shaped around real quality problems.">
        <p>
          A first look at the kinds of focused engineering systems Eshana builds:
          faster failure investigation, clearer QA workflows, and practical
          release confidence.
        </p>
      </PageHero>
      <section className="section-pad">
        <div className="container-grid grid gap-6 md:grid-cols-2">
          {selectedWork.map((work) => (
            <WorkPreview key={work.slug} {...work} />
          ))}
        </div>
      </section>
    </>
  );
}
