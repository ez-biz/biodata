import { PostHog } from "posthog-node";

let _posthogClient: PostHog | null = null;

/**
 * Lazy-initialised PostHog Node client (same pattern as Razorpay/Resend).
 */
function getPostHogClient(): PostHog | null {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) return null;

  if (!_posthogClient) {
    _posthogClient = new PostHog(apiKey, { host });
  }

  return _posthogClient;
}

/**
 * Evaluate a feature flag on the server side.
 * Works in server components, API routes, and middleware.
 *
 * Returns the variant key string, boolean, or `undefined` if PostHog is
 * unavailable.
 */
export async function getServerFeatureFlag(
  distinctId: string,
  flagName: string
): Promise<string | boolean | undefined> {
  const client = getPostHogClient();
  if (!client) return undefined;

  try {
    const value = await client.getFeatureFlag(flagName, distinctId);
    return value ?? undefined;
  } catch {
    // Silently fall back – experiments should never break the page
    return undefined;
  }
}

/**
 * Evaluate a flag and return its JSON payload (if any).
 */
export async function getServerFeatureFlagPayload(
  distinctId: string,
  flagName: string
): Promise<unknown> {
  const client = getPostHogClient();
  if (!client) return undefined;

  try {
    return await client.getFeatureFlagPayload(flagName, distinctId);
  } catch {
    return undefined;
  }
}

/**
 * Shut down the client cleanly (e.g. in a graceful-shutdown handler).
 * Flushes any queued events before closing.
 */
export async function shutdownPostHog(): Promise<void> {
  if (_posthogClient) {
    await _posthogClient.shutdown();
    _posthogClient = null;
  }
}
