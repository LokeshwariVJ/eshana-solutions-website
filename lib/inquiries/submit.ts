import "server-only";
import { contactLimits, inquiryFailure, inquirySuccess, type ContactFormState } from "../contact";
import { validateInquiry, type Inquiry } from "./validation";

export type StoredInquiry = Inquiry & { id: string; created_at: string };
export type InquiryDependencies = {
  allow: (email: string) => Promise<boolean>;
  insert: (inquiry: Inquiry) => Promise<StoredInquiry>;
  notify: (inquiry: StoredInquiry) => Promise<void>;
  log: (event: string, inquiryId?: string) => void;
};

export async function receiveInquiry(form: FormData, deps: InquiryDependencies): Promise<ContactFormState> {
  if (!(form instanceof FormData)) return { status: "error", message: inquiryFailure };
  let fields = 0;
  for (const [key, value] of form.entries()) {
    fields++;
    // React may include its own action metadata for progressive form submissions.
    if (fields > 20 || typeof value !== "string" ||
        (!Object.hasOwn(contactLimits, key) && key !== "website_confirm" && !key.startsWith("$ACTION_"))) {
      return { status: "error", message: inquiryFailure };
    }
  }
  const trap = form.getAll("website_confirm");
  if (trap.length > 1 || trap.some((value) => typeof value !== "string" || value !== "")) {
    return { status: "error", message: inquiryFailure };
  }
  const result = validateInquiry(form);
  if (!result.valid) return { status: "error", message: "Please fix the highlighted fields.", errors: result.errors };
  let stored: StoredInquiry;
  try {
    if (!await deps.allow(result.inquiry.email)) return { status: "error", message: "Too many requests. Please try again in 15 minutes." };
    stored = await deps.insert(result.inquiry);
  } catch {
    deps.log("inquiry_storage_failed");
    return { status: "error", message: inquiryFailure };
  }
  // A notification outage must not turn an already saved inquiry into a failed submission.
  try { await deps.notify(stored); }
  catch { deps.log("inquiry_notification_failed", stored.id); }
  return { status: "success", message: inquirySuccess };
}
