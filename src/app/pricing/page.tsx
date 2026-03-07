"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import { Button } from "@/components/ui/button";
import { PLANS, PlanId } from "@/lib/razorpay";
import { useRazorpay } from "@/lib/hooks/use-razorpay";
import { Check, Crown, Loader2, Sparkles } from "lucide-react";
import {
  JsonLd,
  pricingProductJsonLd,
  breadcrumbJsonLd,
} from "@/components/seo/json-ld";
import {
  useFeatureFlag,
  trackExperimentExposure,
  PRICING_PAGE_VARIANT,
  type PricingPageVariant,
} from "@/lib/posthog/feature-flags";
import { useI18n } from "@/lib/i18n";

const FREE_FEATURES = [
  "3 free templates",
  "Basic PDF download",
  "Watermarked output",
  "1 biodata",
];

function DiscountBadge() {
  return (
    <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800 uppercase tracking-wider">
      Limited Offer
    </span>
  );
}

function applyDiscount(price: number): number {
  return Math.round(price * 0.8);
}

export default function PricingPage() {
  const { t } = useI18n();
  const { status } = useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );
  const pricingVariant = useFeatureFlag<PricingPageVariant>(
    PRICING_PAGE_VARIANT,
    "control"
  );

  // Track experiment exposure
  useEffect(() => {
    if (pricingVariant) {
      trackExperimentExposure(PRICING_PAGE_VARIANT, pricingVariant);
    }
  }, [pricingVariant]);

  const { initiatePayment } = useRazorpay({
    onSuccess: () => {
      setLoadingPlan(null);
      router.push("/dashboard");
    },
    onFailure: () => {
      setLoadingPlan(null);
    },
  });

  const handleBuy = (planId: PlanId) => {
    if (status !== "authenticated") {
      router.push("/login?redirect=/pricing");
      return;
    }
    setLoadingPlan(planId);
    initiatePayment(planId);
  };

  const premiumPrice = PLANS.PREMIUM.amount / 100;
  const unlimitedPrice = PLANS.UNLIMITED.amount / 100;
  const familyPrice = PLANS.FAMILY.amount / 100;

  const plans = [
    {
      id: "FREE" as const,
      name: "Free",
      price: 0,
      originalPrice: 0,
      features: FREE_FEATURES,
      cta: "Get Started",
      popular: false,
    },
    {
      id: "PREMIUM" as PlanId,
      name: PLANS.PREMIUM.name,
      price:
        pricingVariant === "discounted"
          ? applyDiscount(premiumPrice)
          : premiumPrice,
      originalPrice: pricingVariant === "discounted" ? premiumPrice : 0,
      features: PLANS.PREMIUM.features,
      cta: "Buy Premium",
      popular: false,
    },
    {
      id: "UNLIMITED" as PlanId,
      name: PLANS.UNLIMITED.name,
      price:
        pricingVariant === "discounted"
          ? applyDiscount(unlimitedPrice)
          : unlimitedPrice,
      originalPrice: pricingVariant === "discounted" ? unlimitedPrice : 0,
      features: PLANS.UNLIMITED.features,
      cta: "Buy Unlimited",
      popular: true,
    },
    {
      id: "FAMILY" as PlanId,
      name: PLANS.FAMILY.name,
      price:
        pricingVariant === "discounted"
          ? applyDiscount(familyPrice)
          : familyPrice,
      originalPrice: pricingVariant === "discounted" ? familyPrice : 0,
      features: PLANS.FAMILY.features,
      cta: "Buy Family Pack",
      popular: false,
    },
  ];

  // For the "annual" variant, compute monthly-equivalent prices
  const annualDiscount = 0.3; // 30% off for annual
  function monthlyEquivalent(oneTimePrice: number) {
    return Math.round(oneTimePrice / 12);
  }
  function annualTotal(oneTimePrice: number) {
    return Math.round(oneTimePrice * (1 - annualDiscount));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <JsonLd data={pricingProductJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Pricing", url: "/pricing" },
        ])}
      />
      <Navbar />

      <div className="container px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.25em] uppercase text-gold-700 mb-4">
            Simple Pricing
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-maroon-900 mb-3">
            {t.pricing.title}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t.pricing.subtitle}
          </p>

          {/* Annual toggle — only shown for the "annual" variant */}
          {pricingVariant === "annual" && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-maroon-200 bg-white px-4 py-2 shadow-sm">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-maroon-800 text-gold-100"
                    : "text-muted-foreground hover:text-maroon-800"
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  billingCycle === "annual"
                    ? "bg-maroon-800 text-gold-100"
                    : "text-muted-foreground hover:text-maroon-800"
                }`}
              >
                Annual
                <span className="ml-1 text-[10px] font-bold text-green-600">
                  -30%
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const showAnnualPrice =
              pricingVariant === "annual" &&
              billingCycle === "annual" &&
              plan.price > 0;
            const displayPrice = showAnnualPrice
              ? annualTotal(plan.price)
              : plan.price;
            const perMonthPrice = showAnnualPrice
              ? monthlyEquivalent(annualTotal(plan.price))
              : null;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg ${
                  plan.popular
                    ? "border-maroon-300 shadow-md ring-1 ring-maroon-200"
                    : "border-maroon-100/50 hover:border-maroon-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1 bg-maroon-800 text-gold-200 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                      <Sparkles className="h-3 w-3" />
                      {t.pricing.mostPopular}
                    </span>
                  </div>
                )}

                <div className="text-center mb-5">
                  <h3 className="font-display font-bold text-maroon-900 mb-1">
                    {plan.name}
                    {pricingVariant === "discounted" &&
                      plan.originalPrice > 0 && <DiscountBadge />}
                  </h3>
                  <div className="font-display text-3xl font-bold text-maroon-800">
                    {plan.price === 0 ? (
                      t.common.free
                    ) : (
                      <>
                        {pricingVariant === "discounted" &&
                          plan.originalPrice > 0 && (
                            <span className="text-lg font-normal text-muted-foreground line-through mr-2">
                              &#8377;{plan.originalPrice}
                            </span>
                          )}
                        &#8377;{displayPrice}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {showAnnualPrice ? "/year" : t.pricing.oneTime}
                        </span>
                      </>
                    )}
                  </div>
                  {perMonthPrice !== null && (
                    <p className="text-xs text-muted-foreground mt-1">
                      &#8377;{perMonthPrice}/month
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-gold-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.id === "FREE" ? (
                  <Button
                    onClick={() => router.push("/create")}
                    variant="outline"
                    className="w-full rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBuy(plan.id as PlanId)}
                    disabled={loadingPlan === plan.id}
                    className={`w-full rounded-full gap-2 ${
                      plan.popular
                        ? "bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm"
                        : "bg-maroon-800 hover:bg-maroon-700 text-gold-100"
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Crown className="h-4 w-4" />
                    )}
                    {plan.cta}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ-style reassurance */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            {t.pricing.allPlansNote}{" "}
            <a
              href="mailto:support@biodatacraft.in"
              className="text-maroon-700 underline"
            >
              {t.pricing.contactUs}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
