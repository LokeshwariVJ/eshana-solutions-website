import assert from "node:assert/strict";
import { test } from "node:test";
import { contactLimits, inquiryFailure, inquirySuccess } from "../lib/contact";
import { validateInquiry } from "../lib/inquiries/validation";
import { receiveInquiry, type InquiryDependencies, type StoredInquiry } from "../lib/inquiries/submit";
import { notificationMessage, sendInquiryNotification } from "../lib/inquiries/email";
import { insertInquiry } from "../lib/inquiries/storage";
import { allowInquiry, requestAddress } from "../lib/inquiries/rate-limit";

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: "Alex Example", email: "alex@example.com", company: "Example Team",
    productUrl: "", description: "We would like an independent review before release.",
    service: "Test Automation", timeline: "This month", website_confirm: "", ...overrides,
  })) data.set(key, value);
  return data;
}

function harness(overrides: Partial<InquiryDependencies> = {}) {
  const rows: StoredInquiry[] = [];
  const notifications: StoredInquiry[] = [];
  const logs: unknown[] = [];
  let rateChecks = 0;
  const deps: InquiryDependencies = {
    allow: async () => { rateChecks++; return true; },
    insert: async inquiry => {
      const stored = { ...inquiry, id: "719ea854-f0b5-42d6-94cb-52f28d5f9791", created_at: "2026-09-12T12:00:00Z" };
      rows.push(stored); return stored;
    },
    notify: async inquiry => { notifications.push(inquiry); },
    log: (...args) => { logs.push(args); },
    ...overrides,
  };
  return { deps, rows, notifications, logs, rateChecks: () => rateChecks };
}

test("valid inquiry is stored before notification and success", async () => {
  const h = harness();
  const state = await receiveInquiry(form(), h.deps);
  assert.deepEqual(state, { status: "success", message: inquirySuccess });
  assert.equal(h.rows.length, 1);
  assert.equal(h.notifications[0], h.rows[0]);
});

for (const [field, value] of [
  ["name", ""], ["email", "not-an-email"], ["description", " \n"],
  ["service", "Unapproved service"], ["timeline", "Yesterday"],
  ["productUrl", "javascript:alert(1)"], ["productUrl", "https://user:pass@example.com"],
  ["productUrl", "https://example.com bad"], ["email", "alex@example.com\r\nBcc: other@example.com"],
  ["email", "alex..example@example.com"], ["email", ".alex@example.com"],
] as const) {
  test(`rejects invalid ${field}: ${JSON.stringify(value)}`, async () => {
    const h = harness();
    const state = await receiveInquiry(form({ [field]: value }), h.deps);
    assert.equal(state.status, "error");
    assert(state.errors?.[field]);
    assert.equal(h.rows.length, 0);
    assert.equal(h.notifications.length, 0);
    assert.equal(h.rateChecks(), 0);
  });
}

for (const [field, max] of Object.entries(contactLimits)) {
  test(`rejects oversized ${field}`, () => {
    assert.equal(validateInquiry(form({ [field]: "a".repeat(max + 1) })).valid, false);
  });
}

test("optional company and valid product URL are accepted", () => {
  const result = validateInquiry(form({ company: "", productUrl: "https://example.com/product?q=demo" }));
  assert(result.valid);
  assert.equal(result.inquiry.company, null);
  assert.equal(result.inquiry.product_url, "https://example.com/product?q=demo");
});

for (const [service, type] of [["Test Automation", "general"], ["Quality Audit", "quality_audit"], ["AI Initiative Gate", "ai_initiative_gate"]]) {
  test(`${service} stores ${type}`, async () => {
    const h = harness();
    await receiveInquiry(form({ service }), h.deps);
    assert.equal(h.rows[0].inquiry_type, type);
  });
}

test("honeypot, duplicate fields and uploaded files are rejected", async () => {
  const h = harness();
  assert.equal((await receiveInquiry(form({ website_confirm: "bot" }), h.deps)).status, "error");
  const duplicate = form(); duplicate.append("service", "Quality Audit");
  assert.equal((await receiveInquiry(duplicate, h.deps)).status, "error");
  const file = form(); file.set("description", new Blob(["upload"]), "message.txt");
  assert.equal((await receiveInquiry(file, h.deps)).status, "error");
  assert.equal(h.rows.length, 0);
});

test("unexpected fields and malformed action arguments fail without storage", async () => {
  const h = harness();
  for (const data of [null, {}, "payload", form({ inquiry_type: "spoofed" }), form({ admin: "true" })]) {
    const result = await receiveInquiry(data as FormData, h.deps);
    assert.deepEqual(result, { status: "error", message: inquiryFailure });
  }
  const excessive = form();
  for (let i = 0; i < 21; i++) excessive.append(`$ACTION_${i}`, "metadata");
  assert.equal((await receiveInquiry(excessive, h.deps)).status, "error");
  assert.equal(h.rows.length, 0);
  assert.equal(h.rateChecks(), 0);
});

