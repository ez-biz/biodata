"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PLANS, PlanId } from "@/lib/razorpay";
import { useRazorpay } from "@/lib/hooks/use-razorpay";
import { Check, Crown, Loader2, X, Sparkles } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  biodataId?: string;
  reason?: "premium-template" | "watermark" | "high-res" | "general";
}

const REASON_MESSAGES: Record<string, string> = {
  "premium-template": "Unlock this premium template and all future ones",
  watermark: "Remove the watermark from your biodata",
  "high-res": "Download in high resolution, print-ready quality",
  general: "Upgrade to unlock all premium features",
};

export function UpgradeModal({
  isOpen,
  onClose,
  onSuccess,
  biodataId,
  reason = "general",
}: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("UNLIMITED");

  const { initiatePayment, loading } = useRazorpay({
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
    onFailure: (error) => {
      alert(error);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-maroon-800 to-maroon-950 text-white px-6 pt-8 pb-6 rounded-t-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-gold-400" />
            <span className="text-gold-300 text-sm font-medium tracking-wider uppercase">
              Upgrade
            </span>
          </div>
          <h2 className="font-display text-xl font-bold">
            {REASON_MESSAGES[reason]}
          </h2>
        </div>

        {/* Plans */}
        <div className="p-6 space-y-3">
          {(Object.keys(PLANS) as PlanId[]).map((planId) => {
            const plan = PLANS[planId];
            const isSelected = selectedPlan === planId;
            const isPopular = planId === "UNLIMITED";

            return (
              <button
                key={planId}
                onClick={() => setSelectedPlan(planId)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-maroon-600 bg-maroon-50/50 shadow-sm"
                    : "border-gray-200 hover:border-maroon-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-maroon-900">
                      {plan.name}
                    </span>
                    {isPopular && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-display text-lg font-bold text-maroon-900">
                      ₹{plan.amount / 100}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1">
                  {plan.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="text-xs text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <Button
            onClick={() => initiatePayment(selectedPlan, biodataId)}
            disabled={loading}
            className="w-full gap-2 py-6 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 font-semibold text-base shadow-lg"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Crown className="h-4 w-4" />
            )}
            {loading
              ? "Processing..."
              : `Pay ₹${PLANS[selectedPlan].amount / 100}`}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground mt-3">
            Secure payment via Razorpay. Instant activation.
          </p>
        </div>
      </div>
    </div>
  );
}
