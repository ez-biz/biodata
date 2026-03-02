"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useFeatureFlag,
  trackExperimentExposure,
  CTA_COPY_VARIANT,
  type CtaCopyVariant,
} from "@/lib/posthog/feature-flags";

const CTA_COPIES: Record<CtaCopyVariant, string> = {
  control: "Create Your Biodata \u2014 Free",
  urgency: "Create Now \u2014 Limited Free Templates",
  "social-proof": "Join 50,000+ Families \u2014 Create Free",
};

export function HeroCta() {
  const variant = useFeatureFlag<CtaCopyVariant>(CTA_COPY_VARIANT, "control");
  const tracked = useRef(false);

  useEffect(() => {
    if (variant && !tracked.current) {
      trackExperimentExposure(CTA_COPY_VARIANT, variant);
      tracked.current = true;
    }
  }, [variant]);

  const ctaText = CTA_COPIES[variant] ?? CTA_COPIES.control;

  return (
    <Link href="/create">
      <Button
        size="lg"
        className="gap-2.5 text-base px-8 py-6 bg-maroon-800 hover:bg-maroon-700 text-gold-100 rounded-full shadow-lg shadow-maroon-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-maroon-900/30 hover:-translate-y-0.5"
      >
        {ctaText}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Link>
  );
}
