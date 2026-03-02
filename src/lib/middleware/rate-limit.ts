import { NextRequest, NextResponse } from "next/server";

interface RateLimitOptions {
  windowMs: number;
  max: number;
  keyGenerator?: (req: NextRequest) => string;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: Date;
}

interface RateLimitEntry {
  timestamps: number[];
}

const CLEANUP_INTERVAL_MS = 60_000; // Clean up every 60 seconds

/**
 * Creates an in-memory sliding window rate limiter.
 * Returns a check function that can be called per request.
 */
export function rateLimit(options: RateLimitOptions) {
  const { windowMs, max, keyGenerator } = options;
  const store = new Map<string, RateLimitEntry>();
  let lastCleanup = Date.now();

  function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
    lastCleanup = now;
    const windowStart = now - windowMs;
    store.forEach((entry, key) => {
      // Remove timestamps outside the window
      entry.timestamps = entry.timestamps.filter((t) => t > windowStart);
      if (entry.timestamps.length === 0) {
        store.delete(key);
      }
    });
  }

  function check(req: NextRequest): RateLimitResult {
    cleanup();

    const key = keyGenerator ? keyGenerator(req) : getIp(req);
    const now = Date.now();
    const windowStart = now - windowMs;

    let entry = store.get(key);
    if (!entry) {
      entry = { timestamps: [] };
      store.set(key, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

    if (entry.timestamps.length >= max) {
      // Rate limited — find when the oldest request in the window expires
      const oldestInWindow = entry.timestamps[0];
      const resetAt = new Date(oldestInWindow + windowMs);
      return {
        success: false,
        remaining: 0,
        resetAt,
      };
    }

    // Allow the request
    entry.timestamps.push(now);
    return {
      success: true,
      remaining: max - entry.timestamps.length,
      resetAt: new Date(now + windowMs),
    };
  }

  return { check };
}

/**
 * Extract client IP from request headers.
 */
function getIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Helper: apply rate limiting to a request.
 * Returns a 429 NextResponse if rate limited, or null if the request is allowed.
 */
export function applyRateLimit(
  req: NextRequest,
  limiter: ReturnType<typeof rateLimit>
): NextResponse | null {
  const result = limiter.check(req);

  if (!result.success) {
    const retryAfterSeconds = Math.ceil(
      (result.resetAt.getTime() - Date.now()) / 1000
    );
    return NextResponse.json(
      { error: "Too many requests", retryAfter: retryAfterSeconds },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  return null;
}
