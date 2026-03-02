"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import { Button } from "@/components/ui/button";
import { PLANS, PlanId } from "@/lib/razorpay";
import { useRazorpay } from "@/lib/hooks/use-razorpay";
import { Check, Crown, Loader2, Sparkles } from "lucide-react";

const FREE_FEATURES = [
  "3 free templates",
  "Basic PDF download",
  "Watermarked output",
  "1 biodata",
];

export default function PricingPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

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

  const plans = [
    {
      id: "FREE" as const,
      name: "Free",
      price: 0,
      features: FREE_FEATURES,
      cta: "Get Started",
      popular: false,
    },
    {
      id: "PREMIUM" as PlanId,
      name: PLANS.PREMIUM.name,
      price: PLANS.PREMIUM.amount / 100,
      features: PLANS.PREMIUM.features,
      cta: "Buy Premium",
      popular: false,
    },
    {
      id: "UNLIMITED" as PlanId,
      name: PLANS.UNLIMITED.name,
      price: PLANS.UNLIMITED.amount / 100,
      features: PLANS.UNLIMITED.features,
      cta: "Buy Unlimited",
      popular: true,
    },
    {
      id: "FAMILY" as PlanId,
      name: PLANS.FAMILY.name,
      price: PLANS.FAMILY.amount / 100,
      features: PLANS.FAMILY.features,
      cta: "Buy Family Pack",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <Navbar />

      <div className="container px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.25em] uppercase text-gold-700 mb-4">
            Simple Pricing
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-maroon-900 mb-3">
            Choose Your Perfect Plan
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Start free, upgrade when you need premium templates, watermark
            removal, and high-resolution downloads.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {plans.map((plan) => (
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
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-5">
                <h3 className="font-display font-bold text-maroon-900 mb-1">
                  {plan.name}
                </h3>
                <div className="font-display text-3xl font-bold text-maroon-800">
                  {plan.price === 0 ? (
                    "Free"
                  ) : (
                    <>
                      ₹{plan.price}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        one-time
                      </span>
                    </>
                  )}
                </div>
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
          ))}
        </div>

        {/* FAQ-style reassurance */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans are one-time payments — no subscriptions. Your purchase
            is valid for 1 year. Need help?{" "}
            <a
              href="mailto:support@biodatacraft.in"
              className="text-maroon-700 underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
