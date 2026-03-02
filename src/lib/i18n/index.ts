"use client";

import { createContext, useContext } from "react";
import { en, TranslationKeys } from "./translations/en";
import { hi } from "./translations/hi";
import { mr } from "./translations/mr";
import { gu } from "./translations/gu";
import { ta } from "./translations/ta";
import { te } from "./translations/te";
import { bn } from "./translations/bn";

export type Locale = "en" | "hi" | "mr" | "gu" | "ta" | "te" | "bn";

export const LOCALES: { id: Locale; label: string; nativeLabel: string }[] = [
  { id: "en", label: "English", nativeLabel: "English" },
  { id: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { id: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { id: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { id: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { id: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { id: "bn", label: "Bengali", nativeLabel: "বাংলা" },
];

const translations: Record<Locale, TranslationKeys> = { en, hi, mr, gu, ta, te, bn };

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || en;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function useI18n() {
  return useContext(I18nContext);
}
