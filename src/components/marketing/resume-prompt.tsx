"use client";

import { useState, useEffect } from "react";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ResumePrompt() {
  const hasExistingData = useBiodataStore((s) => s.hasExistingData);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show once per session
    const alreadyDismissed = sessionStorage.getItem(
      "biodata-resume-prompt-dismissed"
    );
    if (!alreadyDismissed && hasExistingData()) {
      setVisible(true);
    }
  }, [hasExistingData]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("biodata-resume-prompt-dismissed", "1");
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md",
        "animate-in slide-in-from-bottom-4 duration-500 ease-out"
      )}
    >
      <div className="bg-white border border-maroon-200 shadow-xl shadow-maroon-900/10 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-maroon-900">
            You have an unfinished biodata
          </p>
          <Link
            href="/create"
            onClick={handleDismiss}
            className="text-xs font-semibold text-maroon-700 hover:text-maroon-900 inline-flex items-center gap-1 mt-0.5 transition-colors"
          >
            Continue editing
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-maroon-800 transition-colors p-1 flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
