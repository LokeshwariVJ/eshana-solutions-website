import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Eshana Software Solutions what you are building and start a conversation about quality engineering, automation, API testing, or QA strategy.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're building.">
        <p>
          Share the product, workflow, or release question on your mind. The
          form validates your details now; database submission will be connected
          when Supabase is added.
        </p>
      </PageHero>
      <section className="section-pad">
        <div className="container-grid max-w-4xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
