"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates/template-config";
import type { TemplateConfig } from "@/lib/types/biodata";
import { cn } from "@/lib/utils";

function TemplateCard({ template }: { template: TemplateConfig }) {
  const scheme = template.colorSchemes[0];
  const isPremium = template.tier === "premium";

  return (
    <Link href={`/create?template=${template.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        <div
          className="relative aspect-[210/297]"
          style={{ backgroundColor: scheme.background }}
        >
          <div className="absolute inset-0 flex flex-col items-center p-6">
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
            <div
              className="mb-3 h-14 w-14 rounded-full border-2"
              style={{
                borderColor: scheme.secondary,
                backgroundColor: scheme.primary + "10",
              }}
            />
            <div className="w-full space-y-2 px-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  <div
                    className="h-1.5 w-16 rounded flex-shrink-0"
                    style={{ backgroundColor: scheme.primary + "40" }}
                  />
                  <div
                    className="h-1.5 flex-1 rounded"
                    style={{ backgroundColor: scheme.text + "15" }}
                  />
                </div>
              ))}
            </div>
          </div>
          {isPremium && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="rounded-full bg-amber-500/90 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>
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

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

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
