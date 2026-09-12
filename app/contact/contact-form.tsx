"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react";
import { contactLimits, contactServices, contactTimelines, inquiryFailure, type ContactField, type ContactFormState, type ContactValues } from "@/lib/contact";
import { submitContactForm } from "./actions";

const initialState: ContactFormState = { status: "idle" };

function FieldError({ field, message }: { field: ContactField; message?: string }) {
  if (!message) {
    return null;
  }

  return <p id={`${field}-error`} className="mt-2 text-sm font-medium text-[#8a2f25]">{message}</p>;
}

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [attempt, setAttempt] = useState(0);

  return (
    <InquiryForm
      key={attempt}
      defaultService={defaultService}
      focusOnMount={attempt > 0}
      onStartAgain={() => setAttempt((current) => current + 1)}
    />
  );
}

function InquirySuccess({ onStartAgain }: { onStartAgain: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus(); }, []);

  return (
    <section aria-labelledby="inquiry-success" className="border-t border-line py-8">
      <h2 ref={headingRef} id="inquiry-success" tabIndex={-1} className="text-2xl font-semibold text-ink outline-none sm:text-3xl">
        Thanks — we received your inquiry.
      </h2>
      <p className="mt-4 text-base leading-7 text-muted">
        We’ll review the details and get back to you shortly.
      </p>
      <button type="button" onClick={onStartAgain} className="mt-8 inline-flex min-h-12 items-center justify-center border border-line px-5 py-3 text-sm font-medium text-ink transition hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
        Send another inquiry
      </button>
    </section>
  );
}

function InquiryForm({ defaultService, focusOnMount, onStartAgain }: {
  defaultService?: string;
  focusOnMount: boolean;
  onStartAgain: () => void;
}) {
  const [values, setValues] = useState<ContactValues>({
    name: "", email: "", company: "", productUrl: "", description: "",
    service: defaultService ?? "", timeline: "",
  });
  const [state, formAction, pending] = useActionState(
    async (previous: ContactFormState, data: FormData): Promise<ContactFormState> => {
      try {
        const result = await submitContactForm(previous, data);
        if (result.status === "success") {
          setValues({ name: "", email: "", company: "", productUrl: "", description: "", service: "", timeline: "" });
        }
        return result;
      }
      catch { return { status: "error", message: inquiryFailure }; }
    },
    initialState,
  );
  const resultRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (focusOnMount) nameRef.current?.focus(); }, [focusOnMount]);
  useEffect(() => { if (state.message) resultRef.current?.focus(); }, [state]);
  const fieldProps = (field: ContactField) => ({
    value: values[field],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((current) => ({ ...current, [field]: event.target.value })),
    maxLength: contactLimits[field],
    "aria-invalid": Boolean(state.errors?.[field]),
    "aria-describedby": state.errors?.[field] ? `${field}-error` : undefined,
  });

  if (state.status === "success") {
    return <InquirySuccess onStartAgain={onStartAgain} />;
  }

  return (
    <form
      action={formAction}
      className="space-y-6"
      aria-busy={pending}
      // React resets action forms even when the returned result contains validation errors.
      onReset={(event) => event.preventDefault()}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_confirm">Leave this field empty</label>
        <input id="website_confirm" name="website_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            ref={nameRef}
            name="name"
            {...fieldProps("name")}
            minLength={2}
            required
            autoComplete="name"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError field="name" message={state.errors?.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            name="email"
            {...fieldProps("email")}
            type="email"
            required
            autoComplete="email"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError field="email" message={state.errors?.email} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="text-sm font-medium text-ink">
            Company
          </label>
          <input
            id="company"
            name="company"
            {...fieldProps("company")}
            autoComplete="organization"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError field="company" message={state.errors?.company} />
        </div>
        <div>
          <label htmlFor="productUrl" className="text-sm font-medium text-ink">
            Website/Product URL optional
          </label>
          <input
            id="productUrl"
            name="productUrl"
            {...fieldProps("productUrl")}
            type="url"
            autoComplete="url"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError field="productUrl" message={state.errors?.productUrl} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-ink">
          What are you building?
        </label>
        <textarea
          id="description"
          name="description"
          {...fieldProps("description")}
          required
          rows={6}
          className="mt-2 w-full border border-line bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
        />
        <FieldError field="description" message={state.errors?.description} />
      </div>

      <fieldset aria-describedby={state.errors?.service ? "service-error" : undefined} aria-invalid={Boolean(state.errors?.service)}>
        <legend className="text-sm font-medium text-ink">
          What would you like help with?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {contactServices.map(({ label: option }) => (
            <label
              key={option}
              className="flex min-h-12 items-center gap-3 border border-line bg-surface px-4 text-base text-muted focus-within:border-teal focus-within:ring-2 focus-within:ring-teal-soft"
            >
              <input
                type="radio"
                name="service"
                value={option}
                checked={values.service === option}
                onChange={() => setValues((current) => ({ ...current, service: option }))}
                required
                className="size-4 accent-teal"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError field="service" message={state.errors?.service} />
      </fieldset>

      <fieldset aria-describedby={state.errors?.timeline ? "timeline-error" : undefined} aria-invalid={Boolean(state.errors?.timeline)}>
        <legend className="text-sm font-medium text-ink">Timeline</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {contactTimelines.map((option) => (
            <label
              key={option}
              className="flex min-h-12 items-center gap-3 border border-line bg-surface px-4 text-base text-muted focus-within:border-teal focus-within:ring-2 focus-within:ring-teal-soft"
            >
              <input
                type="radio"
                name="timeline"
                value={option}
                checked={values.timeline === option}
                onChange={() => setValues((current) => ({ ...current, timeline: option }))}
                required
                className="size-4 accent-teal"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError field="timeline" message={state.errors?.timeline} />
      </fieldset>

      {state.message ? (
        <p
          ref={resultRef}
          tabIndex={-1}
          className="border border-line bg-paper p-4 text-base leading-7 text-muted"
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center border border-charcoal bg-charcoal px-5 py-3 text-sm font-medium text-ivory transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:hover:translate-y-0"
      >
        {pending ? "Sending your inquiry..." : "Start a conversation"}
      </button>
    </form>
  );
}
