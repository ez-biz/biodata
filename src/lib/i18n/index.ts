"use client";

import { createContext, useContext } from "react";
import { en, TranslationKeys } from "./translations/en";
import { hi } from "./translations/hi";

export type Locale = "en" | "hi";

export const LOCALES: { id: Locale; label: string; nativeLabel: string }[] = [
  { id: "en", label: "English", nativeLabel: "English" },
  { id: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

const translations: Record<Locale, TranslationKeys> = { en, hi };

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
