"use client";

import { useEffect, useState } from "react";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { TEMPLATES } from "@/lib/templates/template-config";
import { TraditionalClassicTemplate } from "@/components/templates/traditional-classic";
import { ModernMinimalTemplate } from "@/components/templates/modern-minimal";
import { ElegantRoyalTemplate } from "@/components/templates/elegant-royal";
import { PhotoForwardTemplate } from "@/components/templates/photo-forward";
import { GujaratiTraditionalTemplate } from "@/components/templates/gujarati-traditional";
import { MuslimElegantTemplate } from "@/components/templates/muslim-elegant";
import { SikhAnandTemplate } from "@/components/templates/sikh-anand";
import { NriProfessionalTemplate } from "@/components/templates/nri-professional";
import { SouthIndianClassicTemplate } from "@/components/templates/south-indian-classic";
import { BengaliEleganceTemplate } from "@/components/templates/bengali-elegance";
import { RajasthaniRoyalTemplate } from "@/components/templates/rajasthani-royal";
import { MinimalistCardTemplate } from "@/components/templates/minimalist-card";
import { FloralGardenTemplate } from "@/components/templates/floral-garden";
import { ChristianGraceTemplate } from "@/components/templates/christian-grace";
import { SAMPLE_BIODATA } from "@/lib/templates/sample-data";

const TEMPLATE_COMPONENTS: Record<
  string,
  React.ComponentType<{ colorSchemeId: string }>
> = {
  "traditional-classic": TraditionalClassicTemplate,
  "modern-minimal": ModernMinimalTemplate,
  "elegant-royal": ElegantRoyalTemplate,
  "photo-forward": PhotoForwardTemplate,
  "gujarati-traditional": GujaratiTraditionalTemplate,
  "muslim-elegant": MuslimElegantTemplate,
  "sikh-anand": SikhAnandTemplate,
  "nri-professional": NriProfessionalTemplate,
  "south-indian-classic": SouthIndianClassicTemplate,
  "bengali-elegance": BengaliEleganceTemplate,
  "rajasthani-royal": RajasthaniRoyalTemplate,
  "minimalist-card": MinimalistCardTemplate,
  "floral-garden": FloralGardenTemplate,
  "christian-grace": ChristianGraceTemplate,
};

export default function ThumbnailsPage() {
  const [ready, setReady] = useState(false);
  const setFormData = useBiodataStore((s) => s.setFormData);

  useEffect(() => {
    // Populate store with sample data
    setFormData(SAMPLE_BIODATA);
    // Give store time to propagate
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, [setFormData]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading templates...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 40,
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        gap: 60,
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>
        Template Thumbnails ({TEMPLATES.length})
      </h1>
      <p id="thumbnails-ready" style={{ display: "none" }}>
        ready
      </p>

      {TEMPLATES.map((template) => {
        const Component = TEMPLATE_COMPONENTS[template.id];
        if (!Component) return null;

        return (
          <div
            key={template.id}
            data-template-id={template.id}
            style={{
              width: 794,
              height: 1123,
              overflow: "hidden",
              background: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              flexShrink: 0,
            }}
          >
            <Component colorSchemeId="default" />
          </div>
        );
      })}
    </div>
  );
}
