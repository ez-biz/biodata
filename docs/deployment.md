# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database (managed or self-hosted)
- Domain name (recommended: biodatacraft.in)

## Environment Variables

All environment variables must be set before deployment. See `.env.example` for the full list.

### Required

| Variable | Example | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://user:pass@host:6543/postgres?pgbouncer=true` | Supabase Postgres pooler URL |
| `DIRECT_URL` | `postgresql://user:pass@host:5432/postgres` | Supabase Postgres direct URL (for migrations) |
| `NEXTAUTH_URL` | `https://www.biodatacraft.in` | Production URL (no trailing slash) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | Random 32+ character secret |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase service role key |

### Optional (Feature-specific)

| Variable | Service | Feature |
|----------|---------|---------|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console | Google login |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay Dashboard | Payments |
| `ANTHROPIC_API_KEY` | Anthropic Console | AI About Me |
| `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | PostHog | Analytics & A/B tests |
| `RESEND_API_KEY` / `EMAIL_FROM` | Resend Dashboard | Transactional emails |
| `ADMIN_EMAILS` | `admin@example.com,owner@example.com` | Admin panel access |

Features degrade gracefully when optional variables are missing — the app still works, but those specific features are disabled.

---

## Option 1: Vercel (Recommended)

### Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/your-org/biodatacraft.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework preset: Next.js (auto-detected)

3. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set `NEXTAUTH_URL` to your production domain

4. **Database**
   - Use [Vercel Postgres](https://vercel.com/storage/postgres), [Neon](https://neon.tech), or [Supabase](https://supabase.com) for managed PostgreSQL
   - Set `DATABASE_URL` to the connection string

5. **Run Prisma Migrations**
   Add a build command override in Vercel:
   ```
   npx prisma generate && npx prisma db push && npm run build
   ```
   Or add to `package.json`:
   ```json
   "vercel-build": "prisma generate && prisma db push && next build"
   ```

6. **Custom Domain**
   - Add your domain in Vercel → Settings → Domains
   - Update DNS records as instructed
   - Update `NEXTAUTH_URL` to match

### Vercel-specific Notes

- Serverless functions have a 10s default timeout (upgradeable on Pro plan)
- The AI About Me endpoint may need a longer timeout for Claude API calls
- Razorpay webhooks need the Vercel deployment URL

---

## Option 2: Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

> Note: Add `output: "standalone"` to `next.config.mjs` for Docker builds.

### Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/biodatacraft
      - NEXTAUTH_URL=https://your-domain.com
      - NEXTAUTH_SECRET=your-secret-here
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: biodatacraft
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

### Deploy

```bash
docker compose up -d
docker compose exec app npx prisma db push
```

---

## Option 3: VPS / Bare Metal

### Steps

```bash
# 1. Clone and install
git clone <repo-url> /var/www/biodatacraft
cd /var/www/biodatacraft
npm ci --production

# 2. Set up environment
cp .env.example .env
nano .env  # Fill in all variables

# 3. Build
npx prisma generate
npx prisma db push
npm run build

# 4. Run with PM2
npm install -g pm2
pm2 start npm --name "biodatacraft" -- start
pm2 save
pm2 startup
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name biodatacraft.in www.biodatacraft.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name biodatacraft.in www.biodatacraft.in;

    ssl_certificate /etc/letsencrypt/live/biodatacraft.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/biodatacraft.in/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Post-Deployment Checklist

- [ ] Database migrated (`npx prisma db push`)
- [ ] `NEXTAUTH_URL` matches production domain
- [ ] `NEXTAUTH_SECRET` is a strong random value (not the default)
- [ ] HTTPS enabled
- [ ] Razorpay webhook URL configured in Razorpay Dashboard → `https://your-domain/api/payments/webhook`
- [ ] Google OAuth redirect URI updated in Google Console → `https://your-domain/api/auth/callback/google`
- [ ] `ADMIN_EMAILS` set to actual admin email addresses
- [ ] PostHog project created and key configured
- [ ] Supabase Storage bucket `photos` set to public
- [ ] Resend domain verified for email sending
- [ ] DNS records set (A record or CNAME for domain)
- [ ] Service worker serves correctly over HTTPS

## Razorpay Webhook Setup

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://www.biodatacraft.in/api/payments/webhook`
3. Select events: `payment.captured`, `payment.failed`, `refund.created`
4. Copy the webhook secret (verify signatures in the handler)
