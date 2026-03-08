"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
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
  ChevronDown,
  Mail,
} from "lucide-react";
import { SaveIndicator, AutoSaveReassurance } from "./save-indicator";
import { EmailDraftModal } from "./email-draft-modal";
import { useI18n } from "@/lib/i18n";

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
  const [stepSelectorOpen, setStepSelectorOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [animDirection, setAnimDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const stepSelectorRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const stepTitles = [
    t.steps.personal,
    t.steps.education,
    t.steps.family,
    t.steps.lifestyle,
    t.steps.partner,
    t.steps.contact,
    t.steps.horoscope,
  ];

  const stepIndex = currentStep - 1;
  const StepComponent = STEP_COMPONENTS[stepIndex];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === FORM_STEPS.length;

  const completion = useMemo(
    () => calculateFormCompletion(formData),
    [formData]
  );

  const currentStepCompletion = completion.steps[stepIndex];

  // Close step selector on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        stepSelectorRef.current &&
        !stepSelectorRef.current.contains(e.target as Node)
      ) {
        setStepSelectorOpen(false);
      }
    };
    if (stepSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [stepSelectorOpen]);

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

  const navigateToStep = useCallback(
    (step: number) => {
      if (step === currentStep) return;
      setAnimDirection(step > currentStep ? "right" : "left");
      setIsAnimating(true);
      setTimeout(() => {
        setErrors({});
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => setIsAnimating(false), 50);
      }, 150);
    },
    [currentStep, setCurrentStep]
  );

  const goNext = () => {
    if (validateStep() && !isLastStep) {
      navigateToStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (!isFirstStep) {
      navigateToStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setStepSelectorOpen(false);
    navigateToStep(step);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-24 md:pb-0">
      {/* Progress header */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <CompletionRing
              percentage={completion.overall}
              size={44}
              strokeWidth={4}
            />
            <div>
              <span className="font-display text-sm font-semibold text-maroon-800 block">
                {t.wizard.step} {currentStep} {t.wizard.of} {FORM_STEPS.length}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {completion.filledFields} {t.wizard.of} {completion.totalFields} {t.wizard.fieldsFilled}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SaveIndicator />
            <button
              onClick={() => setEmailModalOpen(true)}
              className="text-[11px] font-medium text-muted-foreground hover:text-maroon-700 flex items-center gap-1 transition-colors"
              title={t.common.save}
            >
              <Mail className="h-3 w-3" />
              <span className="hidden sm:inline">{t.common.save}</span>
            </button>
            <span className="text-xs font-medium text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full">
              {completion.overall}%
            </span>
          </div>
        </div>
        <AutoSaveReassurance />
        {/* Custom progress bar */}
        <div className="h-1.5 bg-maroon-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${completion.overall}%`,
            }}
          />
        </div>
      </div>

      {/* ─── Desktop: horizontal step pills ─── */}
      <div className="hidden md:flex flex-wrap gap-1.5 mb-8">
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
              {stepTitles[idx]}
            </button>
          );
        })}
      </div>

      {/* ─── Mobile: compact step indicator with dropdown ─── */}
      <div className="md:hidden mb-6 relative" ref={stepSelectorRef}>
        {/* Step dots row */}
        <button
          onClick={() => setStepSelectorOpen(!stepSelectorOpen)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white border border-maroon-100/50 shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            {/* Step dots */}
            <div className="flex gap-1.5">
              {FORM_STEPS.map((step, idx) => {
                const stepComp = completion.steps[idx];
                const isComplete = stepComp.percentage === 100;
                const isCurrent = step.id === currentStep;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      isCurrent
                        ? "w-6 bg-maroon-800"
                        : isComplete
                        ? "w-2.5 bg-emerald-500"
                        : "w-2.5 bg-gray-300"
                    )}
                  />
                );
              })}
            </div>
            {/* Current step name */}
            <span className="text-sm font-medium text-maroon-800 truncate">
              {stepTitles[stepIndex]}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0",
              stepSelectorOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown step selector */}
        {stepSelectorOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-xl border border-maroon-100/50 shadow-lg overflow-hidden animate-scale-in">
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
                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                    isCurrent
                      ? "bg-maroon-50 text-maroon-900 font-semibold"
                      : "hover:bg-gray-50 text-gray-700"
                  )}
                >
                  {/* Status icon */}
                  <div
                    className={cn(
                      "flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-bold flex-shrink-0",
                      isComplete
                        ? "bg-emerald-100 text-emerald-700"
                        : isCurrent
                        ? "bg-maroon-800 text-gold-100"
                        : hasRequiredMissing
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="flex-1 truncate">{stepTitles[idx]}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {stepComp.percentage}%
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Form content with step transition */}
      <div
        className={cn(
          "bg-white rounded-2xl border border-maroon-100/50 p-4 sm:p-5 md:p-7 mb-4 shadow-sm",
          highlightIncomplete && "highlight-incomplete-fields",
          isAnimating
            ? animDirection === "right"
              ? "step-exit-left"
              : "step-exit-right"
            : "step-enter"
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
              {currentStepCompletion.totalCount} {t.wizard.fields}
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
              {highlightIncomplete ? t.wizard.highlighting : t.wizard.showIncomplete}
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
              {t.wizard.missingRequired}
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

      {/* ─── Desktop navigation ─── */}
      <div className="hidden md:flex justify-between items-center">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={isFirstStep}
          className="gap-1.5 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.common.previous}
        </Button>

        <div className="flex gap-2">
          {onPreview && (
            <Button
              variant="outline"
              onClick={onPreview}
              className="gap-1.5 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50"
            >
              <Eye className="h-4 w-4" />
              {t.common.preview}
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
              {t.wizard.previewDownload}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="gap-1.5 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm px-6"
            >
              {t.common.next}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ─── Mobile sticky bottom navigation ─── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 mobile-nav-bar">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={isFirstStep}
            className="flex-1 gap-1.5 rounded-xl border-maroon-200 text-maroon-800 hover:bg-maroon-50 disabled:opacity-30 h-12 text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.common.previous}
          </Button>

          {isLastStep ? (
            <Button
              onClick={() => {
                if (validateStep()) {
                  onPreview?.();
                }
              }}
              className="flex-1 gap-1.5 rounded-xl bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm h-12 text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              {t.common.preview}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="flex-1 gap-1.5 rounded-xl bg-maroon-800 hover:bg-maroon-700 text-gold-100 shadow-sm h-12 text-sm font-medium"
            >
              {t.common.next}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Email Draft Modal */}
      <EmailDraftModal open={emailModalOpen} onOpenChange={setEmailModalOpen} />
    </div>
  );
}
