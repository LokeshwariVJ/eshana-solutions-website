# Security

## Secrets
- Keep private keys in ignored `.env.local` locally and scoped Vercel environment variables in production. `.env.example` contains empty declarations only.
- Supabase service-role and Resend keys are accessed only in `server-only` modules. Never prefix them with `NEXT_PUBLIC_`, pass them to React props, or paste them into logs/issues.
- Run `node scripts/check-secrets.mjs` after a production build. It checks configured private-key values in source, git diff, and client assets; it is not a comprehensive historical secret scanner. Enable GitHub secret scanning/push protection too.

## Supabase
- `inquiries` and `inquiry_rate_limits` are private: RLS enabled, no browser policies, all grants revoked from PUBLIC, anon, and authenticated. Only the server service role accesses them; it bypasses RLS and must remain secret.
- Apply all files in `supabase/migrations/` in timestamp order with the SQL Editor or `supabase db push` against the intended project. The hardening migration forces RLS and removes any accidentally added policies on these two tables; it does not delete inquiries.
- Run `supabase/tests/inquiry_permissions.sql` as postgres after migrations. It asserts RLS, browser-role grants, and server permissions without reading customer rows. Then run `node scripts/verify-live-security.mjs` for anonymous REST denial and HTTPS checks.
- Migration files alone do not prove deployed catalog state. Authenticated-role and forced-RLS checks require the SQL assertions; do not substitute an anonymous probe for them.

## Form Abuse And Privacy
- Server Actions retain Next.js POST-only and same-origin checks. Request bodies are limited to 64 KB. Validation rejects unsupported fields, duplicate/file values, control characters, invalid email/URLs, unsupported options, and excessive lengths.
- A honeypot and atomic Supabase limits allow 10 attempts per IP and 3 per email per 15 minutes for otherwise valid submissions. Only HMAC digests are stored. Vercel's overwritten address header is trusted; other hosts share a fallback bucket.
- Limits fail closed, but validation-only floods and distributed attacks still need Vercel WAF/rate-limit rules. Enable monitoring and add server-verified Turnstile if necessary. Never treat a hidden action ID as authentication.
- Inputs remain data: parameterized SDK calls, React escaping, plain-text notification emails; product URLs are not fetched. Logs contain event names and an internal inquiry ID only, never full payloads or provider errors. IDs are not returned to visitors.
- Review records even if notifications fail. Restrict dashboard/log access, enable MFA, and define retention/deletion periods for both database inquiries and email copies with the business owner.

## Browser And Transport
- Per-request nonce CSP blocks unapproved inline scripts, event handlers, objects, framing, and foreign form destinations. Next.js pages are dynamically rendered so nonces are fresh; this intentionally gives up static HTML caching. Do not cache nonce-bearing HTML across visitors.
- Inline styles remain allowed for React/Next Image compatibility, not inline scripts. Development alone permits eval/WebSocket tooling. Supabase and Resend are server-to-server and need no browser CSP allowlist.
- Standard Vercel Analytics origins and same-origin `/_vercel/insights` traffic are permitted, but analytics is not currently installed. Custom integrations or the preview toolbar need a separate CSP review; do not add broad wildcards.
- Responses include nosniff, anti-framing, referrer, and permissions policies. Production Vercel builds add one-year HSTS without preload/subdomain assumptions. Vercel must redirect HTTP to HTTPS; local development/start may use HTTP. Never expose a development server publicly.

## Maintenance And Incidents
- Run `npm audit`, review upstream Next.js/React advisories, and apply tested patches promptly. Audit output alone is not a security guarantee. Keep the lockfile; use `npm ci` in CI. Review minor/major upgrades separately.
- Before deployment: `npm run lint`, `npm test`, `npm run build`, `node scripts/check-secrets.mjs`, and `npm run test:e2e`. The Playwright suite checks Chromium, WebKit, mobile layouts, and release metadata/security controls. Normal production smoke blocks browser writes. Successful submission requires explicit opt-in; see README. The legacy `scripts/security-smoke.mjs` remains available for deeper HTTP probes against a local build.
- If a key leaks: revoke/rotate it immediately in Supabase/Resend, update Vercel and local secrets, redeploy, and inspect access/delivery logs. Rotate before cleaning git history; invalidate exposed deployment artifacts and review affected records.
- For abuse or suspected exposure: block traffic with Vercel WAF, preserve restricted audit evidence, assess scope, restore the last safe deployment if needed, and follow applicable notification obligations. Never post credentials or customer data in a public issue.

## Review Status (2026-09-12)
- Next.js updated to 16.3.5; React remains on patched 19.2.8. Audit reported no known vulnerabilities. React 19.3 is available but not required by the audit.
- Live anonymous SELECT/INSERT/UPDATE/DELETE and rate-limit RPC probes were denied. The existing public domain redirects HTTP to HTTPS and serves HSTS.
- `20260912010000_inquiry_rls_hardening.sql` was applied successfully to the configured production project through SQL Editor. Post-migration anonymous REST probes passed. Full catalog assertions and the rollback-only service-role insert test are pending SQL Editor access; new headers still require Vercel deployment. No admin or custom public inquiry API route exists.

References: [Next.js CSP](https://nextjs.org/docs/app/guides/content-security-policy), [Next.js security release](https://nextjs.org/blog/august-2026-security-release), [Vercel request headers](https://vercel.com/docs/headers/request-headers).
