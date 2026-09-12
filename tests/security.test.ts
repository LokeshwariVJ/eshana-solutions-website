import assert from "node:assert/strict";
import { test } from "node:test";
import { contentSecurityPolicy, securityHeaders } from "../lib/security";

test("production CSP permits nonce scripts, blocks executable inline content and framing", () => {
  const policy = contentSecurityPolicy("test-nonce", false);
  const script = policy.split("; ").find((part) => part.startsWith("script-src "))!;
  assert(script.includes("'nonce-test-nonce'"));
  assert(!script.includes("unsafe-inline"));
  assert(!policy.includes("unsafe-eval"));
  for (const directive of ["script-src-attr 'none'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'self'", "upgrade-insecure-requests"]) assert(policy.includes(directive));
  assert(!policy.includes("supabase"));
  assert(!policy.includes("resend"));
  assert(policy.includes("https://vitals.vercel-insights.com"));
});

test("development CSP supports HMR without forcing localhost HTTPS", () => {
  const policy = contentSecurityPolicy("test-nonce", true);
  assert(policy.includes("unsafe-eval"));
  assert(policy.includes("ws:"));
  assert(!policy.includes("upgrade-insecure-requests"));
});

test("baseline headers disable MIME sniffing, framing and unused permissions", () => {
  const headers = Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value]));
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert(headers["Permissions-Policy"].includes("camera=()"));
});
