"use client";

import { useState, useEffect, useRef } from "react";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { Check, Loader2, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

function getRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function SaveIndicator() {
  const lastSavedAt = useBiodataStore((s) => s.lastSavedAt);
  const formData = useBiodataStore((s) => s.formData);
  const [isSaving, setIsSaving] = useState(false);
  const [relativeTime, setRelativeTime] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevFormDataRef = useRef(formData);

  // Detect form changes and show "Saving..." briefly
  useEffect(() => {
    if (prevFormDataRef.current === formData) return;
    prevFormDataRef.current = formData;

    setIsSaving(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setIsSaving(false);
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [formData]);

  // Update relative time display every 30 seconds
  useEffect(() => {
    if (!lastSavedAt) return;
    setRelativeTime(getRelativeTime(lastSavedAt));

    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(lastSavedAt));
    }, 30000);

    return () => clearInterval(interval);
  }, [lastSavedAt]);

  if (!lastSavedAt && !isSaving) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-medium transition-all duration-300",
        isSaving ? "text-muted-foreground" : "text-emerald-600"
      )}
    >
      {isSaving ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Saving...</span>
        </>
      ) : lastSavedAt ? (
        <>
          <Check className="h-3 w-3" />
          <span>Saved {relativeTime}</span>
        </>
      ) : null}
    </div>
  );
}

export function AutoSaveReassurance() {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:hidden mt-1">
      <Cloud className="h-3 w-3" />
      <span>Your progress is automatically saved on this device</span>
    </div>
  );
}
