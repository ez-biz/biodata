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

## Branching & Environments

| Branch      | Environment | Vercel         | Supabase Project |
| ----------- | ----------- | -------------- | ---------------- |
| `main`      | Production  | Production URL | `biodata` (prod) |
| `develop`   | Staging     | Preview URL    | `biodata-dev`    |
| `feature/*` | Local       | —              | Local or dev     |

### Workflow

1. **Local development**: Work on `feature/*` branches off `develop`. Use `.env.local` pointing to the dev Supabase project.
2. **Staging**: Merge feature branches into `develop` via PR. Vercel auto-deploys a preview. CI runs lint + typecheck + build.
3. **Production**: When staging looks good, open a PR from `develop` → `main`. After CI passes and review, merge. Vercel auto-deploys to production.

```
feature/* → develop (PR) → main (PR) → production
              ↓                ↓
         Vercel Preview   Vercel Prod
         Supabase Dev     Supabase Prod
```

### Vercel Environment Variables

Vercel lets you scope env vars by environment:

- **Production** env vars → use prod Supabase credentials
- **Preview** env vars → use dev Supabase credentials
- **Development** env vars → for `vercel dev` (optional)

### Setting Up a New Environment

1. Create a Supabase project
2. Copy `DATABASE_URL`, `DIRECT_URL`, Supabase keys
3. Run `npx prisma migrate deploy` against the new database
4. Run `npm run db:seed` to seed templates
5. Create a `photos` storage bucket (public) in Supabase dashboard

## Environment

- Node 20 (pinned via `.nvmrc`)
- Required env vars: `DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Supabase keys
- Optional: Google OAuth, Razorpay, Anthropic, PostHog, Resend, Sentry
- See `.env.example` for full list

## Don't

- Don't commit `.env` or credentials
- Don't use `--no-verify` to skip pre-commit hooks
- Don't push directly to `main` — always use PRs from `develop`
- Don't add unnecessary abstractions or over-engineer
