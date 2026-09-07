# Eshana Software Solutions Website

Production marketing site for Eshana Software Solutions LLC, built with the Next.js App Router, TypeScript, Tailwind CSS, and ESLint.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

The production build uses `next build --webpack` because this Next.js version defaults to Turbopack and the local environment blocks one of Turbopack's worker port operations. This remains compatible with Vercel.

## Routes

- `/`
- `/services`
- `/work`
- `/work/triagezero`
- `/work/aec-quality-workflow`
- `/quality-audit`
- `/insights`
- `/about`
- `/contact`

## Notes

The contact form validates through a Server Action and intentionally does not fake a successful database submission. Supabase, email delivery, secrets, payments, and Vercel environment variables are left for the next integration step.
