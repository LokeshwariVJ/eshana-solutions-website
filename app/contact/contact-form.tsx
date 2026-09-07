"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

const serviceOptions = [
  "Quality Audit",
  "Test Automation",
  "API Testing",
  "AI Quality",
  "QA Strategy",
  "Process Automation",
  "Something else",
];

const timelineOptions = [
  "As soon as possible",
  "Within 2 weeks",
  "This month",
  "Exploring options",
];

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-[#8a2f25]">{message}</p>;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError message={state.errors?.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError message={state.errors?.email} />
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
            required
            autoComplete="organization"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError message={state.errors?.company} />
        </div>
        <div>
          <label htmlFor="productUrl" className="text-sm font-medium text-ink">
            Website/Product URL optional
          </label>
          <input
            id="productUrl"
            name="productUrl"
            type="url"
            autoComplete="url"
            className="mt-2 min-h-12 w-full border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
          />
          <FieldError message={state.errors?.productUrl} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-ink">
          What are you building?
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          className="mt-2 w-full border border-line bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:ring-2 focus:ring-teal-soft"
        />
        <FieldError message={state.errors?.description} />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          What would you like help with?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option}
              className="flex min-h-12 items-center gap-3 border border-line bg-surface px-4 text-base text-muted focus-within:border-teal focus-within:ring-2 focus-within:ring-teal-soft"
            >
              <input
                type="radio"
                name="service"
                value={option}
                required
                className="size-4 accent-teal"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError message={state.errors?.service} />
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink">Timeline</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {timelineOptions.map((option) => (
            <label
              key={option}
              className="flex min-h-12 items-center gap-3 border border-line bg-surface px-4 text-base text-muted focus-within:border-teal focus-within:ring-2 focus-within:ring-teal-soft"
            >
              <input
                type="radio"
                name="timeline"
                value={option}
                required
                className="size-4 accent-teal"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError message={state.errors?.timeline} />
      </fieldset>

      {state.message ? (
        <p
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
        {pending ? "Checking details..." : "Start a conversation"}
      </button>
    </form>
  );
}
