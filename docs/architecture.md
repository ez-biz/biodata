# Architecture Overview

## System Architecture

BiodataCraft is a monolithic Next.js 14 application using the App Router. All frontend, backend API, and server-side rendering runs within a single deployment.

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                   │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ React UI │  │ Zustand  │  │ PostHog / SW / PWA│  │
│  │ (Pages)  │  │ (Store)  │  │ (Analytics)       │  │
│  └────┬─────┘  └────┬─────┘  └───────────────────┘  │
│       │              │                                │
│       │   localStorage (guest persistence)            │
└───────┼──────────────┼────────────────────────────────┘
        │              │
        ▼              ▼
┌─────────────────────────────────────────────────────┐
│               Next.js 14 App Router                  │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ Server       │  │ API Route    │                 │
│  │ Components   │  │ Handlers     │                 │
│  │ (SSR/SSG)    │  │ (/api/*)     │                 │
│  └──────┬───────┘  └──────┬───────┘                 │
│         │                  │                         │
│         ▼                  ▼                         │
│  ┌──────────────────────────────────┐               │
│  │          Shared Libraries         │               │
│  │  Prisma │ NextAuth │ Rate Limit  │               │
│  │  Resend │ Razorpay │ S3 Client   │               │
│  │  Anthropic │ PostHog Node        │               │
│  └──────────────┬───────────────────┘               │
└─────────────────┼───────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌────────┐  ┌─────────┐  ┌──────────┐
│PostgreSQL│ │ S3 / R2 │ │ External │
│(Prisma) │  │(Photos) │  │ Services │
└─────────┘  └─────────┘  │Razorpay  │
                           │Resend    │
                           │Anthropic │
                           │PostHog   │
                           └──────────┘
```

## Request Flow

### Page Request (SSR/SSG)
1. Browser requests `/create`
2. Next.js renders the page server-side (or serves pre-rendered static HTML)
3. Client hydrates with React, Zustand loads persisted state from localStorage
4. PostHog provider initializes analytics, service worker registers

### API Request (e.g., Save Biodata)
1. Client sends `POST /api/biodata` with JSON body
2. Rate limiter checks request against sliding window
3. NextAuth middleware validates session JWT
4. Prisma executes database query
5. Response returned to client

### PDF Generation (Client-side)
1. Template component renders biodata as HTML in a hidden container
2. `computePageSlices()` detects page boundaries (A4 dimensions)
3. `html2canvas` captures each page slice as a canvas
4. `jsPDF` creates a multi-page PDF from the canvases
5. PDF is downloaded to user's browser

## Key Design Decisions

### Why Prisma v5 (not v7)?
Prisma v7 introduced breaking config changes and a different adapter pattern. v5 is stable and works with `@auth/prisma-adapter@1` for NextAuth.

### Why raw `<img>` tags in templates?
`next/image` components don't render properly with `html2canvas` for PDF generation. Templates use raw `<img>` tags for cross-compatibility (ESLint rule `@next/next/no-img-element` is disabled).

### Why Zustand with localStorage?
Guest users (not logged in) can use the form wizard without creating an account. Zustand's `persist` middleware saves form data to localStorage, allowing users to resume later. When they sign up, data can be saved to PostgreSQL.

### Why custom i18n (not next-intl)?
We built a lightweight i18n system (~2KB) instead of using next-intl (~15KB) to keep the bundle small. It uses React Context with 7 translation files and a `useI18n()` hook.

### Why lazy initialization for external SDKs?
Razorpay, Resend, and PostHog Node clients are lazily initialized via functions like `getRazorpay()` instead of top-level `new Razorpay()`. This prevents build failures when environment variables are empty (common in CI/CD and preview deployments).

### Why in-memory rate limiting (not Redis)?
For simplicity and zero external dependencies. The in-memory `Map` with sliding window timestamps works for single-instance deployments. For multi-instance scaling, swap to Redis-backed rate limiting.

## Database Schema

10 models in PostgreSQL via Prisma:

| Model | Purpose |
|-------|---------|
| `User` | Auth user with tier system (FREE/PREMIUM/UNLIMITED/FAMILY) |
| `Account` | OAuth provider accounts (Google) |
| `Session` | Session tokens (used by NextAuth) |
| `VerificationToken` | Email verification tokens |
| `Biodata` | Main biodata data (JSON), template, share settings |
| `Template` | Template metadata (stored in DB, configs also in code) |
| `Photo` | Profile/additional/kundli photos with S3 keys |
| `Payment` | Razorpay transaction records |
| `SharedLinkView` | View analytics for shared biodata links |
| `PromoCode` | Discount codes with usage tracking |

### Key Relationships
- `User` has many `Biodata`, `Payment`, `Account`, `Session`
- `Biodata` has many `Photo`, `Payment`, `SharedLinkView`
- `Biodata.data` is a JSON column storing the full `BiodataFormData` object

## Authentication Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Signup     │     │    Login     │     │ Google OAuth │
│ (email/pass) │     │ (email/pass) │     │  (optional)  │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────┐
│                    NextAuth v4                           │
│  Strategy: JWT (not database sessions)                  │
│  Adapter: @auth/prisma-adapter (for user creation only) │
│                                                         │
│  JWT Callback: Fetches tier + isAdmin from DB           │
│  Session Callback: Exposes id, tier, isAdmin to client  │
└─────────────────────────────────────────────────────────┘
```

Admin access is determined by matching the user's email against `ADMIN_EMAILS` environment variable (comma-separated list).

## Payment Flow

```
Client                    Server                    Razorpay
  │                         │                          │
  │ 1. Select Plan          │                          │
  │─────────────────────────>                          │
  │                         │ 2. Create Order           │
  │                         │─────────────────────────>│
  │                         │<─────────────────────────│
  │<─────────────────────────  3. Return order_id      │
  │                         │                          │
  │ 4. Razorpay Checkout ──────────────────────────────>
  │<────────────────────────── 5. Payment callback     │
  │                         │                          │
  │ 6. Verify Signature     │                          │
  │─────────────────────────>                          │
  │                         │ 7. HMAC-SHA256 verify    │
  │                         │ 8. Update user tier      │
  │                         │ 9. Send receipt email    │
  │<─────────────────────────  10. Success response    │
  │                         │                          │
  │                         │<──── Webhook (backup) ───│
```

## Template System

Templates are plug-and-play React components. Adding a new template requires:

1. Create `src/components/templates/my-template.tsx` — Receives `BiodataFormData` + `colorScheme`
2. Add config to `src/lib/templates/template-config.ts` — Name, tier, religions, color schemes
3. Register in `src/components/editor/biodata-preview.tsx` — Add to `TEMPLATE_COMPONENTS` map
4. Register in `src/components/templates/template-thumbnail.tsx` — Add to thumbnail component map

All templates share the same `BiodataFormData` interface and use `template-utils.ts` helper functions to extract field labels and values (with locale support).
