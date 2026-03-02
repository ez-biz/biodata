"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BiodataPreview = dynamic(
  () =>
    import("@/components/editor/biodata-preview").then(
      (mod) => mod.BiodataPreview
    ),
  { ssr: false, loading: () => <PreviewSkeleton /> }
);

function PreviewSkeleton() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-sm text-muted-foreground animate-pulse">
        Loading preview...
      </div>
    </div>
  );
}

interface MobilePreviewSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobilePreviewSheet({
  isOpen,
  onClose,
}: MobilePreviewSheetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const startYRef = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset translate when opening
  useEffect(() => {
    if (isOpen) {
      setTranslateY(0);
    }
  }, [isOpen]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const delta = e.touches[0].clientY - startYRef.current;
      // Only allow dragging down
      if (delta > 0) {
        setTranslateY(delta);
      }
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // If dragged more than 150px down, close the sheet
    if (translateY > 150) {
      onClose();
    }
    setTranslateY(0);
  }, [translateY, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 md:hidden",
          "bg-white rounded-t-2xl shadow-2xl",
          "transition-transform duration-300 ease-out",
          !isDragging && "transition-transform",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{
          height: "90vh",
          transform: isOpen
            ? `translateY(${translateY}px)`
            : "translateY(100%)",
          transition: isDragging ? "none" : undefined,
        }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
          <h2 className="font-display text-base font-semibold text-maroon-900">
            Preview
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-maroon-800"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable preview content */}
        <div className="overflow-y-auto overscroll-contain" style={{ height: "calc(90vh - 60px)" }}>
          <div className="p-4">
            {isOpen && <BiodataPreview />}
          </div>
        </div>
      </div>
    </>
  );
}