test("React action metadata is accepted without being stored", async () => {
  const h = harness();
  assert.equal((await receiveInquiry(form({ $ACTION_ID_example: "" }), h.deps)).status, "success");
  assert(!JSON.stringify(h.rows).includes("$ACTION_"));
});

test("markup and SQL-like text remain data in plain-text notifications", async () => {
  const h = harness();
  const description = "<script>alert(1)</script> '; DROP TABLE inquiries; --";
  assert.equal((await receiveInquiry(form({ description }), h.deps)).status, "success");
  assert.equal(h.rows[0].message, description);
  const email = notificationMessage(h.rows[0]);
  assert(email.text.includes(description));
  assert(!("html" in email));
});

test("rate limit denial and outage do not create an inquiry", async () => {
  for (const allow of [async () => false, async (): Promise<boolean> => { throw new Error("private details"); }]) {
    const h = harness({ allow });
    const result = await receiveInquiry(form(), h.deps);
    assert.equal(result.status, "error");
    assert.equal(h.rows.length, 0);
    assert(!JSON.stringify(result).includes("private details"));
  }
});

test("database failure returns generic error and never sends email", async () => {
  const h = harness({ insert: async () => { throw new Error("database secrets"); } });
  assert.deepEqual(await receiveInquiry(form(), h.deps), { status: "error", message: inquiryFailure });
  assert.equal(h.notifications.length, 0);
});

test("email failure preserves saved inquiry and logs its ID", async () => {
  const h = harness({ notify: async () => { throw new Error("resend private details"); } });
  assert.equal((await receiveInquiry(form(), h.deps)).status, "success");
  assert.equal(h.rows.length, 1);
  assert.deepEqual(h.logs, [["inquiry_notification_failed", h.rows[0].id]]);
});

test("notification includes every field and uses plain text", async () => {
  const h = harness(); await receiveInquiry(form(), h.deps);
  const email = notificationMessage(h.rows[0]);
  assert.equal(email.reply_to, "alex@example.com");
  assert.equal(email.subject, "New Eshana Inquiry — Test Automation");
  for (const label of ["Name:", "Email:", "Company:", "Product URL:", "Selected service:", "Timeline:", "Inquiry type:", "Message:", "Submission time:"]) assert(email.text.includes(label));
});

test("real adapters use Supabase and Resend protocols with server credentials", async (t) => {
  const old = { ...process.env };
  t.after(() => { process.env = old; });
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-server-key";
  process.env.RESEND_API_KEY = "test-mail-key";
  process.env.INQUIRY_FROM_EMAIL = "website@eshanasolutions.com";
  process.env.INQUIRY_TO_EMAIL = "inquiries@eshanasolutions.com";
  const requests: { url: string; headers: Headers; body: Record<string, unknown> }[] = [];
  t.mock.method(globalThis, "fetch", async (input: string | URL | Request, options?: RequestInit) => {
    const url = String(input);
    requests.push({ url, headers: new Headers(options?.headers), body: JSON.parse(String(options?.body)) });
    return new Response(JSON.stringify(url.includes("consume_inquiry") ? true : { id: "test-id", created_at: "2026-09-12T12:00:00Z" }), { status: 200, headers: { "Content-Type": "application/json" } });
  });
  assert(await allowInquiry("192.0.2.1", "alex@example.com"));
  const valid = validateInquiry(form()); assert(valid.valid);
  const stored = await insertInquiry(valid.inquiry);
  await sendInquiryNotification(stored);
  assert.equal(requests.length, 4);
  assert.match(String(requests[0].body.p_key), /^[0-9a-f]{64}$/);
  assert.equal(requests[0].body.p_limit, 10);
  assert.equal(requests[1].body.p_limit, 3);
  assert.equal(requests[2].headers.get("apikey"), "test-server-key");
  assert.equal(requests[2].body.inquiry_type, "general");
  assert.equal(requests[3].url, "https://api.resend.com/emails");
  assert.equal(requests[3].headers.get("Authorization"), "Bearer test-mail-key");
  assert.equal(requests[3].body.reply_to, "alex@example.com");
  assert.deepEqual(requests[3].body.to, ["inquiries@eshanasolutions.com"]);
});

test("rate limiter trusts Vercel headers only on Vercel", (t) => {
  const old = process.env.VERCEL;
  t.after(() => { if (old === undefined) delete process.env.VERCEL; else process.env.VERCEL = old; });
  process.env.VERCEL = "0";
  const headers = new Headers({ "x-vercel-forwarded-for": "192.0.2.1", "x-forwarded-for": "192.0.2.2" });
  assert.equal(requestAddress(headers), "shared-origin");
  process.env.VERCEL = "1";
  assert.equal(requestAddress(headers), "192.0.2.1");
  assert.equal(requestAddress(new Headers({ "x-forwarded-for": "192.0.2.2" })), "shared-origin");
});
