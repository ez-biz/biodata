import { TemplateConfig } from "@/lib/types/biodata";

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "traditional-classic",
    name: "Traditional Classic",
    slug: "traditional-classic",
    category: "Traditional",
    tier: "free",
    religions: ["Hindu", "Jain", "Buddhist"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      {
        id: "default",
        name: "Maroon & Gold",
        primary: "#800020",
        secondary: "#D4AF37",
        accent: "#FFD700",
        background: "#FFF8F0",
        text: "#2D1B0E",
      },
      {
        id: "red-gold",
        name: "Red & Gold",
        primary: "#C41E3A",
        secondary: "#DAA520",
        accent: "#FFD700",
        background: "#FFFAF5",
        text: "#1A1A1A",
      },
      {
        id: "green-gold",
        name: "Green & Gold",
        primary: "#2E5930",
        secondary: "#D4AF37",
        accent: "#8FBC8F",
        background: "#F5FFF5",
        text: "#1A1A1A",
      },
    ],
    thumbnailUrl: "/templates/traditional-classic.png",
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    slug: "modern-minimal",
    category: "Modern",
    tier: "free",
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      {
        id: "default",
        name: "Blush & Navy",
        primary: "#1B2A4A",
        secondary: "#E8B4B8",
        accent: "#D4A574",
        background: "#FFFFFF",
        text: "#1A1A1A",
      },
      {
        id: "sage",
        name: "Sage & Cream",
        primary: "#6B7B6B",
        secondary: "#E8E0D0",
        accent: "#9CAF88",
        background: "#FAFAF5",
        text: "#2D2D2D",
      },
      {
        id: "lavender",
        name: "Lavender & Grey",
        primary: "#6B5B95",
        secondary: "#E8E0F0",
        accent: "#B8A9C9",
        background: "#FAFAFF",
        text: "#2D2D2D",
      },
    ],
    thumbnailUrl: "/templates/modern-minimal.png",
  },
  {
    id: "elegant-royal",
    name: "Elegant Royal",
    slug: "elegant-royal",
    category: "Elegant",
    tier: "free",
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 2,
    colorSchemes: [
      {
        id: "default",
        name: "Royal Purple",
        primary: "#4A0E4E",
        secondary: "#D4AF37",
        accent: "#9B59B6",
        background: "#FDF8FF",
        text: "#1A0A1E",
      },
      {
        id: "navy",
        name: "Navy & Silver",
        primary: "#0C1445",
        secondary: "#C0C0C0",
        accent: "#4169E1",
        background: "#F5F5FF",
        text: "#0C1445",
      },
      {
        id: "emerald",
        name: "Emerald & Gold",
        primary: "#064E3B",
        secondary: "#D4AF37",
        accent: "#059669",
        background: "#F0FFF4",
        text: "#064E3B",
      },
    ],
    thumbnailUrl: "/templates/elegant-royal.png",
  },
  // Premium templates
  {
    id: "photo-forward",
    name: "Photo Studio",
    slug: "photo-forward",
    category: "Photo-Forward",
    tier: "premium",
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 2,
    photoSlots: 5,
    colorSchemes: [
      {
        id: "default",
        name: "Classic Black",
        primary: "#1A1A1A",
        secondary: "#D4AF37",
        accent: "#B8860B",
        background: "#FFFFFF",
        text: "#1A1A1A",
      },
    ],
    thumbnailUrl: "/templates/photo-forward.png",
  },
  {
    id: "gujarati-traditional",
    name: "Gujarati Patrika",
    slug: "gujarati-traditional",
    category: "Regional",
    tier: "premium",
    religions: ["Hindu", "Jain"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      {
        id: "default",
        name: "Red & Bandhani",
        primary: "#CC0000",
        secondary: "#FFD700",
        accent: "#FF6347",
        background: "#FFF5E6",
        text: "#2D1B0E",
      },
    ],
    thumbnailUrl: "/templates/gujarati-traditional.png",
  },
  {
    id: "muslim-elegant",
    name: "Nikah Nama",
    slug: "muslim-elegant",
    category: "Religious",
    tier: "premium",
    religions: ["Muslim"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      {
        id: "default",
        name: "Green & Gold",
        primary: "#006400",
        secondary: "#D4AF37",
        accent: "#228B22",
        background: "#F0FFF0",
        text: "#1A2E1A",
      },
    ],
    thumbnailUrl: "/templates/muslim-elegant.png",
  },
  {
    id: "sikh-anand",
    name: "Anand Karaj",
    slug: "sikh-anand",
    category: "Religious",
    tier: "premium",
    religions: ["Sikh"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      {
        id: "default",
        name: "Orange & Royal Blue",
        primary: "#FF8C00",
        secondary: "#00008B",
        accent: "#FFD700",
        background: "#FFFFF0",
        text: "#1A1A2E",
      },
    ],
    thumbnailUrl: "/templates/sikh-anand.png",
  },
  {
    id: "nri-professional",
    name: "NRI Professional",
    slug: "nri-professional",
    category: "NRI/Western",
    tier: "premium",
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 2,
    colorSchemes: [
      {
        id: "default",
        name: "Corporate Blue",
        primary: "#1E3A5F",
        secondary: "#E8E8E8",
        accent: "#3498DB",
        background: "#FFFFFF",
        text: "#1A1A1A",
      },
    ],
    thumbnailUrl: "/templates/nri-professional.png",
  },
];

export function getTemplateById(id: string): TemplateConfig | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): TemplateConfig[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function getFreeTemplates(): TemplateConfig[] {
  return TEMPLATES.filter((t) => t.tier === "free");
}

export function getPremiumTemplates(): TemplateConfig[] {
  return TEMPLATES.filter((t) => t.tier === "premium");
}

export const TEMPLATE_CATEGORIES = [
  "All",
  "Traditional",
  "Modern",
  "Elegant",
  "Photo-Forward",
  "Regional",
  "Religious",
  "NRI/Western",
] as const;
