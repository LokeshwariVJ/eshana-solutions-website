# Eshana Software Solutions Website

Production marketing site for Eshana Software Solutions LLC, built with the Next.js App Router, TypeScript, Tailwind CSS, and ESLint.

## Commands

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

The production build uses `next build --webpack` because this Next.js version defaults to Turbopack and the local environment blocks one of Turbopack's worker port operations. This remains compatible with Vercel.

## Routes

- `/`
- `/services`
- `/services/ai-initiative-gate`
- `/work`
- `/work/triagezero`
- `/work/aec-quality-workflow`
- `/quality-audit`
- `/insights`
- `/about`
- `/contact`

## Inquiry setup

The contact form submits to a Next.js Server Action. Server validation and a
honeypot run before storage. Supabase is the source of record; Resend sends the
internal notification after a confirmed insert. No visitor acknowledgement emails
are sent. Quality Audit uses `/contact?service=quality-audit`; AI Initiative Gate
uses `/contact?service=ai-initiative-gate`. The selected service determines the
inquiry type on the server.

Put local values in `.env.local` using the variable names in `.env.example`.
Never commit secrets. `.env.local` is ignored. Add production values through
Vercel Project Settings > Environment Variables and redeploy. Use separate test
credentials for Preview environments and Node.js 22 or newer on Vercel.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL, from the project API settings. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous API key. Documented for future browser features; this form intentionally does not use it or permit anonymous database access. |
| `SUPABASE_SERVICE_ROLE_KEY` | Required server-only key for inserts and the rate-limit RPC. Never prefix it with `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | Server-only Resend sending key. |
| `INQUIRY_FROM_EMAIL` | Verified sender, e.g. `Eshana Software Solutions <website@eshanasolutions.com>`. Defaults to that address. |
| `INQUIRY_TO_EMAIL` | Set to `inquiries@eshanasolutions.com`; this is also the default. |

Verify the sender's domain in Resend before live sending, or configure another
verified sender. Reply-To is the visitor's validated email. A provider acceptance
is not proof of inbox delivery; check Resend delivery events during launch testing.

### Apply the database migration

The configured Eshana project was migrated through SQL Editor on September 12,
2026 (UTC). See [live verification results](docs/live-inquiry-verification.md).
The instructions below apply to a new project; do not reapply this migration to
the already migrated project.

The CLI is not installed or linked by this repository. Choose one method:

1. **SQL Editor:** open the intended Supabase project's SQL Editor and run
   `supabase/migrations/20260912000000_inquiries.sql` once. It is transactional and
   creates the inquiry table, constraints, timestamp trigger, and rate-limit RPC.
2. **Supabase CLI:** install the CLI, run `supabase init` if needed, authenticate
   using `supabase login`, then `supabase link --project-ref YOUR_PROJECT_REF`.
   Review `supabase db push --dry-run`, then run `supabase db push`.

Do not apply the same migration through both methods without reconciling CLI
migration history. No credentials or project reference are hardcoded in the SQL.

RLS is enabled on both tables, with no public access policies and explicit grants
revoked from `anon` and `authenticated`. The service role alone accesses the
tables and rate-limit function. Do not add browser insert policies to bypass the
Server Action. See [Supabase RLS documentation](https://supabase.com/docs/guides/database/postgres/row-level-security).

### Spam protection and operations

The hidden honeypot rejects filled or malformed submissions. The database atomically
limits each IP to 10 attempts and each email to 3 attempts per 15-minute window.
Only keyed hashes are retained in the rate table; expired buckets are deleted on
the next request. Limits survive serverless instance restarts and fail closed if
the RPC is unavailable. On Vercel, only its overwritten `x-vercel-forwarded-for`
header is trusted. Locally, or without a trusted address, visitors share an IP bucket.
Other hosts must adapt `requestAddress` to their trusted proxy configuration.
See [Vercel request headers](https://vercel.com/docs/headers/request-headers).

Next.js retains its same-origin Server Action protections with a 64 KB request-body
limit. Do not broaden allowed origins without reviewing the deployment's needs.
Turnstile can later be verified server-side before `receiveInquiry` permits storage.

Notification failure after insertion returns success to the visitor and logs
`inquiry_notification_failed` with the saved inquiry ID. Inspect that row in
Supabase and Resend delivery logs; fix configuration and resend the notification
operationally if needed. No automatic email retry job is installed. Alert on these
structured events in Vercel logs. Logs omit messages, email addresses, credentials,
raw provider errors, and stack traces. Do not rely solely on email: review new
inquiries in Supabase. The Resend API uses a per-inquiry idempotency key and bounded
timeouts. [Resend API reference](https://resend.com/docs/api-reference/emails/send-email).

### Verification

`npm test` uses Node's built-in test runner and the existing TypeScript compiler.
It tests validation, type mapping, honeypot, rate limiting, storage failures,
notification failures, and the actual HTTP adapters with mocked provider responses.
Tests never contact live services or send email.

After applying the migration and configuring credentials:

1. Start `npm run dev`. Submit a general inquiry, then follow the Quality Audit
   request link, then the AI Initiative Gate contact link. Use clearly labeled test
   messages and an address you control. A fourth attempt with one email within
   15 minutes will be rate-limited.
2. In Supabase, confirm the three rows have `general`, `quality_audit`, and
   `ai_initiative_gate` types and the expected fields. In Resend and the receiving
   mailbox, confirm notification content and Reply-To.
3. Submit invalid fields and confirm no inquiry rows are created. Disable storage
   credentials temporarily to check that the generic failure retains entered text.
4. In a test environment, simulate an email failure and confirm the row remains,
   the visitor sees success, and the structured notification failure is logged.
5. Check anonymous and authenticated REST requests cannot read, insert, update,
   or delete inquiries or invoke the rate-limit RPC.
6. Run `npm run lint`, `npm test`, and `npm run build`; inspect `.next/static`
   and `git diff` for accidental secrets before deploying.

Without credentials/migration, valid local submissions return a generic error,
never a fake success. Payments and unrelated website features are unchanged.

See [SECURITY.md](SECURITY.md) for the CSP rendering tradeoff, production checks,
database hardening migration, permission assertions, and incident response steps.
# Browser Tests

Install browsers once with `npx playwright install chromium webkit`, then run `npm run build`.

```sh
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:smoke
npm run test:e2e:prod
npm run test:e2e:report
```

`PLAYWRIGHT_BASE_URL` defaults to `http://localhost:3000`. Playwright starts `next start` on the selected local port, or reuses a running local server outside CI. To test a fresh production build without an existing dev server, use `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:e2e`. Remote URLs never start a local server.

