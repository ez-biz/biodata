import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    description: "Get started with basic templates",
    features: [
      "5 basic templates",
      "1 biodata",
      "1 photo",
      "150 DPI PDF download",
      "Watermark on PDF",
    ],
    cta: "Start Free",
    href: "/create",
    popular: false,
  },
  {
    name: "Per Biodata",
    price: "₹99",
    period: "one-time",
    description: "Everything you need for one perfect biodata",
    features: [
      "All premium templates",
      "No watermark",
      "300 DPI print-ready PDF",
      "Up to 5 photos",
      "PDF, PNG & JPG download",
      "Shareable link with QR code",
    ],
    cta: "Get Started",
    href: "/create",
    popular: true,
  },
  {
    name: "Unlimited",
    price: "₹299",
    period: "/year",
    description: "For multiple biodatas & ongoing access",
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
  },
  {
    name: "Family Pack",
    price: "₹499",
    period: "/year",
    description: "Perfect for families with multiple children",
    features: [
      "Everything in Unlimited",
      "5 linked family accounts",
      "Shared family auto-fill",
      "Bulk download",
      "Priority support",
    ],
    cta: "Get Family Pack",
    href: "/create",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Transparent{" "}
            <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start for free. Pay only when you need premium features.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary"
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
