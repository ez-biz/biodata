/**
 * Runtime environment variable validation.
 * Import this in instrumentation.ts or layout.tsx to fail fast on missing vars.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Check your .env file.`
    );
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export function validateEnv() {
  // Core — always required
  required("DATABASE_URL");
  required("NEXTAUTH_SECRET");
  required("NEXTAUTH_URL");

  // Log warnings for optional-but-important vars
  const warnings: string[] = [];

  if (!optional("GOOGLE_CLIENT_ID") || !optional("GOOGLE_CLIENT_SECRET")) {
    warnings.push("Google OAuth not configured — social login disabled");
  }

  if (!optional("RAZORPAY_KEY_ID") || !optional("RAZORPAY_KEY_SECRET")) {
    warnings.push("Razorpay not configured — payments disabled");
  }

  if (!optional("S3_ACCESS_KEY") || !optional("S3_SECRET_KEY")) {
    warnings.push("S3/R2 not configured — photo uploads disabled");
  }

  if (!optional("NEXT_PUBLIC_SENTRY_DSN")) {
    warnings.push("Sentry DSN not set — error tracking disabled");
  }

  if (!optional("NEXT_PUBLIC_POSTHOG_KEY")) {
    warnings.push("PostHog not configured — analytics disabled");
  }

  if (warnings.length > 0) {
    console.warn(
      `[env] ${warnings.length} optional service(s) not configured:\n` +
        warnings.map((w) => `  - ${w}`).join("\n")
    );
  }
}
