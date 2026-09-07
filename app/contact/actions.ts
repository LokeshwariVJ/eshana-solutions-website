"use server";

export type ContactFormState = {
  status: "idle" | "error" | "not_configured";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
};

type ContactField =
  | "name"
  | "email"
  | "company"
  | "productUrl"
  | "description"
  | "service"
  | "timeline";

const serviceOptions = new Set([
  "Quality Audit",
  "Test Automation",
  "API Testing",
  "AI Quality",
  "QA Strategy",
  "Process Automation",
  "Something else",
]);

const timelineOptions = new Set([
  "As soon as possible",
  "Within 2 weeks",
  "This month",
  "Exploring options",
]);

function value(formData: FormData, key: ContactField) {
  const field = formData.get(key);
  return typeof field === "string" ? field.trim() : "";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const errors: ContactFormState["errors"] = {};
  const name = value(formData, "name");
  const email = value(formData, "email");
  const company = value(formData, "company");
  const productUrl = value(formData, "productUrl");
  const description = value(formData, "description");
  const service = value(formData, "service");
  const timeline = value(formData, "timeline");

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid work email.";
  }

  if (company.length < 2) {
    errors.company = "Please enter your company name.";
  }

  if (productUrl && !/^https?:\/\/.+\..+/.test(productUrl)) {
    errors.productUrl = "Please enter a full URL starting with http or https.";
  }

  if (description.length < 20) {
    errors.description = "Please share a little more about what you are building.";
  }

  if (!serviceOptions.has(service)) {
    errors.service = "Please choose a service area.";
  }

  if (!timelineOptions.has(timeline)) {
    errors.timeline = "Please choose a timeline.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  return {
    status: "not_configured",
    message:
      "The form is validated, but submission storage is not connected yet. Supabase integration will be wired in the next step.",
  };
}