The local browser harness removes only CSP's `upgrade-insecure-requests` response directive because WebKit upgrades loopback assets while `next start` serves HTTP. All other CSP rules stay active, raw header tests remain unmodified, and remote responses are never rewritten. Use an HTTPS deployment for end-to-end transport validation. Set `PLAYWRIGHT_OUTPUT_DIR` as well as `PLAYWRIGHT_REPORT_DIR` when retaining separate runs.

`@smoke` covers safe public navigation, content, images, pricing, responsive layouts, sitemap/robots, known missing admin route, console errors, and deployed HTTPS/HSTS. `@release` adds strict branded social metadata, new logo, and CSP/security-header regressions. Those changes must be deployed before running the full suite against production; the public smoke command intentionally does not certify these newer release controls. To certify a candidate deployment, run `PLAYWRIGHT_BASE_URL=https://your-preview.example npm run test:e2e`.

Production smoke always disables successful submissions and blocks browser writes. `@validation` runs only locally and sends an invalid email to exercise server rejection without creating a row. Existing unit tests cover all validation rules, unsupported services, and inquiry-type mapping.

`ENABLE_E2E_FORM_SUBMISSION=true` explicitly enables one `@submission` test in its own Chromium project with no retries. It creates a real inquiry and notification using `TEST ONLY - Playwright` and `playwright-test@example.com`. Prefer a staging database/mailbox; configure server credentials there separately. Do not enable this in ordinary CI. Do not use sharding, `--repeat-each`, parallel workflow runs, or rerun this test casually: the one-record limit is per normal runner invocation, not a distributed quota. Tests never delete database records. Browser artifacts can include test input and should remain access-controlled.

Reports are written to `playwright-report/` (override with `PLAYWRIGHT_REPORT_DIR`); failure screenshots/videos and retry traces go to `test-results/`. PR/main CI runs the local build without provider secrets; the manual production workflow runs read-only smoke only.
