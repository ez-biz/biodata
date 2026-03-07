import { FontFamilyOption, FontSizeOption } from "@/lib/types/biodata";

export interface FontOption {
  id: FontFamilyOption;
  label: string;
  cssValue: string;
  category: "serif" | "sans-serif";
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "playfair",
    label: "Playfair Display",
    cssValue: "var(--font-display), Georgia, serif",
    category: "serif",
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    cssValue: "var(--font-serif), Georgia, serif",
    category: "serif",
  },
  {
    id: "dm-sans",
    label: "DM Sans",
    cssValue: "var(--font-body), 'Helvetica Neue', sans-serif",
    category: "sans-serif",
  },
  {
    id: "lora",
    label: "Lora",
    cssValue: "var(--font-lora), Georgia, serif",
    category: "serif",
  },
  {
    id: "poppins",
    label: "Poppins",
    cssValue: "var(--font-poppins), 'Helvetica Neue', sans-serif",
    category: "sans-serif",
  },
  {
    id: "merriweather",
    label: "Merriweather",
    cssValue: "var(--font-merriweather), Georgia, serif",
    category: "serif",
  },
];

export function getFontOption(id: FontFamilyOption): FontOption | undefined {
  return FONT_OPTIONS.find((f) => f.id === id);
}

export interface FontSizeConfig {
  id: FontSizeOption;
  label: string;
  shortLabel: string;
  scale: number;
}

export const FONT_SIZE_OPTIONS: FontSizeConfig[] = [
  { id: "small", label: "Small", shortLabel: "S", scale: 0.92 },
  { id: "default", label: "Default", shortLabel: "Default", scale: 1.0 },
  { id: "medium", label: "Medium", shortLabel: "M", scale: 1.08 },
  { id: "large", label: "Large", shortLabel: "L", scale: 1.15 },
];

export function getFontSizeScale(size: FontSizeOption | null | undefined): number {
  if (!size || size === "default") return 1.0;
  return FONT_SIZE_OPTIONS.find((f) => f.id === size)?.scale ?? 1.0;
}
