"use client";

import { useEffect, useState } from "react";
import { Crown, Sparkles, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import { getPremiumTemplates } from "@/lib/templates/template-config";
import { isOneTimeShown, markOneTimeShown } from "@/lib/utils/upsell-dismissal";
import {
  trackUpsellShown,
  trackUpsellClicked,
  trackUpsellDismissed,
} from "@/lib/analytics";

const FLAG_KEY = "upsell_completion_shown";

interface CompletionUpsellProps {
  onUpgrade: () => void;
  onDownloadFree: () => void;
}

export function CompletionUpsell({
  onUpgrade,
  onDownloadFree,
}: CompletionUpsellProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOneTimeShown(FLAG_KEY)) {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      trackUpsellShown("form_completion", "modal");
    }
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    markOneTimeShown(FLAG_KEY);
    trackUpsellDismissed("form_completion", "modal");
  };

  const handleUpgrade = () => {
    trackUpsellClicked("form_completion", "modal");
    markOneTimeShown(FLAG_KEY);
    onUpgrade();
    setVisible(false);
  };

  const handleDownloadFree = () => {
    markOneTimeShown(FLAG_KEY);
    onDownloadFree();
    setVisible(false);
  };

  if (!visible) return null;

  const premiumTemplates = getPremiumTemplates().slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/40" onClick={handleDismiss} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebratory header */}
        <div className="bg-gradient-to-br from-maroon-800 to-maroon-950 text-white px-6 pt-8 pb-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-gold-400/20 flex items-center justify-center mb-3">
            <Sparkles className="h-7 w-7 text-gold-300" />
          </div>
          <h2 className="font-display text-xl font-bold mb-1">
            Your biodata is ready!
          </h2>
          <p className="text-sm text-gold-200/80">
            Make the best impression with a premium template — no watermark,
            beautiful designs
          </p>
        </div>

        {/* Premium template teasers */}
        <div className="px-6 py-5">
          <p className="text-xs font-medium text-muted-foreground mb-3 text-center">
            Popular premium templates
          </p>
          <div className="flex justify-center gap-3 mb-5">
            {premiumTemplates.map((t) => (
              <div
                key={t.id}
                className="relative rounded-lg overflow-hidden border shadow-sm"
              >
                <TemplateThumbnail
                  templateId={t.id}
                  colorSchemeId={t.colorSchemes[0]?.id || "default"}
                  width={90}
                  className="rounded-none"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-1 py-0.5">
                  <p className="text-[8px] font-medium truncate text-center">
                    {t.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mb-4">
            Trusted by <span className="font-semibold text-maroon-800">50,000+</span> families
          </p>

          <Button
            onClick={handleUpgrade}
            className="w-full gap-2 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 font-semibold shadow-lg mb-2"
          >
            <Crown className="h-4 w-4" />
            Go Premium — ₹199
          </Button>
          <Button
            variant="ghost"
            onClick={handleDownloadFree}
            className="w-full gap-2 text-sm text-muted-foreground hover:text-maroon-800"
          >
            <Download className="h-4 w-4" />
            Download Free Version
          </Button>
        </div>
      </div>
    </div>
  );
}
