"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { FORM_STEPS } from "@/lib/types/biodata";
import { STEP_SCHEMAS } from "@/lib/validators/biodata-schema";
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
  const { currentStep, setCurrentStep, formData, getCompletionPercentage } =
    useBiodataStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stepIndex = currentStep - 1;
  const StepComponent = STEP_COMPONENTS[stepIndex];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === FORM_STEPS.length;
  const completion = getCompletionPercentage();

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
          <span className="font-display text-sm font-semibold text-maroon-800">
            Step {currentStep} of {FORM_STEPS.length}
          </span>
          <span className="text-xs font-medium text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full">
            {completion}% complete
          </span>
        </div>
        {/* Custom progress bar */}
        <div className="h-1.5 bg-maroon-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(currentStep / FORM_STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex gap-1.5 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {FORM_STEPS.map((step) => (
          <button
            key={step.id}
            onClick={() => goToStep(step.id)}
            className={cn(
              "flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              step.id === currentStep
                ? "bg-maroon-800 text-gold-100 shadow-sm"
                : step.id < currentStep
                ? "bg-maroon-100 text-maroon-700 hover:bg-maroon-200"
                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
            )}
          >
            {step.id < currentStep ? (
              <Check className="h-3 w-3 inline mr-1" />
            ) : null}
            <span className="hidden sm:inline">{step.title}</span>
            <span className="sm:hidden">{step.id}</span>
          </button>
        ))}
      </div>

      {/* Form content */}
      <div className="bg-white rounded-2xl border border-maroon-100/50 p-5 sm:p-7 mb-6 shadow-sm animate-fade-in">
        <StepComponent errors={errors} />
      </div>

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
