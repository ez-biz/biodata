"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { HeroCta } from "@/components/marketing/hero-cta";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-paisley">
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gold-50/30 to-maroon-50/20" />

      {/* Decorative gold arcs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04]">
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <circle cx="400" cy="100" r="200" stroke="currentColor" strokeWidth="1" className="text-gold-600" />
          <circle cx="400" cy="100" r="160" stroke="currentColor" strokeWidth="0.5" className="text-gold-600" />
          <circle cx="400" cy="100" r="120" stroke="currentColor" strokeWidth="0.5" className="text-maroon-600" />
        </svg>
      </div>

      <div className="container relative px-4 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
        {/* Ornamental top text */}
        <div className="animate-fade-up text-center mb-6">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.25em] uppercase text-gold-700">
            {t.hero.badge}
          </span>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-up delay-1 font-display text-4xl font-bold tracking-tight text-maroon-900 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            {t.hero.titlePart1}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{t.hero.titleHighlight}</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gold-200/60 -rotate-1 rounded-sm" />
            </span>
          </h1>

          <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg text-foreground/60 md:text-xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="animate-fade-up delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HeroCta />
            <Link href="/templates">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-base px-8 py-6 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 hover:border-maroon-300 transition-all duration-300"
              >
                <Palette className="h-4 w-4" />
                {t.nav.browseTemplates}
              </Button>
            </Link>
          </div>

          <p className="animate-fade-up delay-4 mt-5 text-sm text-muted-foreground">
            {t.hero.noSignup}
          </p>
        </div>

        {/* Stats with ornamental style */}
        <div className="animate-fade-up delay-5 mx-auto mt-20 max-w-3xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "50,000+", label: t.hero.statFamilies },
              { value: "14", label: t.hero.statTemplates },
              { value: "10+", label: t.hero.statLanguages },
              { value: "4.8", label: t.hero.statRating, suffix: "★" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="font-display text-2xl font-bold text-maroon-800 md:text-3xl transition-colors group-hover:text-maroon-600">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-gold-500 ml-0.5">{stat.suffix}</span>
                  )}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template preview cards — asymmetric floating layout */}
        <div className="animate-fade-up delay-6 mx-auto mt-16 max-w-5xl">
          <div className="relative rounded-2xl bg-white/60 backdrop-blur-sm p-3 shadow-2xl shadow-maroon-900/10 ring-1 ring-maroon-100/50">
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: "Traditional Classic", slug: "traditional-classic", offset: "mt-0" },
                { title: "Modern Minimal", slug: "modern-minimal", offset: "-mt-3 md:-mt-6" },
                { title: "Elegant Royal", slug: "elegant-royal", offset: "mt-0" },
              ].map((template) => (
                <div
                  key={template.title}
                  className={`${template.offset} transition-transform duration-500 hover:-translate-y-2`}
                >
                  <div className="relative aspect-[210/297] overflow-hidden rounded-xl bg-white shadow-sm">
                    <img
                      src={`/templates/${template.slug}.png`}
                      alt={`${template.title} template preview`}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Tag */}
                    <div className="absolute top-2 right-2 z-10">
                      <span className="rounded-full bg-gold-500/90 px-2 py-0.5 text-[10px] font-bold text-white tracking-wider shadow-sm">
                        FREE
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xs font-medium text-muted-foreground hidden md:block">
                    {template.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
