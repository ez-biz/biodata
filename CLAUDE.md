# BiodataCraft — Development Guidelines

## Quick Start

```bash
nvm use              # Switch to Node 20 (pinned in .nvmrc)
npm ci               # Install dependencies (deterministic)
npm run dev          # Start dev server
```

## Before Committing

Pre-commit hooks (Husky + lint-staged) run automatically on `git commit`:

- ESLint + Prettier on staged `.ts`/`.tsx` files
- Prettier on staged `.json`/`.md`/`.css` files

For a full validation before pushing:

```bash
npm run validate     # lint + typecheck + build
```

## Scripts

| Command              | Purpose                               |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start Next.js dev server              |
| `npm run build`      | `prisma generate && next build`       |
| `npm run lint`       | ESLint                                |
| `npm run typecheck`  | `tsc --noEmit`                        |
| `npm run validate`   | lint + typecheck + build (full check) |
| `npm run db:migrate` | Apply Prisma migrations               |
| `npm run db:seed`    | Seed templates                        |

## Architecture

- **Framework**: Next.js 14 (App Router), TypeScript, Tailwind + shadcn/ui
- **Database**: Supabase Postgres via Prisma 5
- **Storage**: Supabase Storage (public `photos` bucket, lazy-init client)
- **Auth**: NextAuth 4 (credentials + Google OAuth)
- **State**: Zustand with localStorage persistence
- **PDF**: html2canvas + jsPDF (templates use raw `<img>`, not next/image)

## Key Conventions

- Prisma v5 (not v7). Use `@auth/prisma-adapter@1`.
- Supabase/Razorpay clients use **lazy initialization** (`getClient()` pattern) to avoid build-time errors with empty env vars.
- Templates use raw `<img>` tags for html2canvas compatibility. ESLint `@next/next/no-img-element` is disabled.
- Zod: use `.issues` not `.errors` for error access.
- i18n: lightweight custom context/provider at `src/lib/i18n/`. No heavy library.

## Branching

- `main` — production branch, auto-deploys to Vercel
- Use feature branches for non-trivial changes
- CI runs lint + typecheck + build on every push to `main` and on PRs

## Environment

- Node 20 (pinned via `.nvmrc`)
- Required env vars: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Supabase keys
- Optional: Google OAuth, Razorpay, Anthropic, PostHog, Resend, Sentry
- See `.env.example` for full list

## Don't

- Don't commit `.env` or credentials
- Don't use `--no-verify` to skip pre-commit hooks
- Don't push directly to `main` without running `npm run validate`
- Don't add unnecessary abstractions or over-engineer
