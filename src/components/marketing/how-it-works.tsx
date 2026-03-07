"use client";

import { FileText, Palette, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useI18n();

  const STEPS = [
    {
      icon: Palette,
      number: "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      icon: FileText,
      number: "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      icon: Download,
      number: "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ];
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative">
      {/* Subtle top ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-gold-300/40" />

      <div className="container px-4">
        <div className="mx-auto max-w-xl text-center mb-16">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.2em] uppercase text-gold-700 mb-4">
            {t.howItWorks.eyebrow}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-maroon-900 md:text-4xl lg:text-5xl">
            {t.howItWorks.heading}
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative group">
                {/* Connector line (desktop) */}
                {index < STEPS.length - 1 && (
                  <div className="absolute top-12 left-[65%] hidden h-px w-[70%] bg-gradient-to-r from-gold-300/50 to-transparent md:block" />
                )}

                {/* Number + Icon */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-display text-4xl font-bold text-maroon-100 group-hover:text-maroon-200 transition-colors select-none">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-50 text-maroon-700 group-hover:bg-maroon-100 transition-colors">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-maroon-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
