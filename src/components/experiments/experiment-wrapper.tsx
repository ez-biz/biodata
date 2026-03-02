"use client";

import { type ReactNode, useEffect, useRef } from "react";
import {
  useFeatureFlag,
  trackExperimentExposure,
} from "@/lib/posthog/feature-flags";

interface ExperimentWrapperProps {
  /** PostHog feature flag name */
  flagName: string;
  /** Map of variant key -> React element to render */
  variants: Record<string, ReactNode>;
  /** Shown while the flag is loading or when no variant matches */
  fallback: ReactNode;
}

/**
 * Conditionally renders children based on a PostHog feature flag value.
 * Automatically tracks experiment exposure the first time a variant renders.
 */
export function ExperimentWrapper({
  flagName,
  variants,
  fallback,
}: ExperimentWrapperProps) {
  const variant = useFeatureFlag(flagName, "control");
  const tracked = useRef(false);

  useEffect(() => {
    if (variant && !tracked.current) {
      trackExperimentExposure(flagName, variant);
      tracked.current = true;
    }
  }, [flagName, variant]);

  const content = variants[variant];

  if (content === undefined) {
    return <>{fallback}</>;
  }

  return <>{content}</>;
}
