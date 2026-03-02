# BiodataCraft — Indian Marriage Biodata Maker

India's most loved marriage biodata maker. Create beautiful, print-ready marriage biodatas in minutes with 14+ stunning templates, 7 languages, and instant PDF download.

**Live:** [biodatacraft.in](https://www.biodatacraft.in)

## Features

- **14 Biodata Templates** — Traditional, Modern, Gujarati, Muslim, Sikh, South Indian, Bengali, Rajasthani, NRI Professional, Christian, Floral, Minimalist, and more
- **7 Languages** — English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali
- **PDF Export** — High-quality, print-ready A4 PDF download with multi-page support
- **Photo Upload & Crop** — Profile photos with in-browser cropping (stored on S3/R2)
- **WhatsApp Sharing** — Shareable links with password protection and expiry
- **AI About Me** — AI-generated "About Me" section powered by Claude Haiku
- **Razorpay Payments** — Premium/Unlimited/Family plans with INR pricing
- **Admin Panel** — User management, payment tracking, promo codes, analytics dashboard
- **SEO Optimized** — JSON-LD structured data, sitemap, robots.txt, regional landing pages
- **PWA** — Installable app with offline form editing support
- **A/B Testing** — PostHog feature flags for pricing, CTA, and template experiments
- **Email Notifications** — Welcome, payment receipt, and view milestone emails via Resend
- **Rate Limiting** — In-memory sliding window protection on all sensitive endpoints
- **E2E Tests** — Playwright test suite covering critical user flows

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL + Prisma 5 |
| Auth | NextAuth 4 (Credentials + Google OAuth) |
| State | Zustand (localStorage persistence) |
| Payments | Razorpay |
| Storage | AWS S3 / Cloudflare R2 |
| Email | Resend |
| AI | Anthropic Claude (Haiku) |
| Analytics | PostHog |
| PDF | html2canvas + jsPDF |
| Testing | Playwright |
| Fonts | DM Sans, Playfair Display, Noto Sans Devanagari, Noto Sans Gujarati |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm

### 1. Clone & Install

```bash
git clone <repo-url> biodata
cd biodata
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | App URL (http://localhost:3000 for dev) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth JWT |

Optional variables (features degrade gracefully without these):

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth login |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Payment processing |
| `ANTHROPIC_API_KEY` | AI About Me generation |
| `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | Analytics & A/B testing |
| `S3_BUCKET` / `S3_REGION` / `S3_ACCESS_KEY` / `S3_SECRET_KEY` | Photo storage |
| `RESEND_API_KEY` / `EMAIL_FROM` | Transactional emails |
| `ADMIN_EMAILS` | Comma-separated admin email addresses |

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Run Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page
│   ├── create/page.tsx           # 7-step biodata form wizard
│   ├── templates/page.tsx        # Template gallery
│   ├── pricing/page.tsx          # Pricing plans
│   ├── dashboard/page.tsx        # User dashboard
│   ├── login/page.tsx            # Login
│   ├── signup/page.tsx           # Signup
│   ├── share/[slug]/page.tsx     # Public shared biodata
│   ├── blog/                     # Blog with 6 SEO articles
│   ├── hindi/page.tsx            # Hindi regional landing page
│   ├── gujarati/page.tsx         # Gujarati regional landing page
│   ├── admin/                    # Admin panel (stats, users, payments, promo)
│   ├── offline/page.tsx          # PWA offline page
│   ├── api/                      # API routes (18 endpoints)
│   │   ├── auth/                 # NextAuth + signup
│   │   ├── biodata/              # CRUD, share, analytics, AI generate
│   │   ├── payments/             # Razorpay order, verify, webhook
│   │   ├── photos/               # Upload URL, CRUD
│   │   ├── share/[slug]/         # Public biodata access
│   │   └── admin/                # Admin APIs
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt
├── components/
│   ├── templates/                # 14 biodata template components
│   ├── forms/                    # Form wizard steps + completion indicators
│   ├── editor/                   # Preview, PDF export, share dialog, page breaks
│   ├── marketing/                # Navbar, hero, footer, testimonials, FAQ
│   ├── payments/                 # Upgrade modal
│   ├── providers/                # Auth, i18n, PostHog providers
│   ├── pwa/                      # Install prompt, SW registrar
│   ├── seo/                      # JSON-LD structured data
│   ├── experiments/              # A/B test wrapper
│   └── ui/                       # 20 shadcn/ui components
├── lib/
│   ├── types/biodata.ts          # All TypeScript types
│   ├── store/biodata-store.ts    # Zustand store
│   ├── validators/               # Zod schemas per form step
│   ├── constants/indian-data.ts  # Religions, castes, states, rashis
│   ├── templates/                # Template configs + sample data
│   ├── auth/auth-options.ts      # NextAuth configuration
│   ├── db/prisma.ts              # Prisma client singleton
│   ├── i18n/                     # 7 language translations
│   ├── email/                    # Resend client + email templates
│   ├── posthog/                  # Feature flags (client + server)
│   ├── middleware/rate-limit.ts  # Rate limiting utility
│   ├── pwa/register-sw.ts       # Service worker registration
│   ├── storage/s3.ts             # S3 presigned URLs
│   ├── razorpay.ts               # Razorpay client
│   ├── analytics.ts              # PostHog event helpers
│   ├── blog/posts.ts             # Blog content
│   └── utils/                    # Form completion, PDF pagination
├── e2e/                          # Playwright E2E tests
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   └── icons/                    # PWA icons
└── prisma/schema.prisma          # Database schema (10 models)
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run Playwright in UI mode |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker / Self-hosted

```bash
npm run build
npm run start
```

Ensure `DATABASE_URL` points to your PostgreSQL instance and run `npx prisma db push` before first start.

## License

Proprietary. All rights reserved.
