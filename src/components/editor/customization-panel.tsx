"use client";

import { useCallback, useRef, useState } from "react";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { FONT_OPTIONS, FONT_SIZE_OPTIONS } from "@/lib/constants/font-options";
import { CustomColorOverrides, FontFamilyOption, FontSizeOption } from "@/lib/types/biodata";
import { UpgradeModal } from "@/components/payments/upgrade-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Paintbrush, Lock, RotateCcw, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useI18n } from "@/lib/i18n";

const COLOR_FIELDS: { key: keyof CustomColorOverrides; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "background", label: "Background" },
  { key: "text", label: "Text" },
];

function DebouncedColorInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (hex: string) => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const handleChange = useCallback(
    (hex: string) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(hex), 100);
    },
    [onChange]
  );

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="h-7 w-7 rounded border cursor-pointer p-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) handleChange(v);
        }}
        className="w-[72px] text-xs font-mono border rounded px-1.5 py-1 uppercase"
        maxLength={7}
      />
    </div>
  );
}

interface CustomizationPanelProps {
  currentColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export function CustomizationPanel({ currentColors }: CustomizationPanelProps) {
  const { t } = useI18n();
  const { data: session } = useSession();
  const userTier =
    (session?.user as { tier?: string } | undefined)?.tier || "FREE";
  const isPaidUser = userTier !== "FREE";

  const {
    customColors,
    customFontFamily,
    customFontSize,
    setCustomColors,
    setCustomFontFamily,
    setCustomFontSize,
    resetCustomization,
  } = useBiodataStore();

  const [expanded, setExpanded] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const hasOverrides = customColors !== null || customFontFamily !== null || customFontSize !== null;

  const handleColorChange = useCallback(
    (key: keyof CustomColorOverrides, hex: string) => {
      if (hex.length !== 7) return;
      const prev = customColors || {};
      setCustomColors({ ...prev, [key]: hex });
    },
    [customColors, setCustomColors]
  );

  const handleFontChange = useCallback(
    (val: string) => {
      setCustomFontFamily(val === "default" ? null : (val as FontFamilyOption));
    },
    [setCustomFontFamily]
  );

  return (
    <>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 py-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
      >
        <Paintbrush className="h-3.5 w-3.5 text-maroon-600" />
        <span className="text-xs font-medium text-maroon-800 flex-1">
          {t.customization.customize}
        </span>
        {hasOverrides && (
          <span className="h-1.5 w-1.5 rounded-full bg-maroon-500" />
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="relative rounded-lg border border-gray-200 p-3 space-y-4">
          {/* Premium gate overlay */}
          {!isPaidUser && (
            <div className="absolute inset-0 z-10 rounded-lg bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs font-semibold text-gray-700">
                {t.customization.premiumFeature}
              </p>
              <Button
                size="sm"
                onClick={() => setUpgradeOpen(true)}
                className="rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-xs px-4"
              >
                {t.customization.unlockCustomization}
              </Button>
            </div>
          )}

          {/* Colors */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {t.customization.colors}
            </p>
            {COLOR_FIELDS.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-gray-700">{label}</span>
                <DebouncedColorInput
                  value={
                    (customColors && customColors[key]) || currentColors[key]
                  }
                  onChange={(hex) => handleColorChange(key, hex)}
                />
              </div>
            ))}
          </div>

          {/* Font */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {t.customization.font}
            </p>
            <Select
              value={customFontFamily || "default"}
              onValueChange={handleFontChange}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder={t.customization.templateDefault} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  <span className="text-xs">{t.customization.templateDefault}</span>
                </SelectItem>
                {FONT_OPTIONS.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    <span className="text-xs" style={{ fontFamily: f.cssValue }}>
                      {f.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {t.customization.fontSize}
            </p>
            <div className="flex gap-1">
              {FONT_SIZE_OPTIONS.map((fs) => {
                const isActive = (customFontSize || "default") === fs.id;
                return (
                  <button
                    key={fs.id}
                    onClick={() =>
                      setCustomFontSize(fs.id === "default" ? null : (fs.id as FontSizeOption))
                    }
                    className={`flex-1 text-xs py-1.5 rounded-md border transition-colors ${
                      isActive
                        ? "bg-maroon-800 text-white border-maroon-800"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {fs.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset */}
          {hasOverrides && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetCustomization}
              className="w-full gap-1.5 text-xs rounded-full"
            >
              <RotateCcw className="h-3 w-3" />
              {t.customization.resetToDefault}
            </Button>
          )}
        </div>
      )}

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onSuccess={() => window.location.reload()}
        reason="general"
      />
    </>
  );
}
