"use client";

import {
  useFeatureFlagVariantKey,
  useFeatureFlagPayload as usePHFlagPayload,
} from "posthog-js/react";
import posthog from "posthog-js";

// ---------------------------------------------------------------------------
// Flag name constants (type-safe)
// ---------------------------------------------------------------------------

export const PRICING_PAGE_VARIANT = "pricing-page-variant" as const;
export const CTA_COPY_VARIANT = "cta-copy-variant" as const;
export const TEMPLATE_ORDER_VARIANT = "template-order-variant" as const;
export const ONBOARDING_FLOW = "onboarding-flow" as const;

// Variant type unions
export type PricingPageVariant = "control" | "discounted" | "annual";
export type CtaCopyVariant = "control" | "urgency" | "social-proof";
export type TemplateOrderVariant = "control" | "popular-first" | "new-first";
export type OnboardingFlowVariant = "control" | "simplified";

// Map flag names to their variant types (for documentation / DX)
export interface FeatureFlagMap {
  [PRICING_PAGE_VARIANT]: PricingPageVariant;
  [CTA_COPY_VARIANT]: CtaCopyVariant;
  [TEMPLATE_ORDER_VARIANT]: TemplateOrderVariant;
  [ONBOARDING_FLOW]: OnboardingFlowVariant;
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Returns the current variant key for a given feature flag.
 * Falls back to `defaultValue` when the flag is still loading or unavailable.
 */
export function useFeatureFlag<T extends string>(
  flagName: string,
  defaultValue: T
): T {
  const variant = useFeatureFlagVariantKey(flagName);

  if (variant === undefined || variant === false) {
    return defaultValue;
  }

  // PostHog returns `true` for simple boolean flags – treat as default
  if (variant === true) {
    return defaultValue;
  }

  return variant as T;
}

/**
 * Returns the JSON payload attached to a feature flag (if any).
 */
export function useFeatureFlagPayload(flagName: string) {
  return usePHFlagPayload(flagName);
}

// ---------------------------------------------------------------------------
// Tracking helper
// ---------------------------------------------------------------------------

/**
 * Fires the `$experiment_started` event so PostHog can attribute conversions
 * to the correct experiment variant.
 */
export function trackExperimentExposure(flagName: string, variant: string) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture("$experiment_started", {
      $feature_flag: flagName,
      $feature_flag_response: variant,
    });
  }
}
