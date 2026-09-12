"use server";

import { headers } from "next/headers";
import { inquiryFailure, type ContactFormState } from "@/lib/contact";
import { receiveInquiry } from "@/lib/inquiries/submit";
import { insertInquiry } from "@/lib/inquiries/storage";
import { sendInquiryNotification } from "@/lib/inquiries/email";
import { allowInquiry, requestAddress } from "@/lib/inquiries/rate-limit";

export async function submitContactForm(_previous: ContactFormState, form: FormData): Promise<ContactFormState> {
  try {
    const address = requestAddress(await headers());
    return await receiveInquiry(form, {
      allow: (email) => allowInquiry(address, email),
      insert: insertInquiry,
      notify: sendInquiryNotification,
      log: (event, inquiryId) => console.error(JSON.stringify({ event, inquiryId })),
    });
  } catch {
    console.error(JSON.stringify({ event: "inquiry_request_failed" }));
    return { status: "error", message: inquiryFailure };
  }
}
