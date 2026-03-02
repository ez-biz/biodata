"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { FORM_STEPS } from "@/lib/types/biodata";
import { STEP_SCHEMAS } from "@/lib/validators/biodata-schema";
import { calculateFormCompletion } from "@/lib/utils/form-completion";
import { CompletionRing } from "./completion-ring";
import { StepPersonal } from "./step-personal";
import { StepEducation } from "./step-education";
import { StepFamily } from "./step-family";
import { StepLifestyle } from "./step-lifestyle";
import { StepPartner } from "./step-partner";
import { StepContact } from "./step-contact";
import { StepHoroscope } from "./step-horoscope";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Eye,
  AlertTriangle,
} from "lucide-react";

const STEP_COMPONENTS = [
  StepPersonal,
  StepEducation,
  StepFamily,
  StepLifestyle,
  StepPartner,
  StepContact,
  StepHoroscope,
];

interface BiodataWizardProps {
  onPreview?: () => void;
}

export function BiodataWizard({ onPreview }: BiodataWizardProps) {
  const { currentStep, setCurrentStep, formData } = useBiodataStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highlightIncomplete, setHighlightIncomplete] = useState(false);

  const stepIndex = currentStep - 1;
  const StepComponent = STEP_COMPONENTS[stepIndex];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === FORM_STEPS.length;

  const completion = useMemo(
    () => calculateFormCompletion(formData),
    [formData]
  );

  const currentStepCompletion = completion.steps[stepIndex];

  const validateStep = useCallback(() => {
    const schema = STEP_SCHEMAS[stepIndex];
    const stepKey = FORM_STEPS[stepIndex].key;
    const stepData = formData[stepKey as keyof typeof formData];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (schema as any).safeParse(stepData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(
        (issue: { path: (string | number)[]; message: string }) => {
          const path = issue.path.join(".");
          fieldErrors[path] = issue.message;
        }
      );
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [stepIndex, formData]);

  const goNext = () => {
    if (validateStep() && !isLastStep) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (!isFirstStep) {
      setErrors({});
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step: number) => {
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <CompletionRing
              percentage={completion.overall}
              size={44}
              strokeWidth={4}
            />
            <div>
              <span className="font-display text-sm font-semibold text-maroon-800 block">
                Step {currentStep} of {FORM_STEPS.length}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {completion.filledFields} of {completion.totalFields} fields
                filled
              </span>
            </div>
          </div>
          <span className="text-xs font-medium text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full">
            {completion.overall}% complete
          </span>
        </div>
        {/* Custom progress bar -- now based on actual completion */}
        <div className="h-1.5 bg-maroon-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${completion.overall}%`,
            }}
          />
        </div>
      </div>

      {/* Step indicators with completion status */}
      <div className="flex gap-1.5 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {FORM_STEPS.map((step, idx) => {
          const stepComp = completion.steps[idx];
          const isComplete = stepComp.percentage === 100;
          const hasRequiredMissing = stepComp.missingRequired.length > 0;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => goToStep(step.id)}
              className={cn(
                "relative flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                isCurrent
                  ? "bg-maroon-800 text-gold-100 shadow-sm"
                  : isComplete
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ring-1 ring-emerald-200"
                  : hasRequiredMissing
                  ? "bg-amber-50 text-amber-700 hover:bg-amber-100 ring-1 ring-amber-200"
                  : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
              )}
            >
              {isComplete ? (
                <Check className="h-3 w-3 inline mr-1" />
              ) : hasRequiredMissing && !isCurrent ? (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                  {stepComp.missingRequired.length}
                </span>
              ) : null}
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sm:hidden">{step.id}</span>
            </button>
          );
        })}
      </div>

      {/* Form content */}
      <div
        className={cn(
          "bg-white rounded-2xl border border-maroon-100/50 p-5 sm:p-7 mb-4 shadow-sm animate-fade-in",
          highlightIncomplete && "highlight-incomplete-fields"
        )}
      >
        {/* Step sub-header with completion info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CompletionRing
              percentage={currentStepCompletion.percentage}
              size={28}
              strokeWidth={3}
              showLabel={false}
            />
            <span className="text-xs font-medium text-muted-foreground">
              {currentStepCompletion.filledCount}/
              {currentStepCompletion.totalCount} fields
            </span>
          </div>
          {currentStepCompletion.missingRequired.length > 0 && (
            <button
              onClick={() => setHighlightIncomplete(!highlightIncomplete)}
              className={cn(
                "flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-200",
                highlightIncomplete
                  ? "bg-amber-100 text-amber-800 ring-1 ring-amber-300"
                  : "bg-gray-50 text-muted-foreground hover:bg-amber-50 hover:text-amber-700"
              )}
            >
              <AlertTriangle className="h-3 w-3" />
              {highlightIncomplete ? "Highlighting" : "Show"} incomplete
            </button>
          )}
        </div>

        <StepComponent errors={errors} />
      </div>

      {/* Missing required fields alert for current step */}
      {highlightIncomplete &&
        currentStepCompletion.missingRequired.length > 0 && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
            <p className="font-semibold text-amber-800 mb-1.5">
              Missing required fields:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {currentStepCompletion.missingRequired.map((f) => (
                <span
                  key={f.key}
                  className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium"
                >
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={isFirstStep}
          className="gap-1.5 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {onPreview && (
            <Button
              variant="outline"
              onClick={onPreview}
              className="gap-1.5 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </Button>
          )}

          {isLastStep ? (
            <Button
              onClick={() => {
                if (validateStep()) {
                  onPreview?.();
                }
              }}
              className="gap-1.5 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm"
            >
              <Eye className="h-4 w-4" />
              Preview & Download
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="gap-1.5 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm px-6"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
