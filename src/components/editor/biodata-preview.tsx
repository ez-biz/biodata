"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { getTemplateById, TEMPLATES, getFreeTemplates } from "@/lib/templates/template-config";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
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
import { UpgradeModal } from "@/components/payments/upgrade-modal";
import { ShareDialog } from "@/components/editor/share-dialog";
import { PdfPreviewModal } from "@/components/editor/pdf-preview-modal";
import { UpsellBanner } from "@/components/upsell/upsell-banner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Share2,
  Crown,
  Lock,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  X,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  computePageSlices,
  captureHighQualityPdf,
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  type PageSlice,
} from "@/lib/utils/pdf-pagination";

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

export function BiodataPreview() {
  const {
    selectedTemplateId,
    selectedColorScheme,
    setSelectedTemplate,
    setSelectedColorScheme,
    formData,
  } = useBiodataStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<
    "premium-template" | "watermark" | "high-res" | "general"
  >("general");
  const [shareOpen, setShareOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showWatermarkUpsell, setShowWatermarkUpsell] = useState(false);

  // Multi-page state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSlices, setPageSlices] = useState<PageSlice[]>([
    { yStart: 0, height: A4_HEIGHT_PX },
  ]);
  const totalPages = pageSlices.length;

  const template = getTemplateById(selectedTemplateId);
  const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplateId];

  const userTier =
    (session?.user as { tier?: string } | undefined)?.tier || "FREE";
  const isPremiumTemplate = template?.tier === "premium";
  const isPaidUser = userTier !== "FREE";
  const showWatermark = !isPaidUser;
  const isTemplateLocked = isPremiumTemplate && !isPaidUser;

  // Scale the A4-width content to fit the preview container
  const updatePreviewScale = useCallback(() => {
    if (!previewRef.current) return;
    const containerWidth = previewRef.current.clientWidth;
    const scale = containerWidth / A4_WIDTH_PX;
    previewRef.current.style.setProperty("--preview-scale", String(scale));
  }, []);

  // Recompute page slices whenever content or template changes
  const recomputePages = useCallback(() => {
    if (!contentRef.current) return;
    const slices = computePageSlices(contentRef.current);
    setPageSlices(slices);
    // Reset to first page if current page exceeds new total
    setCurrentPage((prev) => Math.min(prev, slices.length - 1));
  }, []);

  useEffect(() => {
    updatePreviewScale();
    // Give the DOM a tick to render before measuring pages
    const timer = setTimeout(recomputePages, 150);
    // Also update scale on window resize
    const handleResize = () => updatePreviewScale();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedTemplateId, selectedColorScheme, formData, recomputePages, updatePreviewScale]);

  const openUpgrade = (reason: typeof upgradeReason) => {
    setUpgradeReason(reason);
    setUpgradeOpen(true);
  };

  const handleDownload = () => {
    if (isTemplateLocked) {
      openUpgrade("premium-template");
      return;
    }
    setPreviewOpen(true);
  };

  const performDownload = async () => {
    setPreviewOpen(false);
    if (!contentRef.current) return;

    const name = formData.personalDetails.fullName || "biodata";
    const safeName = name.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "-");
    const filename = `${safeName}-biodata.pdf`;

    await captureHighQualityPdf(contentRef.current, {
      scale: isPaidUser ? 3 : 2,
      filename,
      showWatermark: showWatermark,
    });

    // Show watermark upsell after free download completes
    if (showWatermark) {
      setTimeout(() => setShowWatermarkUpsell(true), 800);
    }
  };

  const goToPrevPage = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goToNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  // Calculate the scroll offset to show the current page
  const currentSlice = pageSlices[currentPage];
  const scrollOffset = currentSlice ? currentSlice.yStart : 0;

  return (
    <div className="space-y-4">
      {/* Template & color selector */}
      <div className="flex gap-2 flex-wrap items-center">
        <Select value={selectedTemplateId} onValueChange={setSelectedTemplate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TEMPLATE_COMPONENTS).map((id) => {
              const t = getTemplateById(id);
              const locked = t?.tier === "premium" && !isPaidUser;
              return (
                <SelectItem key={id} value={id}>
                  <span className="flex items-center gap-1.5">
                    {t?.name || id}
                    {locked && <Lock className="h-3 w-3 text-gold-600" />}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPickerOpen(!pickerOpen)}
          className="gap-1.5 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
        >
          {pickerOpen ? (
            <X className="h-3.5 w-3.5" />
          ) : (
            <LayoutGrid className="h-3.5 w-3.5" />
          )}
          {pickerOpen ? "Close" : "Browse"}
        </Button>

        {template && template.colorSchemes.length > 1 && (
          <div className="flex items-center gap-1">
            {template.colorSchemes.map((cs) => (
              <button
                key={cs.id}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  selectedColorScheme === cs.id
                    ? "border-primary scale-110"
                    : "border-gray-200"
                }`}
                style={{ backgroundColor: cs.primary }}
                onClick={() => setSelectedColorScheme(cs.id)}
                title={cs.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Visual template picker grid */}
      {pickerOpen && (
        <div className="rounded-lg border bg-gray-50 p-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Choose a template
          </p>
          <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
            {TEMPLATES.map((t) => {
              const isSelected = t.id === selectedTemplateId;
              const locked = t.tier === "premium" && !isPaidUser;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTemplate(t.id);
                    setSelectedColorScheme("default");
                    setPickerOpen(false);
                  }}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${
                    isSelected
                      ? "border-maroon-800 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <TemplateThumbnail
                    templateId={t.id}
                    colorSchemeId={t.colorSchemes[0]?.id || "default"}
                    width={120}
                    className="rounded-none"
                  />
                  {locked && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <Lock className="h-3 w-3 text-amber-600" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-1 py-0.5">
                    <p className="text-[9px] font-medium truncate text-center">
                      {t.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Preview */}
      <div
        ref={previewRef}
        className="relative overflow-hidden rounded-lg border shadow-sm bg-white"
        style={{ aspectRatio: "210/297" }}
      >
        {/* Scrollable content container -- renders at A4 width, scaled to fit */}
        <div
          ref={contentRef}
          className="biodata-content origin-top-left"
          style={{
            width: `${A4_WIDTH_PX}px`,
            transform: `scale(var(--preview-scale, 1)) translateY(-${scrollOffset}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {TemplateComponent ? (
            <TemplateComponent colorSchemeId={selectedColorScheme} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Template not found
            </div>
          )}
        </div>

        {/* Watermark for free users — shown in preview only, PDF watermark is added natively */}
        {showWatermark && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center watermark-overlay">
            <div
              className="text-3xl font-bold text-black/[0.07] rotate-[-30deg] select-none whitespace-nowrap"
              style={{ fontSize: "clamp(1rem, 4vw, 2.5rem)" }}
            >
              BiodataCraft.in
            </div>
          </div>
        )}

        {/* Premium template lock overlay — compelling preview, not a wall */}
        {isTemplateLocked && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[3px] flex items-center justify-center">
            <div className="bg-white rounded-2xl p-5 text-center shadow-2xl max-w-[220px]">
              <div className="mx-auto w-11 h-11 rounded-full bg-gold-100 flex items-center justify-center mb-3">
                <Crown className="h-5 w-5 text-gold-600" />
              </div>
              <p className="text-sm font-bold text-maroon-900 mb-0.5">
                Unlock {template?.name}
              </p>
              <p className="text-[11px] text-muted-foreground mb-1">
                and 10+ premium templates
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground mb-3">
                <Users className="h-3 w-3" />
                <span>Trusted by 50,000+ families</span>
              </div>
              <Button
                size="sm"
                onClick={() => openUpgrade("premium-template")}
                className="w-full rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-xs gap-1 px-4 mb-2"
              >
                <Crown className="h-3 w-3" />
                Unlock All Templates — ₹199
              </Button>
              <button
                onClick={() => {
                  const freeTemplates = getFreeTemplates();
                  if (freeTemplates.length > 0) {
                    setSelectedTemplate(freeTemplates[0].id);
                    setSelectedColorScheme("default");
                  }
                }}
                className="text-[11px] text-muted-foreground hover:text-maroon-700 transition-colors"
              >
                Browse free templates
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Page navigation -- shown only when multiple pages exist */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="h-8 w-8 p-0 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-maroon-800">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className="h-8 w-8 p-0 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleDownload}
          className="flex-1 gap-2 bg-maroon-800 hover:bg-maroon-700 text-gold-100 rounded-full"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Upgrade nudge for free users */}
      {showWatermark && (
        <button
          onClick={() => openUpgrade("watermark")}
          className="w-full flex items-center gap-2 p-3 rounded-xl border border-gold-200 bg-gold-50/50 text-left hover:bg-gold-50 transition-colors"
        >
          <Crown className="h-4 w-4 text-gold-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-maroon-900">
              Remove watermark
            </p>
            <p className="text-[11px] text-muted-foreground">
              Upgrade for a clean, high-res PDF download
            </p>
          </div>
          <span className="text-xs font-bold text-maroon-800">
            From ₹99
          </span>
        </button>
      )}

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onSuccess={() => window.location.reload()}
        reason={upgradeReason}
      />

      <ShareDialog
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        biodataId=""
        onUpgrade={() => {
          setShareOpen(false);
          openUpgrade("general");
        }}
      />

      <PdfPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onConfirmDownload={performDownload}
      />

      {/* Post-download watermark upsell — shows after free PDF download */}
      {showWatermarkUpsell && (
        <UpsellBanner
          id="watermark_download_upsell"
          title="Your biodata looks great!"
          description="Remove the watermark for just ₹199. Get premium quality that impresses families."
          ctaText="Remove Watermark — ₹199"
          ctaAction={() => {
            setShowWatermarkUpsell(false);
            setUpgradeReason("watermark");
            setUpgradeOpen(true);
          }}
          variant="floating"
          secondaryText="Maybe later"
          secondaryAction={() => setShowWatermarkUpsell(false)}
          location="watermark_download"
        />
      )}
    </div>
  );
}
