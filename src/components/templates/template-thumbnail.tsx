"use client";

import { getTemplateById } from "@/lib/templates/template-config";
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

interface TemplateThumbnailProps {
  templateId: string;
  colorSchemeId?: string;
  /** Width of the thumbnail container in pixels. Default 280. */
  width?: number;
  className?: string;
}

/**
 * Renders an actual template component scaled down into a thumbnail.
 * The inner template renders at a full A4-equivalent size (595px wide)
 * and is CSS-scaled down to fit the thumbnail container.
 *
 * IMPORTANT: This component reads biodata data from the zustand store.
 * For the templates listing page, set sample data in the store before
 * rendering thumbnails. For the editor, the store already has user data.
 */
export function TemplateThumbnail({
  templateId,
  colorSchemeId = "default",
  width = 280,
  className = "",
}: TemplateThumbnailProps) {
  const TemplateComponent = TEMPLATE_COMPONENTS[templateId];
  const template = getTemplateById(templateId);

  // A4 at 72dpi is ~595x842. We render at this size and scale down.
  const innerWidth = 595;
  const innerHeight = 842;
  const scale = width / innerWidth;
  const height = innerHeight * scale;

  if (!TemplateComponent || !template) {
    return (
      <div
        className={`bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 ${className}`}
        style={{ width, height }}
      >
        Template not found
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg shadow-md ${className}`}
      style={{
        width,
        height,
      }}
    >
      <div
        style={{
          width: innerWidth,
          height: innerHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        <TemplateComponent colorSchemeId={colorSchemeId} />
      </div>
    </div>
  );
}
