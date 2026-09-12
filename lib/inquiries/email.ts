import "server-only";
import type { StoredInquiry } from "./submit";

export function notificationMessage(inquiry: StoredInquiry) {
  return {
    subject: `New Eshana Inquiry — ${inquiry.service}`,
    reply_to: inquiry.email,
    text: [
      `Name: ${inquiry.name}`, `Email: ${inquiry.email}`,
      `Company: ${inquiry.company || "Not provided"}`,
      `Product URL: ${inquiry.product_url || "Not provided"}`,
      `Selected service: ${inquiry.service}`, `Timeline: ${inquiry.timeline}`,
      `Inquiry type: ${inquiry.inquiry_type}`, `Submission time: ${inquiry.created_at}`,
      `Inquiry ID: ${inquiry.id}`, "", "Message:", inquiry.message,
    ].join("\n"),
  };
}

export async function sendInquiryNotification(inquiry: StoredInquiry): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Notification provider is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `inquiry-notification/${inquiry.id}` },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL || "Eshana Software Solutions <website@eshanasolutions.com>",
      to: [process.env.INQUIRY_TO_EMAIL || "inquiries@eshanasolutions.com"],
      ...notificationMessage(inquiry),
    }),
    signal: AbortSignal.timeout(8000), cache: "no-store",
  });
  if (!response.ok) throw new Error("Notification provider rejected request");
  const result = await response.json();
  if (typeof result.id !== "string") throw new Error("Notification was not confirmed");
}
