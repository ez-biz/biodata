"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { getTemplateById } from "@/lib/templates/template-config";
import { TraditionalClassicTemplate } from "@/components/templates/traditional-classic";
import { ModernMinimalTemplate } from "@/components/templates/modern-minimal";
import { ElegantRoyalTemplate } from "@/components/templates/elegant-royal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Share2 } from "lucide-react";
import { useRef } from "react";

const TEMPLATE_COMPONENTS: Record<
  string,
  React.ComponentType<{ colorSchemeId: string }>
> = {
  "traditional-classic": TraditionalClassicTemplate,
  "modern-minimal": ModernMinimalTemplate,
  "elegant-royal": ElegantRoyalTemplate,
};

export function BiodataPreview() {
  const {
    selectedTemplateId,
    selectedColorScheme,
    setSelectedTemplate,
    setSelectedColorScheme,
  } = useBiodataStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const template = getTemplateById(selectedTemplateId);
  const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplateId];

  const handleDownload = async () => {
    if (!previewRef.current) return;

    const { default: html2canvas } = await import("html2canvas");
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
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
              return (
                <SelectItem key={id} value={id}>
                  {t?.name || id}
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

        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            className="text-3xl font-bold text-black/[0.07] rotate-[-30deg] select-none whitespace-nowrap"
            style={{ fontSize: "clamp(1rem, 4vw, 2.5rem)" }}
          >
            BiodataCraft.in
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleDownload} className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
