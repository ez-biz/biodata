# Feature Documentation

## Form Wizard

The biodata creation flow is a 7-step form wizard at `/create`.

### Steps

| # | Step | Key Fields |
|---|------|------------|
| 1 | Personal Details | Full name, DOB, religion, caste, gotra, height, complexion, blood group |
| 2 | Education & Career | Degree, college, occupation, company, income, work location |
| 3 | Family Details | Father/mother name & occupation, siblings, family type, family values |
| 4 | Lifestyle & Preferences | Diet, drinking, smoking, hobbies, about me (with AI generation) |
| 5 | Partner Preferences | Age range, height range, education, caste preference, location preference |
| 6 | Contact Details | Phone, email, address, city, state, WhatsApp number |
| 7 | Horoscope | Rashi, nakshatra, manglik status, birth time, birth place |

### Form Completion Indicator

- **Completion Ring**: SVG circular progress (red → amber → green)
- **Step Indicators**: Color-coded dots showing per-step completion
- **Highlight Mode**: "Show incomplete" button adds amber glow to empty required fields
- **Completion Summary**: Collapsible panel near preview showing field counts per step

### Data Persistence

- **Guest users**: Form data saved to localStorage via Zustand `persist` middleware
- **Logged-in users**: Data saved to PostgreSQL via `PUT /api/biodata/[id]`
- **Validation**: Zod schemas validate each step independently

---

## PDF Generation

### Single-Page Flow
1. Template renders as HTML in a container (794x1123px — A4 at 96dpi)
2. `html2canvas` captures the container as a bitmap canvas
3. `jsPDF` creates an A4 PDF and draws the canvas as an image

### Multi-Page Flow
1. `computePageSlices()` scans the container for `.page-break` elements
2. If no explicit breaks, auto-detects overflow beyond A4 height
3. Each page slice is captured separately with `html2canvas` using `y` and `height` options
4. `jsPDF` creates a multi-page PDF with `addPage()` for each slice

### PDF Preview Modal
Before download, users see a mini-preview with 3 cards:
- Name + photo summary
- Personal details grid
- Contact information

---

## Photo Upload

### Flow
1. User selects an image file and crops in-browser
2. Client sends cropped blob as FormData to `POST /api/photos/upload-url`
3. Server uploads to Supabase Storage via service role key
4. Server returns public URL + storage path
5. Client saves photo metadata: `POST /api/photos`

### Supported Types
- `PROFILE` — Main profile photo
- `ADDITIONAL` — Extra photos
- `KUNDLI` — Kundli/horoscope image

### Crop
Uses `react-image-crop` for in-browser cropping. Crop coordinates stored in `Photo.cropData` JSON column.

---

## Sharing

### Share Link Generation
1. User clicks "Share" on their biodata
2. System generates a unique slug (e.g., `abc123xyz`)
3. Optional: password protection (bcrypt hashed) and expiry date
4. Share URL: `https://biodatacraft.in/share/abc123xyz`

### View Tracking
Each share link view is recorded with:
- Viewer IP (from `x-forwarded-for`)
- Device type (Mobile/Desktop from user-agent)
- Timestamp

### Milestone Notifications
At 5, 10, 25, 50, and 100 views, the biodata owner receives an email notification.

### WhatsApp Sharing
One-click WhatsApp share via `https://wa.me/?text=...` URL with the share link.

---

## AI About Me

### Flow
1. User fills in their biodata details
2. Clicks "Generate with AI" in the Lifestyle step
3. Selects tone (Formal/Casual/Poetic) and length (Short/Medium/Long)
4. Server sends biodata data to Claude Haiku with a structured prompt
5. AI generates a personalized "About Me" paragraph
6. User can accept, regenerate, or edit manually

### Rate Limit
10 generations per hour per IP to prevent abuse.

---

## Payments

### Plans

| Plan | Price | Features |
|------|-------|----------|
| Free | ₹0 | 3 templates, watermark on PDF |
| Premium | ₹199 | All templates, no watermark, 1 biodata |
| Unlimited | ₹299 | All templates, unlimited biodatas, priority support |
| Family | ₹499 | All Unlimited features + 5 family member biodatas |

