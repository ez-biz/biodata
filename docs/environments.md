# Environment Setup Guide

## Overview

BiodataCraft uses a multi-environment workflow:

| Environment | Branch      | Vercel         | Database         |
| ----------- | ----------- | -------------- | ---------------- |
| Local       | `feature/*` | —              | Prod Supabase\*  |
| Staging     | `develop`   | Preview deploy | Dev Supabase\*\* |
| Production  | `main`      | Production URL | Prod Supabase    |

\* Until a separate dev Supabase project is available, local dev uses prod.
\*\* Requires Supabase Pro plan for a third project. Dev project `biodata-dev` (`yuydffkptlwqeakyqzod`) is created and ready.

## Local Development Setup

### Prerequisites

- **Node.js 20** (pinned via `.nvmrc`)
- **nvm** for Node version management
- **Git** with Husky pre-commit hooks (auto-installed via `npm ci`)

### First-Time Setup

```bash
# 1. Clone the repo
git clone https://github.com/ez-biz/biodata.git
cd biodata

# 2. Switch to Node 20
nvm use

# 3. Install dependencies
npm ci

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (see below)

# 5. Run database migrations
npx prisma migrate deploy

# 6. Seed the database (templates)
npm run db:seed

# 7. Generate Prisma client
npx prisma generate

# 8. Start dev server
npm run dev
```

### Environment Variables (.env.local)

Copy `.env.example` to `.env.local` and fill in the values:

| Variable                        | Required | Description                            |
| ------------------------------- | -------- | -------------------------------------- |
| `DATABASE_URL`                  | Yes      | Supabase pooled connection (port 6543) |
| `DIRECT_URL`                    | Yes      | Supabase direct connection (port 5432) |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes      | `https://<ref>.supabase.co`            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes      | Supabase anon/public key               |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes      | Supabase service role key              |
| `NEXTAUTH_URL`                  | Yes      | `http://localhost:3000`                |
| `NEXTAUTH_SECRET`               | Yes      | `openssl rand -base64 32`              |
| `GOOGLE_CLIENT_ID`              | No       | Google OAuth client ID                 |
| `GOOGLE_CLIENT_SECRET`          | No       | Google OAuth client secret             |
| `RAZORPAY_KEY_ID`               | No       | Razorpay key (payments)                |
| `RAZORPAY_KEY_SECRET`           | No       | Razorpay secret                        |
| `ANTHROPIC_API_KEY`             | No       | Claude API key (AI About Me)           |
| `RESEND_API_KEY`                | No       | Resend API key (emails)                |
| `ADMIN_EMAILS`                  | No       | Comma-separated admin emails           |
| `NEXT_PUBLIC_POSTHOG_KEY`       | No       | PostHog project key                    |
| `NEXT_PUBLIC_SENTRY_DSN`        | No       | Sentry DSN                             |

### Daily Workflow

```bash
# Start of day
nvm use                    # Ensure Node 20
git checkout develop       # Start from develop
git pull origin develop    # Get latest changes

# Create a feature branch
git checkout -b feature/my-feature

# Work on your changes...
npm run dev                # Dev server on localhost:3000

# Before committing (pre-commit hooks run automatically)
npm run validate           # Full check: lint + typecheck + build

# Commit (hooks auto-run eslint + prettier on staged files)
git add <files>
git commit -m "Add my feature"

# Push and create PR to develop
git push origin feature/my-feature
# Create PR: feature/my-feature → develop
```

### Useful Commands

| Command               | Purpose                               |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Start Next.js dev server              |
| `npm run build`       | `prisma generate && next build`       |
| `npm run lint`        | Run ESLint                            |
| `npm run typecheck`   | Run `tsc --noEmit`                    |
| `npm run validate`    | lint + typecheck + build (full check) |
| `npm run db:migrate`  | Apply Prisma migrations               |
| `npm run db:seed`     | Seed templates into database          |
| `npm run db:reset`    | Reset database (destructive!)         |
| `npm run test:e2e`    | Run Playwright E2E tests              |
| `npm run test:e2e:ui` | Run Playwright with UI                |

