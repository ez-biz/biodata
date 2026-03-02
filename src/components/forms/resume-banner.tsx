"use client";

import { useState, useEffect } from "react";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { calculateFormCompletion } from "@/lib/utils/form-completion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FORM_STEPS } from "@/lib/types/biodata";

export function ResumeBanner() {
  const {
    formData,
    currentStep,
    lastStepVisited,
    clearAllData,
    setCurrentStep,
    hasExistingData,
  } = useBiodataStore();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (hasExistingData()) {
      setVisible(true);
    }
  }, [hasExistingData]);

  if (!mounted || !visible || dismissed) return null;

  const completion = calculateFormCompletion(formData);
  const name = formData.personalDetails.fullName;
  const stepToResume = lastStepVisited || currentStep;
  const stepTitle = FORM_STEPS[stepToResume - 1]?.title ?? "Personal Details";

  const handleResume = () => {
    setCurrentStep(stepToResume);
    setDismissed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartFresh = () => {
    clearAllData();
    setDismissed(true);
  };

  return (
    <div
      className={cn(
        "mb-6 animate-in slide-in-from-top-4 duration-500 ease-out",
        "bg-gradient-to-r from-maroon-50 to-gold-50 border border-maroon-200/60 rounded-2xl p-4 sm:p-5 shadow-sm"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-maroon-900 mb-1">
            Welcome back! You have a saved biodata.
          </p>
          <p className="text-xs text-muted-foreground mb-3 truncate">
            {name ? (
              <>
                <span className="font-medium text-maroon-700">{name}</span>
                {" — "}
              </>
            ) : null}
            Step {stepToResume} of {FORM_STEPS.length} ({stepTitle}) —{" "}
            {completion.overall}% complete
          </p>

          {/* Progress mini-bar */}
          <div className="h-1 bg-maroon-100 rounded-full overflow-hidden mb-3 max-w-xs">
            <div
              className="h-full bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full transition-all duration-500"
              style={{ width: `${completion.overall}%` }}
            />
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleResume}
              className="gap-1.5 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-xs h-8 px-4"
            >
              Resume Editing
              <ArrowRight className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleStartFresh}
              className="gap-1.5 rounded-full border-maroon-200 text-maroon-700 hover:bg-maroon-50 text-xs h-8 px-4"
            >
              <Trash2 className="h-3 w-3" />
              Start Fresh
            </Button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-maroon-800 transition-colors p-1 -mt-1 -mr-1"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
