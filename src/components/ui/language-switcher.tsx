"use client";

import { useI18n, LOCALES } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "hi" : "en")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-maroon-200 text-xs font-medium text-maroon-700 hover:bg-maroon-50 transition-colors"
      title="Switch language"
    >
      <Globe className="h-3.5 w-3.5" />
      {LOCALES.find((l) => l.id === locale)?.nativeLabel}
    </button>
  );
}
