"use client";

import { useState } from "react";
import { ChevronDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormCompletion } from "@/lib/utils/form-completion";
import { CompletionRing } from "./completion-ring";

interface CompletionSummaryProps {
  completion: FormCompletion;
  onGoToStep?: (stepIndex: number) => void;
}

export function CompletionSummary({
  completion,
  onGoToStep,
}: CompletionSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stepsNeedingAttention = completion.steps.filter(
    (s) => s.missingRequired.length > 0
  );
  const allRequiredDone = stepsNeedingAttention.length === 0;

  return (
    <div className="rounded-xl border border-maroon-100/50 bg-white shadow-sm overflow-hidden">
      {/* Header -- always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gold-50/30 transition-colors"
      >
        <CompletionRing percentage={completion.overall} size={36} strokeWidth={3.5} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-maroon-900">
            {completion.filledFields} of {completion.totalFields} fields complete
          </p>
          <p className="text-xs text-muted-foreground">
            {allRequiredDone ? (
              <span className="text-emerald-600">All required fields filled</span>
            ) : (
              <span className="text-amber-600">
                {completion.allMissingRequired.length} required field
                {completion.allMissingRequired.length !== 1 ? "s" : ""} remaining
              </span>
            )}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Expandable detail */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-3 space-y-2 border-t border-maroon-50">
            {completion.steps.map((step) => {
              const isDone = step.percentage === 100;
              const hasRequired = step.missingRequired.length > 0;

              return (
                <button
                  key={step.sectionKey}
                  onClick={() => onGoToStep?.(step.stepIndex)}
                  className="w-full flex items-center gap-2.5 py-1.5 text-left hover:bg-gold-50/30 rounded-md px-1.5 -mx-1.5 transition-colors"
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  ) : hasRequired ? (
                    <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                  )}
                  <span className="flex-1 text-xs font-medium text-maroon-800 truncate">
                    {step.stepTitle}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                      isDone
                        ? "bg-emerald-50 text-emerald-700"
                        : hasRequired
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-50 text-gray-500"
                    )}
                  >
                    {step.filledCount}/{step.totalCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