### Integration
- **Provider**: Razorpay
- **Currency**: INR (Indian Rupees)
- **Verification**: HMAC-SHA256 signature validation
- **Webhook**: Async handler for `payment.captured`, `payment.failed`, `refund.created`
- **Receipt**: Email sent on successful payment via Resend

### Tier System
User's `tier` field in the database controls access:
- Free: Watermark on PDF, only free templates
- Premium/Unlimited/Family: No watermark, all templates, tier-specific limits
- `tierExpiresAt`: Set to 1 year from payment date

---

## Admin Panel

Accessible at `/admin` for users whose email is in `ADMIN_EMAILS`.

### Pages

| Page | Features |
|------|----------|
| `/admin` | Dashboard with total users, biodatas, payments, revenue stats |
| `/admin/users` | User list with search, tier management |
| `/admin/payments` | Payment history with status filters |
| `/admin/promo` | Create/edit/deactivate promo codes |

---

## Email Notifications

Sent via [Resend](https://resend.com) with maroon/gold branded HTML templates.

| Email | Trigger |
|-------|---------|
| Welcome | User signs up |
| Payment Receipt | Successful payment verification |
| View Milestone | Shared biodata reaches 5/10/25/50/100 views |

Emails are sent fire-and-forget (never block the main response).

---

## Analytics & A/B Testing

### PostHog Events

| Event | Trigger |
|-------|---------|
| `form_step_completed` | User completes a form step |
| `template_selected` | User selects a template |
| `pdf_downloaded` | User downloads PDF |
| `payment_started` | User initiates payment |
| `share_created` | User creates a share link |
| `$experiment_started` | A/B test variant shown |

### Feature Flags

| Flag | Variants | Description |
|------|----------|-------------|
| `pricing-page-variant` | control / discounted / annual | Pricing display experiment |
| `cta-copy-variant` | control / urgency / social-proof | Landing page CTA copy |
| `template-order-variant` | control / popular-first / new-first | Template gallery ordering |
| `onboarding-flow` | control / simplified | Onboarding flow experiment |

---

## PWA (Progressive Web App)

### Capabilities
- **Installable**: "Add to Home Screen" prompt on mobile
- **Offline**: Form wizard works offline (data in localStorage)
- **Cache**: Static assets cached for fast repeat visits
- **Updates**: Auto-detects new versions, prompts reload

### Service Worker Strategy
- **Static assets** (JS, CSS, fonts, images): Cache-first
- **Pages and API calls**: Network-first with offline fallback
- **Pre-cached**: `/create` and `/offline` pages

---

## SEO

### JSON-LD Structured Data

| Page | Schemas |
|------|---------|
| Landing (`/`) | Organization, WebApplication, FAQPage |
| Blog listing (`/blog`) | CollectionPage, BreadcrumbList |
| Blog post (`/blog/[slug]`) | Article, BreadcrumbList |
| Pricing (`/pricing`) | Product (with Offers), BreadcrumbList |
| Templates (`/templates`) | ItemList, BreadcrumbList |
| Hindi (`/hindi`) | WebApplication (hi), FAQPage |
| Gujarati (`/gujarati`) | WebApplication (gu), FAQPage |

### Other SEO Features
- Dynamic sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Meta tags (title, description, keywords) on all pages
- Open Graph tags for social sharing
- Regional landing pages for Hindi and Gujarati SEO

---

## Rate Limiting

In-memory sliding window rate limiter applied to sensitive API routes.

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /api/auth/signup | 5 | 15 min |
| POST /api/auth/[...nextauth] | 10 | 15 min |
| POST /api/biodata/generate-aboutme | 10 | 1 hour |
| POST /api/payments/create-order | 10 | 15 min |
| POST /api/share/[slug] | 30 | 1 min |
| POST /api/photos/upload-url | 20 | 15 min |

Expired entries are auto-cleaned every 60 seconds to prevent memory leaks.
