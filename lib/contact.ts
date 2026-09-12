export const contactServices = [
  { slug: "quality-audit", label: "Quality Audit" },
  { slug: "test-automation", label: "Test Automation" },
  { slug: "api-testing", label: "API Testing" },
  { slug: "ai-quality", label: "AI Quality" },
  { slug: "ai-initiative-gate", label: "AI Initiative Gate" },
  { slug: "qa-strategy", label: "QA Strategy" },
  { slug: "process-automation", label: "Process Automation" },
  { slug: "something-else", label: "Something else" },
];

export const contactTimelines = ["As soon as possible", "Within 2 weeks", "This month", "Exploring options"];
export const contactLimits = {
  name: 120, email: 254, company: 200, productUrl: 2048,
  description: 5000, service: 80, timeline: 80,
} as const;
export type ContactField = keyof typeof contactLimits;
export type ContactValues = Record<ContactField, string>;
export type ContactFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
};
export const inquiryFailure = "We couldn't submit your inquiry right now. Please try again in a moment.";
export const inquirySuccess = "Thanks — your inquiry has been received. We'll review the details and get back to you shortly.";
