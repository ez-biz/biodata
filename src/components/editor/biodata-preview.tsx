"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { getTemplateById } from "@/lib/templates/template-config";
import { TraditionalClassicTemplate } from "@/components/templates/traditional-classic";
import { ModernMinimalTemplate } from "@/components/templates/modern-minimal";
import { ElegantRoyalTemplate } from "@/components/templates/elegant-royal";
import { PhotoForwardTemplate } from "@/components/templates/photo-forward";
import { GujaratiTraditionalTemplate } from "@/components/templates/gujarati-traditional";
import { MuslimElegantTemplate } from "@/components/templates/muslim-elegant";
import { SikhAnandTemplate } from "@/components/templates/sikh-anand";
import { NriProfessionalTemplate } from "@/components/templates/nri-professional";
import { UpgradeModal } from "@/components/payments/upgrade-modal";
import { ShareDialog } from "@/components/editor/share-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Share2, Crown, Lock } from "lucide-react";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

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
};

export function BiodataPreview() {
  const {
    selectedTemplateId,
    selectedColorScheme,
    setSelectedTemplate,
    setSelectedColorScheme,
  } = useBiodataStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<
    "premium-template" | "watermark" | "high-res" | "general"
  >("general");
  const [shareOpen, setShareOpen] = useState(false);

  const template = getTemplateById(selectedTemplateId);
  const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplateId];

  const userTier = (session?.user as { tier?: string } | undefined)?.tier || "FREE";
  const isPremiumTemplate = template?.tier === "premium";
  const isPaidUser = userTier !== "FREE";
  const showWatermark = !isPaidUser;
  const isTemplateLocked = isPremiumTemplate && !isPaidUser;

  const openUpgrade = (reason: typeof upgradeReason) => {
    setUpgradeReason(reason);
    setUpgradeOpen(true);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;

    if (isTemplateLocked) {
      openUpgrade("premium-template");
      return;
    }

    const { default: html2canvas } = await import("html2canvas");
    const { jsPDF } = await import("jspdf");

    const scale = isPaidUser ? 3 : 2; // Higher resolution for paid users

    const canvas = await html2canvas(previewRef.current, {
      scale,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", isPaidUser ? 0.98 : 0.85);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("biodata.pdf");
  };

  return (
    <div className="space-y-4">
      {/* Template & color selector */}
      <div className="flex gap-2 flex-wrap">
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

      {/* Preview */}
      <div className="relative overflow-hidden rounded-lg border shadow-sm bg-white">
        <div
          ref={previewRef}
          className="w-full"
          style={{ aspectRatio: "210/297" }}
        >
          {TemplateComponent ? (
            <TemplateComponent colorSchemeId={selectedColorScheme} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Template not found
            </div>
          )}
        </div>

        {/* Watermark for free users */}
        {showWatermark && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div
              className="text-3xl font-bold text-black/[0.07] rotate-[-30deg] select-none whitespace-nowrap"
              style={{ fontSize: "clamp(1rem, 4vw, 2.5rem)" }}
            >
              BiodataCraft.in
            </div>
          </div>
        )}

        {/* Premium template lock overlay */}
        {isTemplateLocked && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 text-center shadow-xl max-w-[200px]">
              <div className="mx-auto w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mb-3">
                <Crown className="h-5 w-5 text-gold-600" />
              </div>
              <p className="text-sm font-semibold text-maroon-900 mb-1">
                Premium Template
              </p>
              <p className="text-[11px] text-muted-foreground mb-3">
                Upgrade to use this template
              </p>
              <Button
                size="sm"
                onClick={() => openUpgrade("premium-template")}
                className="rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-xs gap-1 px-4"
              >
                <Crown className="h-3 w-3" />
                Unlock
              </Button>
            </div>
          </div>
        )}
      </div>

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
      />
    </div>
  );
}
