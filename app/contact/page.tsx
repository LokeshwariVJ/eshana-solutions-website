import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ContactForm } from "./contact-form";
import { contactServices } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Eshana Software Solutions what you are building and start a conversation about quality engineering, automation, API testing, or QA strategy.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { service } = await searchParams;
  const defaultService = contactServices.find((option) => option.slug === service)?.label;
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're building.">
        <p>
          Share the product, workflow, or release question on your mind.
        </p>
      </PageHero>
      <section className="section-pad">
        <div className="container-grid max-w-4xl">
          <ContactForm key={defaultService ?? "none"} defaultService={defaultService} />
        </div>
      </section>
    </>
  );
}
