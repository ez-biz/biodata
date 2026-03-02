"use client";

import { useI18n, LOCALES, Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="relative flex items-center gap-1.5">
      <Globe className="h-3.5 w-3.5 text-maroon-600 pointer-events-none" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="appearance-none bg-transparent border border-maroon-200 rounded-full pl-1 pr-6 py-1 text-xs font-medium text-maroon-700 hover:bg-maroon-50 focus:outline-none focus:ring-2 focus:ring-maroon-300 cursor-pointer transition-colors"
        title="Select language"
      >
        {LOCALES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.nativeLabel}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 text-maroon-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
