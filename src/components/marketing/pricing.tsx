import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    description: "Start with basic templates",
    features: [
      "5 free templates",
      "1 biodata",
      "1 photo slot",
      "150 DPI PDF",
      "BiodataCraft watermark",
    ],
    cta: "Start Free",
    href: "/create",
    popular: false,
    accent: false,
  },
  {
    name: "Per Biodata",
    price: "₹99",
    period: "one-time",
    description: "Everything for one perfect biodata",
    features: [
      "All premium templates",
      "No watermark",
      "300 DPI print-ready PDF",
      "Up to 5 photos",
      "PDF, PNG & JPG export",
      "Shareable link + QR code",
    ],
    cta: "Get Started",
    href: "/create",
    popular: true,
    accent: true,
  },
  {
    name: "Unlimited",
    price: "₹299",
    period: "/year",
    description: "Unlimited biodatas, ongoing access",
    features: [
      "Everything in Per Biodata",
      "Unlimited biodatas",
      "Priority templates",
      "Custom color schemes",
      "WhatsApp-optimized export",
      "Link view analytics",
    ],
    cta: "Go Unlimited",
    href: "/create",
    popular: false,
    accent: false,
  },
  {
    name: "Family",
    price: "₹499",
    period: "/year",
    description: "For families with multiple children",
    features: [
      "Everything in Unlimited",
      "5 family accounts",
      "Shared family auto-fill",
      "Bulk download",
      "Priority support",
    ],
    cta: "Get Family Pack",
    href: "/create",
    popular: false,
    accent: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="container px-4">
        <div className="mx-auto max-w-xl text-center mb-14">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.2em] uppercase text-gold-700 mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-maroon-900 md:text-4xl lg:text-5xl">
            Start free, upgrade{" "}
            <span className="italic text-maroon-600">when ready</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            No hidden fees. Pay only for premium features you need.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg ${
                plan.accent
                  ? "border-maroon-300 bg-gradient-to-b from-maroon-50/50 to-white shadow-md ring-1 ring-maroon-200"
                  : "border-maroon-100/60 bg-white hover:border-maroon-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-maroon-800 px-4 py-1 text-[10px] font-bold tracking-wider uppercase text-gold-200 shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="font-display text-lg font-semibold text-maroon-900">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-maroon-800">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check className="h-4 w-4 text-gold-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  className={`w-full rounded-full font-medium ${
                    plan.accent
                      ? "bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm"
                      : "bg-white border border-maroon-200 text-maroon-800 hover:bg-maroon-50"
                  }`}
                  variant={plan.accent ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
