import { contactLimits, contactServices, contactTimelines, type ContactField, type ContactFormState, type ContactValues } from "../contact";

export type Inquiry = {
  inquiry_type: "general" | "quality_audit" | "ai_initiative_gate";
  name: string;
  email: string;
  company: string | null;
  product_url: string | null;
  service: string;
  timeline: string;
  message: string;
};

export function inquiryType(service: string): Inquiry["inquiry_type"] {
  if (service === "Quality Audit") return "quality_audit";
  if (service === "AI Initiative Gate") return "ai_initiative_gate";
  return "general";
}

export function validateInquiry(form: FormData):
  | { valid: true; inquiry: Inquiry }
  | { valid: false; errors: ContactFormState["errors"] } {
  const errors: NonNullable<ContactFormState["errors"]> = {};
  const values = {} as ContactValues;
  for (const field of Object.keys(contactLimits) as ContactField[]) {
    const entries = form.getAll(field);
    const entry = entries[0] ?? "";
    values[field] = typeof entry === "string" ? entry.trim() : "";
    if (entries.length > 1 || typeof entry !== "string") {
      errors[field] = "Please enter a single text value.";
    } else if (entry.length > contactLimits[field]) {
      errors[field] = `Please use ${contactLimits[field]} characters or fewer.`;
    } else if (/\p{Cc}/u.test(field === "description" ? entry.replace(/[\r\n\t]/g, "") : entry)) {
      errors[field] = "Please remove unsupported characters.";
    }
  }
  if (values.name.length < 2) errors.name = "Please enter your name.";
  const [localPart, domain] = values.email.split("@");
  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(values.email)
      || localPart.length > 64 || localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..")
      || domain?.split(".").some((label) => label.length > 63)) {
    errors.email = "Please enter a valid work email.";
  }
  if (!values.description) errors.description = "Please tell us what you are building.";
  if (!contactServices.some((option) => option.label === values.service)) errors.service = "Please choose a service area.";
  if (!contactTimelines.includes(values.timeline)) errors.timeline = "Please choose a timeline.";
  if (values.productUrl) {
    try {
      const url = new URL(values.productUrl);
      if (!/^https?:\/\//i.test(values.productUrl) || !["https:", "http:"].includes(url.protocol) || url.username || url.password || !url.hostname.includes(".") || /\s/.test(values.productUrl)) throw new Error("Invalid URL");
    } catch {
      errors.productUrl = "Please enter a full website URL starting with http:// or https://.";
    }
  }
  if (Object.keys(errors).length) return { valid: false, errors };
  return { valid: true, inquiry: {
    inquiry_type: inquiryType(values.service), name: values.name, email: values.email.toLowerCase(),
    company: values.company || null, product_url: values.productUrl || null,
    service: values.service, timeline: values.timeline, message: values.description,
  } };
}
