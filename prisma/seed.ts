import { PrismaClient, Tier } from "@prisma/client";

const prisma = new PrismaClient();

const TEMPLATES = [
  {
    id: "traditional-classic",
    name: "Traditional Classic",
    slug: "traditional-classic",
    category: "Traditional",
    tier: Tier.FREE,
    religions: ["Hindu", "Jain", "Buddhist"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Maroon & Gold", primary: "#800020", secondary: "#D4AF37", accent: "#FFD700", background: "#FFF8F0", text: "#2D1B0E" },
      { id: "red-gold", name: "Red & Gold", primary: "#C41E3A", secondary: "#DAA520", accent: "#FFD700", background: "#FFFAF5", text: "#1A1A1A" },
      { id: "green-gold", name: "Green & Gold", primary: "#2E5930", secondary: "#D4AF37", accent: "#8FBC8F", background: "#F5FFF5", text: "#1A1A1A" },
    ],
    thumbnailUrl: "/templates/traditional-classic.png",
    sortOrder: 95,
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    slug: "modern-minimal",
    category: "Modern",
    tier: Tier.FREE,
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Blush & Navy", primary: "#1B2A4A", secondary: "#E8B4B8", accent: "#D4A574", background: "#FFFFFF", text: "#1A1A1A" },
      { id: "sage", name: "Sage & Cream", primary: "#6B7B6B", secondary: "#E8E0D0", accent: "#9CAF88", background: "#FAFAF5", text: "#2D2D2D" },
      { id: "lavender", name: "Lavender & Grey", primary: "#6B5B95", secondary: "#E8E0F0", accent: "#B8A9C9", background: "#FAFAFF", text: "#2D2D2D" },
    ],
    thumbnailUrl: "/templates/modern-minimal.png",
    sortOrder: 88,
  },
  {
    id: "elegant-royal",
    name: "Elegant Royal",
    slug: "elegant-royal",
    category: "Elegant",
    tier: Tier.FREE,
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 2,
    colorSchemes: [
      { id: "default", name: "Royal Purple", primary: "#4A0E4E", secondary: "#D4AF37", accent: "#9B59B6", background: "#FDF8FF", text: "#1A0A1E" },
      { id: "navy", name: "Navy & Silver", primary: "#0C1445", secondary: "#C0C0C0", accent: "#4169E1", background: "#F5F5FF", text: "#0C1445" },
      { id: "emerald", name: "Emerald & Gold", primary: "#064E3B", secondary: "#D4AF37", accent: "#059669", background: "#F0FFF4", text: "#064E3B" },
    ],
    thumbnailUrl: "/templates/elegant-royal.png",
    sortOrder: 82,
  },
  {
    id: "photo-forward",
    name: "Photo Studio",
    slug: "photo-forward",
    category: "Photo-Forward",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 2,
    photoSlots: 5,
    colorSchemes: [
      { id: "default", name: "Classic Black", primary: "#1A1A1A", secondary: "#D4AF37", accent: "#B8860B", background: "#FFFFFF", text: "#1A1A1A" },
    ],
    thumbnailUrl: "/templates/photo-forward.png",
    sortOrder: 78,
  },
  {
    id: "gujarati-traditional",
    name: "Gujarati Patrika",
    slug: "gujarati-traditional",
    category: "Regional",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Jain"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Red & Bandhani", primary: "#CC0000", secondary: "#FFD700", accent: "#FF6347", background: "#FFF5E6", text: "#2D1B0E" },
    ],
    thumbnailUrl: "/templates/gujarati-traditional.png",
    sortOrder: 72,
  },
  {
    id: "muslim-elegant",
    name: "Nikah Nama",
    slug: "muslim-elegant",
    category: "Religious",
    tier: Tier.PREMIUM,
    religions: ["Muslim"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Green & Gold", primary: "#006400", secondary: "#D4AF37", accent: "#228B22", background: "#F0FFF0", text: "#1A2E1A" },
    ],
    thumbnailUrl: "/templates/muslim-elegant.png",
    sortOrder: 65,
  },
  {
    id: "sikh-anand",
    name: "Anand Karaj",
    slug: "sikh-anand",
    category: "Religious",
    tier: Tier.PREMIUM,
    religions: ["Sikh"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Orange & Royal Blue", primary: "#FF8C00", secondary: "#00008B", accent: "#FFD700", background: "#FFFFF0", text: "#1A1A2E" },
    ],
    thumbnailUrl: "/templates/sikh-anand.png",
    sortOrder: 60,
  },
  {
    id: "nri-professional",
    name: "NRI Professional",
    slug: "nri-professional",
    category: "NRI/Western",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 2,
    colorSchemes: [
      { id: "default", name: "Corporate Blue", primary: "#1E3A5F", secondary: "#E8E8E8", accent: "#3498DB", background: "#FFFFFF", text: "#1A1A1A" },
    ],
    thumbnailUrl: "/templates/nri-professional.png",
    sortOrder: 70,
  },
  {
    id: "south-indian-classic",
    name: "South Indian Classic",
    slug: "south-indian-classic",
    category: "Regional",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Jain", "Buddhist"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Turmeric & Red", primary: "#B22222", secondary: "#DAA520", accent: "#CD853F", background: "#FFF8E7", text: "#2D1B0E" },
      { id: "temple-green", name: "Temple Green", primary: "#2E5930", secondary: "#DAA520", accent: "#8B6914", background: "#FAFAF0", text: "#1A1A1A" },
    ],
    thumbnailUrl: "/templates/south-indian-classic.png",
    sortOrder: 75,
  },
  {
    id: "bengali-elegance",
    name: "Bengali Elegance",
    slug: "bengali-elegance",
    category: "Regional",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Buddhist"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Red & White", primary: "#C41E3A", secondary: "#F5E6E8", accent: "#E8A0A0", background: "#FFFAFA", text: "#2D1B1B" },
      { id: "maroon-cream", name: "Maroon & Cream", primary: "#800020", secondary: "#F5E6D0", accent: "#C9A96E", background: "#FFF8F0", text: "#2D1B0E" },
    ],
    thumbnailUrl: "/templates/bengali-elegance.png",
    sortOrder: 68,
  },
  {
    id: "rajasthani-royal",
    name: "Rajasthani Royal",
    slug: "rajasthani-royal",
    category: "Regional",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Jain"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Saffron & Blue", primary: "#CC5500", secondary: "#DAA520", accent: "#1E3A7B", background: "#FFF8F0", text: "#2D1B0E" },
      { id: "desert-rose", name: "Desert Rose", primary: "#8B2252", secondary: "#D4AF37", accent: "#CD853F", background: "#FFF5EE", text: "#2D1B1B" },
    ],
    thumbnailUrl: "/templates/rajasthani-royal.png",
    sortOrder: 73,
  },
  {
    id: "minimalist-card",
    name: "Minimalist Card",
    slug: "minimalist-card",
    category: "Modern",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Charcoal", primary: "#2D2D2D", secondary: "#E8E8E8", accent: "#666666", background: "#FFFFFF", text: "#333333" },
      { id: "navy-accent", name: "Navy Accent", primary: "#1B2A4A", secondary: "#E8E8E8", accent: "#4A6FA5", background: "#FFFFFF", text: "#333333" },
    ],
    thumbnailUrl: "/templates/minimalist-card.png",
    sortOrder: 80,
  },
  {
    id: "floral-garden",
    name: "Floral Garden",
    slug: "floral-garden",
    category: "Elegant",
    tier: Tier.PREMIUM,
    religions: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Blush & Sage", primary: "#8B5E6B", secondary: "#F5E6E8", accent: "#7B9E6B", background: "#FFF9FA", text: "#3D2D2D" },
      { id: "lavender", name: "Lavender Garden", primary: "#6B5B7B", secondary: "#EDE8F5", accent: "#9B8EB8", background: "#FAFAFF", text: "#2D2D3D" },
    ],
    thumbnailUrl: "/templates/floral-garden.png",
    sortOrder: 76,
  },
  {
    id: "christian-grace",
    name: "Christian Grace",
    slug: "christian-grace",
    category: "Religious",
    tier: Tier.PREMIUM,
    religions: ["Christian"],
    pages: 1,
    photoSlots: 1,
    colorSchemes: [
      { id: "default", name: "Navy & Ivory", primary: "#1B2A4A", secondary: "#D4CFC0", accent: "#6B7B9E", background: "#FFFFF5", text: "#1A1A2E" },
      { id: "burgundy", name: "Burgundy & Cream", primary: "#6B1E3A", secondary: "#E8D8C8", accent: "#9B5E6B", background: "#FFFAF5", text: "#2D1B1B" },
    ],
    thumbnailUrl: "/templates/christian-grace.png",
    sortOrder: 62,
  },
];

async function main() {
  console.log("Seeding templates...");

  for (const template of TEMPLATES) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {
        name: template.name,
        category: template.category,
        tier: template.tier,
        religions: template.religions,
        pages: template.pages,
        photoSlots: template.photoSlots,
        colorSchemes: template.colorSchemes,
        thumbnailUrl: template.thumbnailUrl,
        sortOrder: template.sortOrder,
        isActive: true,
      },
      create: {
        id: template.id,
        name: template.name,
        slug: template.slug,
        category: template.category,
        tier: template.tier,
        religions: template.religions,
        pages: template.pages,
        photoSlots: template.photoSlots,
        colorSchemes: template.colorSchemes,
        thumbnailUrl: template.thumbnailUrl,
        sortOrder: template.sortOrder,
        isActive: true,
      },
    });

    console.log(`  ✓ ${template.name} (${template.tier})`);
  }

  console.log(`\nSeeded ${TEMPLATES.length} templates.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
