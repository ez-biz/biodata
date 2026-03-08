# API Reference

All API routes are in `src/app/api/`. They use Next.js Route Handlers and return JSON responses.

## Authentication

Most endpoints require authentication via NextAuth JWT session. Unauthenticated requests return `401 Unauthorized`.

Rate limiting is applied to sensitive endpoints. Exceeding the limit returns `429 Too Many Requests` with `Retry-After` header.

---

## Auth Endpoints

### POST /api/auth/signup
Create a new user account.

**Rate Limit:** 5 requests / 15 minutes

**Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "user": { "id": "clx...", "name": "Priya Sharma", "email": "priya@example.com" }
}
```

**Errors:** `400` (validation), `409` (email exists)

---

### POST /api/auth/[...nextauth]
NextAuth credential login and OAuth callbacks.

**Rate Limit:** 10 requests / 15 minutes (POST only)

Handled by NextAuth. See [NextAuth docs](https://next-auth.js.org/) for details.

---

## Biodata Endpoints

### GET /api/biodata
List all biodatas for the authenticated user.

**Auth:** Required

**Response (200):**
```json
[
  {
    "id": "clx...",
    "templateId": "traditional-classic",
    "colorScheme": "default",
    "status": "DRAFT",
    "data": { ... },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### POST /api/biodata
Create a new biodata.

**Auth:** Required

**Body:**
```json
{
  "templateId": "traditional-classic",
  "colorScheme": "default",
  "data": { "fullName": "Priya Sharma", ... }
}
```

**Response (201):**
```json
{
  "id": "clx...",
  "templateId": "traditional-classic",
  "data": { ... }
}
```

---

### GET /api/biodata/[id]
Get a specific biodata by ID.

**Auth:** Required (must own the biodata)

---

### PUT /api/biodata/[id]
Update a biodata.

**Auth:** Required (must own the biodata)

**Body:**
```json
{
  "templateId": "modern-minimal",
  "colorScheme": "blue",
  "data": { "fullName": "Priya Sharma", ... }
}
```

---

### DELETE /api/biodata/[id]
Delete a biodata.

**Auth:** Required (must own the biodata)

---

### POST /api/biodata/[id]/share
Generate or update share link for a biodata.

**Auth:** Required (must own the biodata)

**Body:**
```json
{
  "password": "optional-password",
  "expiresInDays": 30
}
```

**Response (200):**
```json
{
  "shareSlug": "abc123xyz",
  "shareUrl": "https://biodatacraft.in/share/abc123xyz"
}
```

---

### GET /api/biodata/[id]/analytics
Get view analytics for a specific biodata.

**Auth:** Required (must own the biodata)

**Response (200):**
```json
{
  "totalViews": 42,
  "views": [
    { "viewedAt": "2024-01-15T10:30:00Z", "viewerDevice": "Mobile", "viewerCity": "Mumbai" }
  ]
}
```

---

### GET /api/biodata/analytics
Get aggregated analytics for all of the user's biodatas.

**Auth:** Required

---

### POST /api/biodata/generate-aboutme
Generate an AI-powered "About Me" section.

**Auth:** Required
**Rate Limit:** 10 requests / 1 hour

**Body:**
```json
{
  "data": { "fullName": "Priya Sharma", "occupation": "Software Engineer", ... },
  "tone": "formal",
  "length": "medium"
}
```

`tone`: `"formal"` | `"casual"` | `"poetic"`
`length`: `"short"` | `"medium"` | `"long"`

**Response (200):**
```json
{
  "aboutMe": "Priya is a dedicated software engineer..."
}
```

---

## Share Endpoints

### POST /api/share/[slug]
Access a publicly shared biodata. Tracks view analytics.

**Rate Limit:** 30 requests / 1 minute

**Body (if password-protected):**
```json
{
  "password": "the-password"
}
```

**Response (200):**
```json
{
  "data": { "fullName": "Priya Sharma", ... },
  "templateId": "traditional-classic",
  "colorScheme": "default"
}
```

**Errors:**
- `401` `{ "needsPassword": true }` — Password required
- `401` `{ "wrongPassword": true }` — Incorrect password
- `403` `{ "expired": true }` — Link has expired
- `404` — Slug not found

---

## Photo Endpoints

### POST /api/photos/upload-url
Upload a photo to Supabase Storage via server-side proxy.

**Auth:** Required
**Rate Limit:** 20 requests / 15 minutes
**Content-Type:** multipart/form-data

**FormData fields:**
- `file` — Image blob (JPEG/PNG/WebP, max 5MB)
- `biodataId` — Biodata ID
- `type` — `profile` or `additional`
- `index` — Photo index (e.g., `0`)

**Response (200):**
```json
{
  "url": "https://xxx.supabase.co/storage/v1/object/public/photos/...",
  "storagePath": "user-id/biodata-id/profile-0-abc.jpg"
}
```

---

### POST /api/photos
Save photo metadata after successful upload.

**Auth:** Required

---

## Payment Endpoints

### POST /api/payments/create-order
Create a Razorpay order for plan upgrade.

**Auth:** Required
**Rate Limit:** 10 requests / 15 minutes

**Body:**
```json
{
  "plan": "PREMIUM",
  "biodataId": "clx..."
}
```

**Response (200):**
```json
{
  "orderId": "order_abc123",
  "amount": 19900,
  "currency": "INR",
  "key": "rzp_live_xxx"
}
```

---

### POST /api/payments/verify
Verify Razorpay payment signature and activate plan.

**Auth:** Required

**Body:**
```json
{
  "razorpay_order_id": "order_abc123",
  "razorpay_payment_id": "pay_xyz789",
  "razorpay_signature": "hmac_signature_here"
}
```

**Response (200):**
```json
{
  "success": true,
  "plan": "PREMIUM"
}
```

---

### POST /api/payments/webhook
Razorpay webhook handler for async payment events.

**Auth:** Razorpay webhook signature verification

Handles events: `payment.captured`, `payment.failed`, `refund.created`

---

## Admin Endpoints

All admin endpoints require the authenticated user's email to be listed in the `ADMIN_EMAILS` environment variable.

### GET /api/admin/stats
Dashboard statistics (total users, biodatas, payments, revenue).

### GET /api/admin/users
List all users with pagination.

### GET /api/admin/payments
List all payments with pagination.

### GET/POST/PUT/DELETE /api/admin/promo
CRUD operations for promo codes.

---

## Rate Limit Response Format

When rate limited, all endpoints return:

**Status:** `429 Too Many Requests`

**Headers:**
```
Retry-After: 45
X-RateLimit-Remaining: 0
```

**Body:**
```json
{
  "error": "Too many requests",
  "retryAfter": 45
}
```
