# Templates Guide

## Available Templates

BiodataCraft ships with 14 biodata templates across different styles and cultural traditions.

### Free Templates (3)

| Template | Style | Best For |
|----------|-------|----------|
| **Traditional Classic** | Maroon & gold borders, Om header | Hindu, Jain, Buddhist families |
| **Modern Minimal** | Clean typography, no ornaments | All religions, urban/professional |
| **Elegant Royal** | Gold frames, serif typography | All religions, premium look |

### Premium Templates (11)

| Template | Style | Best For |
|----------|-------|----------|
| **Photo Forward** | Magazine-style hero photo layout | Photo-centric biodatas |
| **Gujarati Traditional** | Bandhani border, "Shree Ganeshay Namah" header | Gujarati families |
| **Muslim Elegant** | "Bismillah" header, Islamic geometric border | Muslim families |
| **Sikh Anand** | Ik Onkar (ੴ), Khanda divider (☬) | Sikh families |
| **NRI Professional** | Corporate layout, gradient accent bars | NRI / diaspora audience |
| **South Indian Classic** | Kolam borders, Tamil header | South Indian families |
| **Bengali Elegance** | Alpona patterns, Bengali header | Bengali families |
| **Rajasthani Royal** | Block-print borders, saffron + blue | Rajasthani families |
| **Minimalist Card** | Pure typography, no ornaments | Modern, clean aesthetic |
| **Floral Garden** | Pastel gradients, flower Unicode | Soft, feminine aesthetic |
| **Christian Grace** | Cross motifs, navy + ivory | Christian families |

## Template Architecture

### Data Flow

```
BiodataFormData (Zustand store)
        │
        ▼
┌──────────────────┐
│ Template Component│ ← colorScheme prop
│  (React JSX)     │ ← locale prop (optional)
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
  Screen    html2canvas
  Preview   → jsPDF → PDF
```

### Template Component Interface

Every template component receives the same props:

```typescript
interface TemplateProps {
  data: BiodataFormData;      // All form fields
  colorScheme?: string;       // Color scheme ID (default: "default")
  locale?: string;            // Language code (e.g., "hi", "gu")
}
```

### Template Config

Each template is registered in `src/lib/templates/template-config.ts`:

```typescript
interface TemplateConfig {
  id: string;                 // Unique slug (e.g., "traditional-classic")
  name: string;               // Display name
  description: string;        // Short description
  category: string;           // "traditional" | "modern" | "religious" | "regional"
  tier: "free" | "premium";   // Access tier
  religions: string[];        // Target religions (empty = all)
  pages: number;              // Default page count
  photoSlots: number;         // Number of photo positions
  popularity?: number;        // Popularity score (for A/B testing)
  isNew?: boolean;            // New template flag
  colorSchemes: {
    id: string;
    name: string;
    primary: string;          // Primary color hex
    secondary: string;        // Secondary color hex
    accent: string;           // Accent color hex
  }[];
}
```

## Creating a New Template

### Step 1: Create the Component

Create `src/components/templates/my-template.tsx`:

```typescript
"use client";

import { BiodataFormData } from "@/lib/types/biodata";
import {
  getPersonalFields,
  getEducationFields,
  getFamilyFields,
  getLabel,
} from "./template-utils";

interface Props {
  data: BiodataFormData;
  colorScheme?: string;
  locale?: string;
}

export function MyTemplate({ data, colorScheme = "default", locale }: Props) {
  const personalFields = getPersonalFields(data, locale);
  const educationFields = getEducationFields(data, locale);

  return (
    <div
      className="relative w-full bg-white text-gray-900"
      style={{ minHeight: "100%", fontFamily: "var(--font-body)" }}
    >
      {/* Your template layout here */}
      <h1>{data.fullName || "Your Name"}</h1>

      {personalFields.map(([label, value]) => (
        value && (
          <div key={label}>
            <span className="font-semibold">{label}:</span> {value}
          </div>
        )
      ))}
    </div>
  );
}
```

### Step 2: Add Config

In `src/lib/templates/template-config.ts`, add to the `TEMPLATES` array:

```typescript
{
  id: "my-template",
  name: "My Template",
  description: "Description of the template",
  category: "modern",
  tier: "premium",
  religions: [],  // empty = all religions
  pages: 1,
  photoSlots: 1,
  colorSchemes: [
    { id: "default", name: "Default", primary: "#1a1a2e", secondary: "#16213e", accent: "#e94560" },
    { id: "warm", name: "Warm", primary: "#5c2018", secondary: "#8b3a2a", accent: "#d4a574" },
  ],
}
```

### Step 3: Register in Preview

In `src/components/editor/biodata-preview.tsx`, add to `TEMPLATE_COMPONENTS`:

```typescript
import { MyTemplate } from "@/components/templates/my-template";

const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // ... existing templates
  "my-template": MyTemplate,
};
```

### Step 4: Register in Thumbnail

In `src/components/templates/template-thumbnail.tsx`, add to the component map:

```typescript
import { MyTemplate } from "./my-template";

const THUMBNAIL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // ... existing templates
  "my-template": MyTemplate,
};
```

### Template Utilities

`src/components/templates/template-utils.ts` provides helper functions:

| Function | Purpose |
|----------|---------|
| `getLabel(key, locale?)` | Get localized field label |
| `getPersonalFields(data, locale?)` | Extract personal detail field-value pairs |
| `getEducationFields(data, locale?)` | Extract education & career fields |
| `getFamilyFields(data, locale?)` | Extract family detail fields |
| `getLifestyleFields(data, locale?)` | Extract lifestyle & preference fields |
| `getPartnerFields(data, locale?)` | Extract partner preference fields |
| `getContactFields(data, locale?)` | Extract contact detail fields |
| `getHoroscopeFields(data, locale?)` | Extract horoscope fields |

## Multi-Page Templates

Templates can use the `PageBreak` component for multi-page biodatas:

```typescript
import { PageBreak } from "@/components/editor/page-break";

// Inside your template:
{hasLotsOfContent && <PageBreak label="Page 2" />}
```

The PDF generation utility automatically detects `PageBreak` elements and generates separate pages.

## Color Schemes

Each template defines its own color schemes. Templates should read the `colorScheme` prop and apply colors accordingly:

```typescript
const COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  default: { primary: "#7f1d1d", secondary: "#92400e", accent: "#d4a574" },
  blue: { primary: "#1e3a5f", secondary: "#2d5a87", accent: "#87ceeb" },
};

const colors = COLORS[colorScheme] || COLORS.default;
```
