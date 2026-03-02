"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { BiodataWizard } from "@/components/forms/biodata-wizard";
import { BiodataPreview } from "@/components/editor/biodata-preview";
import { MobilePreviewSheet } from "@/components/editor/mobile-preview-sheet";
import { CompletionSummary } from "@/components/forms/completion-summary";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpgradeBar } from "@/components/upsell/upgrade-bar";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CompletionUpsell } from "@/components/upsell/completion-upsell";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpgradeModal } from "@/components/payments/upgrade-modal";
import { Button } from "@/components/ui/button";
import { X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { calculateFormCompletion } from "@/lib/utils/form-completion";
import { ResumeBanner } from "@/components/forms/resume-banner";

export default function CreatePage() {
  const [showDesktopPreview, setShowDesktopPreview] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showCompletionUpsell, setShowCompletionUpsell] = useState(false);
  const { formData, setCurrentStep, currentStep } = useBiodataStore();

  const completion = useMemo(
    () => calculateFormCompletion(formData),
    [formData]
  );

  // Show completion upsell when user reaches near 100% completion
  const prevCompletionRef = useMemo(() => ({ value: 0 }), []);
  useEffect(() => {
    if (
      completion.overall >= 85 &&
      prevCompletionRef.value < 85 &&
      currentStep === 7
    ) {
      setShowCompletionUpsell(true);
    }
    prevCompletionRef.value = completion.overall;
  }, [completion.overall, currentStep, prevCompletionRef]);

  const handleGoToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreview = () => {
    // On mobile, open bottom sheet; on desktop, show side panel
    if (window.innerWidth < 768) {
      setShowMobilePreview(true);
    } else {
      setShowDesktopPreview(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <UpgradeBar onUpgrade={() => setUpgradeOpen(true)} />
      <Navbar />

      <div className="container px-4 py-6 md:py-8">
        <ResumeBanner />
        <div className="flex gap-8">
          {/* Form side */}
          <div
            className={cn(
              "flex-1 min-w-0 transition-all duration-300",
              showDesktopPreview
                ? "hidden lg:block lg:flex-1"
                : "w-full"
            )}
          >
            <BiodataWizard onPreview={handlePreview} />
          </div>

          {/* Desktop preview side — hidden on mobile */}
          {showDesktopPreview && (
            <div className="hidden md:block flex-1 relative animate-fade-in">
              <div className="sticky top-20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-display text-lg font-semibold text-maroon-900">
                    Live Preview
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-muted-foreground hover:text-maroon-800"
                    onClick={() => setShowDesktopPreview(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Completion summary near preview */}
                <div className="mb-4">
                  <CompletionSummary
                    completion={completion}
                    onGoToStep={handleGoToStep}
                  />
                </div>

                <BiodataPreview />
              </div>
            </div>
          )}
        </div>

        {/* Mobile preview FAB — only visible on mobile */}
        <div className="fixed bottom-6 right-6 md:hidden z-40">
          <Button
            size="lg"
            className="mobile-preview-fab rounded-full shadow-xl shadow-maroon-900/20 gap-2 bg-maroon-800 hover:bg-maroon-700 text-gold-100 px-5 h-14"
            onClick={() => setShowMobilePreview(true)}
          >
            <Eye className="h-5 w-5" />
            <span className="text-sm font-medium">Preview</span>
            <span className="ml-1 flex items-center justify-center h-6 min-w-[1.5rem] rounded-full bg-white/20 text-[11px] font-bold px-1.5">
              {completion.overall}%
            </span>
          </Button>
        </div>

        {/* Desktop preview toggle FAB — when preview is hidden on desktop */}
        {!showDesktopPreview && (
          <div className="fixed bottom-6 right-6 hidden md:block z-40">
            <Button
              size="lg"
              className="rounded-full shadow-xl shadow-maroon-900/20 gap-2 bg-maroon-800 hover:bg-maroon-700 text-gold-100 px-6"
              onClick={() => setShowDesktopPreview(true)}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        )}
      </div>

      {/* Mobile bottom sheet preview */}
      <MobilePreviewSheet
        isOpen={showMobilePreview}
        onClose={() => setShowMobilePreview(false)}
      />

      {/* Completion upsell — shown when form is nearly complete */}
      {showCompletionUpsell && (
        <CompletionUpsell
          onUpgrade={() => {
            setShowCompletionUpsell(false);
            setUpgradeOpen(true);
          }}
          onDownloadFree={() => {
            setShowCompletionUpsell(false);
            // Open preview to trigger download
            if (window.innerWidth < 768) {
              setShowMobilePreview(true);
            } else {
              setShowDesktopPreview(true);
            }
          }}
        />
      )}

      {/* Upgrade modal triggered from upsell bar */}
      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onSuccess={() => window.location.reload()}
        reason="general"
      />
    </div>
  );
}
