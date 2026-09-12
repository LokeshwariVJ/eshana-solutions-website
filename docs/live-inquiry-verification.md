# Live inquiry verification

Verified on September 12, 2026 (UTC), using the local Next.js website and the
configured live Supabase and Resend services. This does not verify a Vercel deployment.

## Migration

Applied `supabase/migrations/20260912000000_inquiries.sql` through the Supabase
SQL Editor in the Eshana project matching `.env.local`. The transaction completed
successfully. Do not run this migration again on that project; reconcile CLI
migration history before adopting `supabase db push`.

## Live submissions

Each flow was exercised through the website, including service preselection and
server validation. All three returned the confirmed success state, created a row
with status `new`, and generated a notification received in the receiving inbox.

| Flow | Stored inquiry type | Inquiry ID |
| --- | --- | --- |
| Contact / Test Automation | `general` | `6b93c7a3-a052-46f7-9e0b-7c52ac263316` |
| Quality Audit | `quality_audit` | `be8861aa-e9e4-4676-9412-ac834a380929` |
| AI Initiative Gate | `ai_initiative_gate` | `99228c67-304c-434b-889a-30b45743f964` |

The records and emails are clearly labeled with `ESHANA-LIVE-20260912-01` and
`TEST ONLY`. They remain available for inspection and require no customer follow-up.
Notifications were addressed to `inquiries@eshanasolutions.com`. The Resend key
retains sending-only access; email receipt was verified through the signed-in UI,
without increasing key permissions.

## Access and validation

- Invalid form submissions created no inquiry rows.
- Anonymous reads, inserts, updates, deletes, and rate-limit RPC calls were denied
  with HTTP 401 / PostgreSQL permission code `42501`.
- The valid submissions passed the live rate limiter.
- No production secrets were added to tracked source or documentation.

Authenticated-user access is revoked in the migration but was not exercised with
a real signed-in user token during this check. The previous automated tests cover
storage and email failure handling; no intentional production provider outage was
introduced during live verification.