## Staging (develop branch)

### How It Works

- Push to `develop` → CI runs (lint, typecheck, build)
- Vercel auto-deploys a **Preview** deployment
- Preview URL is available on the PR / Vercel dashboard

### Vercel Preview Environment Variables

In Vercel Project Settings → Environment Variables, set these with **Preview** scope:

- `DATABASE_URL` → dev Supabase pooled connection
- `DIRECT_URL` → dev Supabase direct connection
- `NEXT_PUBLIC_SUPABASE_URL` → dev Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → dev Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` → dev Supabase service role key
- `NEXTAUTH_SECRET` → any secret string
- `NEXTAUTH_URL` → Vercel preview URL (or leave empty, NextAuth auto-detects on Vercel)

### Dev Supabase Project

| Property     | Value                                                       |
| ------------ | ----------------------------------------------------------- |
| Project name | `biodata-dev`                                               |
| Reference ID | `yuydffkptlwqeakyqzod`                                      |
| Region       | South Asia (Mumbai) `ap-south-1`                            |
| Dashboard    | https://supabase.com/dashboard/project/yuydffkptlwqeakyqzod |

**Status**: Created but database may need initialization. When ready:

```bash
# Set dev database URLs temporarily
export DATABASE_URL="postgresql://postgres.yuydffkptlwqeakyqzod:<password>@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
export DIRECT_URL="postgresql://postgres.yuydffkptlwqeakyqzod:<password>@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

# Run migrations
npx prisma migrate deploy

# Seed templates
npm run db:seed
```

Also create a public `photos` storage bucket in the Supabase dashboard.

## Production (main branch)

### How It Works

- PRs from `develop` → `main` require CI status checks to pass
- Merging to `main` triggers Vercel **Production** deployment
- Production uses prod Supabase project

### Prod Supabase Project

| Property     | Value                                                       |
| ------------ | ----------------------------------------------------------- |
| Project name | `biodata`                                                   |
| Reference ID | `ssedpizhxctcrksvdxrb`                                      |
| Region       | South Asia (Mumbai) `ap-south-1`                            |
| Dashboard    | https://supabase.com/dashboard/project/ssedpizhxctcrksvdxrb |

### Deployment Flow

```
feature/* → PR to develop → Vercel Preview → PR to main → Vercel Production
              ↓                                  ↓
         CI: lint+types+build              CI: lint+types+build
         Vercel Preview Deploy             Branch protection check
                                           Vercel Production Deploy
```

## GitHub Branch Protection

Branch protection is enabled on `main`:

- **Require status checks to pass**: "Lint, Type Check & Build" must pass
- Direct pushes to `main` require passing CI

To modify: GitHub → Settings → Branches → `main` rule

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`):

- **Triggers**: Push to `main` or `develop`, PRs to `main`
- **Jobs**:
  1. `lint-and-build`: ESLint → TypeScript check → Next.js build
  2. `e2e` (PRs only): Playwright tests with Chromium

## Supabase Storage Setup

Each Supabase project needs a `photos` bucket:

1. Go to Supabase Dashboard → Storage
2. Create bucket named `photos`
3. Set to **Public**
4. Add RLS policy to allow authenticated uploads (or use service role key)

## Troubleshooting

### `npm ci` fails with lockfile error

Ensure you're using Node 20: `nvm use`

### Prisma migration fails

- Check `DATABASE_URL` and `DIRECT_URL` are correct
- Ensure Supabase project is fully initialized (may take a few minutes after creation)
- Use `DIRECT_URL` (port 5432) for migrations, not pooled connection

### Pre-commit hook fails

- Fix the lint/type errors shown in the output
- Don't use `--no-verify` to skip — fix the underlying issue

### Build fails locally but passes CI (or vice versa)

- Check Node version: `node -v` should show v20.x
- Run `npm ci` to get clean dependencies
- Ensure all required env vars are set
