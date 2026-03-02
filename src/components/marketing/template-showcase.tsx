"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight } from "lucide-react";
import { TEMPLATES } from "@/lib/templates/template-config";
import type { TemplateConfig } from "@/lib/types/biodata";

function TemplateCard({ template }: { template: TemplateConfig }) {
  const scheme = template.colorSchemes[0];
  const isPremium = template.tier === "premium";

  return (
    <Link href={`/create?template=${template.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Template preview */}
        <div
          className="relative aspect-[210/297]"
          style={{ backgroundColor: scheme.background }}
        >
          {/* Decorative biodata mockup */}
          <div className="absolute inset-0 flex flex-col items-center p-6">
            {/* Header area */}
            <div
              className="mb-3 w-full text-center py-2 rounded"
              style={{ backgroundColor: scheme.primary + "15" }}
            >
              <div
                className="mx-auto h-2.5 w-24 rounded"
                style={{ backgroundColor: scheme.primary }}
              />
              <div
                className="mx-auto mt-1.5 h-1.5 w-16 rounded"
                style={{ backgroundColor: scheme.primary + "60" }}
              />
            </div>

            {/* Photo placeholder */}
            <div
              className="mb-3 h-14 w-14 rounded-full border-2"
              style={{
                borderColor: scheme.secondary,
                backgroundColor: scheme.primary + "10",
              }}
            />

            {/* Content lines */}
            <div className="w-full space-y-2 px-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  <div
                    className="h-1.5 w-16 rounded flex-shrink-0"
                    style={{ backgroundColor: scheme.primary + "40" }}
                  />
                  <div
                    className="h-1.5 flex-1 rounded"
                    style={{
                      backgroundColor: scheme.text + "15",
                      width: `${50 + Math.random() * 50}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Premium overlay */}
          {isPremium && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="rounded-full bg-amber-500/90 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">{template.name}</h3>
              <p className="text-xs text-muted-foreground">
                {template.category}
              </p>
            </div>
            <Badge
              variant={isPremium ? "default" : "secondary"}
              className={
                isPremium
                  ? "bg-amber-500 hover:bg-amber-600 text-xs"
                  : "text-xs"
              }
            >
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>

          {/* Color options */}
          <div className="mt-2 flex gap-1">
            {template.colorSchemes.map((cs) => (
              <div
                key={cs.id}
                className="h-4 w-4 rounded-full border border-gray-200"
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
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Beautiful Templates for{" "}
            <span className="text-primary">Every Style</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From traditional to modern, regional to religion-specific.
            Find the perfect design for your biodata.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {TEMPLATES.slice(0, 8).map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/templates">
            <Button variant="outline" size="lg" className="gap-2">
              View All Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
