"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates/template-config";
import type { TemplateConfig } from "@/lib/types/biodata";
import { useI18n } from "@/lib/i18n";

function TemplateCard({ template }: { template: TemplateConfig }) {
  const { t } = useI18n();
  const isPremium = template.tier === "premium";

  return (
    <Link href={`/create?template=${template.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-maroon-100/50 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-maroon-900/10 hover:-translate-y-1.5">
        {/* Template preview */}
        <div className="relative aspect-[210/297] overflow-hidden bg-white">
          <img
            src={`/templates/${template.slug}.png`}
            alt={`${template.name} template preview`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />

          {/* Premium lock */}
          {isPremium && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/10 to-transparent">
              <div className="rounded-full bg-gold-500 p-2 shadow-lg shadow-gold-600/30">
                <Lock className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="p-3 border-t border-maroon-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-maroon-900 group-hover:text-maroon-700 transition-colors">
                {template.name}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {template.category}
              </p>
            </div>
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                isPremium
                  ? "bg-gold-100 text-gold-800"
                  : "bg-maroon-50 text-maroon-600"
              }`}
            >
              {isPremium ? t.common.premium : t.common.free}
            </span>
          </div>

          {/* Color swatches */}
          <div className="mt-2 flex gap-1.5">
            {template.colorSchemes.map((cs) => (
              <div
                key={cs.id}
                className="h-4 w-4 rounded-full ring-1 ring-black/5 transition-transform hover:scale-125"
                style={{ backgroundColor: cs.primary }}
                title={cs.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function TemplateShowcase() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gold-50/20 to-white relative bg-paisley">
      <div className="container px-4">
        <div className="mx-auto max-w-xl text-center mb-14">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.2em] uppercase text-gold-700 mb-4">
            {t.templateShowcase.eyebrow}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-maroon-900 md:text-4xl lg:text-5xl">
            {t.templateShowcase.heading}{" "}
            <span className="italic text-maroon-600">{t.templateShowcase.headingHighlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t.templateShowcase.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
          {TEMPLATES.slice(0, 8).map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/templates">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 px-8"
            >
              {t.templateShowcase.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
