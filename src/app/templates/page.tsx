"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates/template-config";
import { SAMPLE_BIODATA } from "@/lib/templates/sample-data";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import type { TemplateConfig } from "@/lib/types/biodata";
import { cn } from "@/lib/utils";
import { JsonLd, templateItemListJsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  useFeatureFlag,
  trackExperimentExposure,
  TEMPLATE_ORDER_VARIANT,
  type TemplateOrderVariant,
} from "@/lib/posthog/feature-flags";

function TemplateCard({ template }: { template: TemplateConfig }) {
  const [activeScheme, setActiveScheme] = useState(
    template.colorSchemes[0]?.id || "default"
  );
  const isPremium = template.tier === "premium";

  return (
    <div className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Thumbnail preview */}
        <div className="relative">
          <TemplateThumbnail
            templateId={template.id}
            colorSchemeId={activeScheme}
            width={280}
            className="w-full rounded-none rounded-t-xl"
          />
          {isPremium && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="rounded-full bg-amber-500/90 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">{template.name}</h3>
              <p className="text-xs text-muted-foreground">{template.category}</p>
            </div>
            <Badge
              variant={isPremium ? "default" : "secondary"}
              className={isPremium ? "bg-amber-500 hover:bg-amber-600 text-xs" : "text-xs"}
            >
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>

          {/* Color scheme dots */}
          {template.colorSchemes.length > 1 && (
            <div className="mt-2 flex gap-1.5">
              {template.colorSchemes.map((cs) => (
                <button
                  key={cs.id}
                  className={cn(
                    "h-5 w-5 rounded-full border-2 transition-all",
                    activeScheme === cs.id
                      ? "border-gray-800 scale-110"
                      : "border-gray-200 hover:border-gray-400"
                  )}
                  style={{ backgroundColor: cs.primary }}
                  title={cs.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveScheme(cs.id);
                  }}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <Link href={`/create?template=${template.id}`} className="block mt-3">
            <Button
              size="sm"
              className="w-full rounded-full text-xs bg-maroon-800 hover:bg-maroon-700 text-gold-100"
            >
              Use This Template
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function sortTemplates(
  templates: TemplateConfig[],
  variant: TemplateOrderVariant
): TemplateConfig[] {
  if (variant === "popular-first") {
    return [...templates].sort(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
    );
  }
  if (variant === "new-first") {
    return [...templates].sort((a, b) => {
      if (a.isNew === b.isNew) return 0;
      return a.isNew ? -1 : 1;
    });
  }
  return templates;
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hydrated, setHydrated] = useState(false);
  const setFormData = useBiodataStore((s) => s.setFormData);
  const orderVariant = useFeatureFlag<TemplateOrderVariant>(
    TEMPLATE_ORDER_VARIANT,
    "control"
  );

  // Track experiment exposure
  useEffect(() => {
    if (orderVariant) {
      trackExperimentExposure(TEMPLATE_ORDER_VARIANT, orderVariant);
    }
  }, [orderVariant]);

  // Inject sample data into the store so thumbnails render with realistic content
  useEffect(() => {
    const store = useBiodataStore.getState();
    const savedData = { ...store.formData };
    setFormData(SAMPLE_BIODATA);
    setHydrated(true);

    return () => {
      // Restore previous data when leaving the page
      setFormData(savedData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const base =
      activeCategory === "All"
        ? TEMPLATES
        : TEMPLATES.filter((t) => t.category === activeCategory);
    return sortTemplates(base, orderVariant);
  }, [activeCategory, orderVariant]);

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={templateItemListJsonLd(TEMPLATES)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Templates", url: "/templates" },
        ])}
      />
      <Navbar />

      <main className="flex-1">
        <div className="container px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold md:text-4xl">
              Biodata Templates
            </h1>
            <p className="mt-2 text-muted-foreground">
              Choose from our collection of beautifully designed templates
            </p>
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full",
                  activeCategory === cat && "shadow-sm"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Grid */}
          {hydrated ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
              {filtered.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
              {filtered.map((template) => (
                <div
                  key={template.id}
                  className="aspect-[210/297] bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No templates found in this category.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
