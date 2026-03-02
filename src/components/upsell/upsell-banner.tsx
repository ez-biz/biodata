"use client";

import { useEffect, useState } from "react";
import { X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isDismissed, dismiss } from "@/lib/utils/upsell-dismissal";
import {
  trackUpsellShown,
  trackUpsellClicked,
  trackUpsellDismissed,
} from "@/lib/analytics";

export interface UpsellBannerProps {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAction: () => void;
  variant: "inline" | "floating" | "modal";
  secondaryText?: string;
  secondaryAction?: () => void;
  location: string;
}

export function UpsellBanner({
  id,
  title,
  description,
  ctaText,
  ctaAction,
  variant,
  secondaryText,
  secondaryAction,
  location,
}: UpsellBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDismissed(id)) {
      // Small delay for slide-in animation
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [id]);

  useEffect(() => {
    if (visible) {
      trackUpsellShown(location, variant);
    }
  }, [visible, location, variant]);

  const handleDismiss = () => {
    setVisible(false);
    dismiss(id);
    trackUpsellDismissed(location, variant);
  };

  const handleCta = () => {
    trackUpsellClicked(location, variant);
    ctaAction();
  };

  const handleSecondary = () => {
    if (secondaryAction) {
      secondaryAction();
    }
    handleDismiss();
  };

  if (!visible) return null;

  if (variant === "floating") {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500 ease-out"
      >
        <div className="mx-auto max-w-lg p-4">
          <div className="relative rounded-2xl border border-gold-200 bg-gradient-to-r from-maroon-50 to-gold-50 p-4 shadow-2xl shadow-maroon-900/10">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-9 w-9 rounded-full bg-gold-100 flex items-center justify-center">
                  <Crown className="h-4 w-4 text-gold-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-maroon-900">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {description}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={handleCta}
                    className="rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-xs gap-1 px-4 h-8"
                  >
                    <Crown className="h-3 w-3" />
                    {ctaText}
                  </Button>
                  {secondaryText && (
                    <button
                      onClick={handleSecondary}
                      className="text-xs text-muted-foreground hover:text-maroon-700 transition-colors"
                    >
                      {secondaryText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="animate-in slide-in-from-bottom-2 duration-300 ease-out">
        <div className="relative rounded-xl border border-gold-200 bg-gradient-to-r from-maroon-50/50 to-gold-50/50 p-3">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="flex items-center gap-2.5 pr-5">
            <Crown className="h-4 w-4 text-gold-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-maroon-900">{title}</p>
              <p className="text-[11px] text-muted-foreground">{description}</p>
            </div>
            <Button
              size="sm"
              onClick={handleCta}
              className="rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-[11px] gap-1 px-3 h-7 flex-shrink-0"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // variant === "modal"
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/40" onClick={handleDismiss} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-300">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mb-4">
          <Crown className="h-6 w-6 text-gold-600" />
        </div>
        <h3 className="font-display text-lg font-bold text-maroon-900 mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5">{description}</p>
        <Button
          onClick={handleCta}
          className="w-full rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 gap-2 mb-2"
        >
          <Crown className="h-4 w-4" />
          {ctaText}
        </Button>
        {secondaryText && (
          <button
            onClick={handleSecondary}
            className="text-sm text-muted-foreground hover:text-maroon-700 transition-colors"
          >
            {secondaryText}
          </button>
        )}
      </div>
    </div>
  );
}
