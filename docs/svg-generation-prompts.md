# SVG Generation Prompts for BiodataCraft Templates

Use these prompts with AI tools (Claude, ChatGPT, or any code-generating LLM) to create realistic, production-ready SVG ornaments for Indian marriage biodata templates.

---

## How to Use These Prompts

1. Copy the prompt for the ornament type you need
2. Paste it into Claude, ChatGPT, or similar
3. You'll get SVG code — paste it into a React component in `src/components/templates/ornaments/`
4. Wrap it in a React component following the pattern in existing ornament files

---

## Prompt 1: Mandala Background Pattern

```
Create a detailed SVG mandala pattern suitable for use as a subtle background
watermark on an Indian marriage biodata (A4 page, 794x1123px).

Requirements:
- The mandala should be centered, approximately 600px in diameter
- Use a single color (#800020 maroon) at very low opacity (0.04-0.06)
- The design should have 8-fold or 16-fold radial symmetry
- Include these traditional elements:
  - Concentric circles with varying stroke patterns
  - Teardrop/paisley shapes radiating outward
  - Petal layers (lotus-inspired) at 2-3 different radii
  - Fine geometric lattice in the center
  - Dotted borders between major ring sections
- The mandala should be intricate but NOT overwhelming — it's a background element
- Use only <path>, <circle>, <line>, and <g> elements (no <image> or <use>)
- All paths should use relative coordinates for compactness
- The viewBox should be "0 0 600 600"
- Do NOT include any text elements
- The overall feel should be: traditional Indian, elegant, sacred geometry

Output clean SVG code only, no explanation.
```

## Prompt 2: Floral Corner Ornament

```
Create an SVG corner ornament featuring Indian floral motifs for use on a
marriage biodata template.

Requirements:
- viewBox: "0 0 200 200" — the ornament sits in the top-left corner
- The design should include:
  - A graceful curved vine starting from the corner (0,0) and arcing inward
  - 2-3 stylized flowers (lotus or marigold inspired) along the vine
  - Small leaves and buds branching off the main vine
  - Thin curling tendrils at the tips
  - Small dots/circles as filler elements
- Single color: use "currentColor" so it can be recolored via CSS
- Stroke-based design (not filled shapes) for elegance, stroke-width: 1-1.5px
- The ornament should occupy roughly the triangle from (0,0) to (180,0) to (0,180)
- It should look beautiful when mirrored for all four corners using CSS transform
- Style: Hand-drawn feel, organic curves, NOT geometric/rigid
- Total SVG should be under 3KB for performance
- Do NOT include any filters, gradients, or effects — pure paths only

Output clean SVG code only.
```

## Prompt 3: Paisley Border Element

```
Create an SVG paisley motif for use as a repeating vertical border element
on an Indian marriage biodata.

Requirements:
- viewBox: "0 0 60 120" — designed to tile vertically
- The paisley should include:
  - One large teardrop/mango shape (the classic paisley)
  - Internal decorative lines following the curve
  - A small flower or spiral at the wide end
  - Fine dot detailing along edges
  - Small leaf shapes connecting to the next tile seamlessly
- The top and bottom edges must connect smoothly when the SVG is repeated
- Use "currentColor" for the color
- Mix of filled and stroked elements for visual depth
- Stroke-width: 0.8-1.2px for fine details
- The paisley should curve gracefully, not look rigid
- Style: Traditional Indian textile block-print aesthetic
- Under 2KB for performance

Output clean SVG code only.
```

## Prompt 4: Ornamental Section Divider

```
Create an SVG horizontal divider ornament for separating sections in an
Indian marriage biodata template.

Requirements:
- viewBox: "0 0 500 30" — wide and thin, full-width divider
- The design should include:
  - A central decorative motif (choose from: lotus bud, small mandala, diamond cluster, or paisley flourish)
  - Symmetrical curved lines extending left and right from the center
  - The lines should taper from the center outward, becoming thinner
  - Small decorative dots or leaf elements along the lines
  - The outermost tips should fade gracefully (thin strokes)
- Use "currentColor" for coloring
- Horizontally symmetrical (left mirrors right)
- The center motif should be roughly 30x30px
- Lines extend to fill the full 500px width
- Stroke-based with varying widths (0.5px to 1.5px)
- Style: Elegant, refined, suitable for a formal document
- Under 2KB

Output clean SVG code only.
```

## Prompt 5: Decorative Photo Frame

```
Create an SVG decorative frame for a profile photo on an Indian marriage
biodata template.

Requirements:
- viewBox: "0 0 200 240" — portrait orientation frame
- The frame should include:
  - An inner rectangular cutout area (approximately 140x180, centered) where the photo will go
  - Ornamental border around the cutout with:
    - Rounded/arched top (like a window or doorway shape)
    - Fine decorative molding lines
    - Small floral or geometric elements at the corners
    - Subtle pattern along the border edges
  - A small decorative element at the top center (like a crown, lotus, or arch finial)
- Use "currentColor" for the main frame color
- The photo area should be transparent (no fill)
- The ornamental parts should have varying line weights (0.5px to 2px)
- Style: Regal, formal, reminiscent of miniature painting frames
- Under 3KB

Output clean SVG code only.
```

## Prompt 6: Islamic Geometric Border Pattern

```
Create an SVG geometric pattern tile inspired by Islamic art for use as a
border on a Muslim marriage biodata template.

Requirements:
- viewBox: "0 0 80 80" — square tile that repeats seamlessly
- The pattern should include:
  - Interlocking star-and-cross geometric pattern (8-pointed stars)
  - Clean, precise geometric lines
  - The pattern must tile seamlessly in all directions
  - Use interlacing lines that appear to weave over/under each other
- Use "currentColor" for coloring
- Stroke-only design, stroke-width: 0.8-1px
- Mathematical precision in the geometry
- Style: Traditional Islamic arabesque, similar to Alhambra tile patterns
- No figurative elements (respect Islamic artistic traditions)
- Under 2KB

Output clean SVG code only.
```

## Prompt 7: Kolam/Rangoli Pattern

```
Create an SVG kolam (rangoli) pattern for a South Indian marriage biodata template.

Requirements:
- viewBox: "0 0 150 150" — square design
- The kolam should include:
  - A grid of dots (pulli) as the foundation (5x5 or 7x7 grid)
  - Continuous curved lines looping around the dots (traditional kolam style)
  - The lines should form a symmetric pattern (4-fold symmetry)
  - No line crossings (lines loop around dots but don't intersect)
  - Some dots should be visible, others hidden by the lines
- Use "currentColor" for coloring
- Stroke-based, stroke-width: 1-1.5px
- The dots should be small circles (r=2px), filled
- Style: Authentic Tamil Nadu kolam, hand-drawn feel
- Under 2KB

Output clean SVG code only.
```

## Prompt 8: Ganesh Ji Icon

```
Create a detailed SVG icon of Lord Ganesha (Ganesh ji) for the header of a
Hindu marriage biodata template.

Requirements:
- viewBox: "0 0 80 80" — compact icon
- The design should be a stylized/artistic silhouette, NOT a realistic drawing
- Include recognizable elements:
  - Elephant head with trunk curving to the left
  - Crown or decorative headpiece
  - Large ears
  - Seated posture (simplified)
  - Small modak (sweet) in one hand (optional)
- Single color using "currentColor"
- Filled paths (not strokes) for a clean silhouette look
- The design should work at sizes from 40px to 120px
- Style: Elegant, devotional, simplified — like a premium logo or stamp
- NOT cartoonish — refined and respectful
- Under 2KB

Output clean SVG code only.
```

## Prompt 9: Khanda (Sikh Symbol) Ornament

```
Create an SVG Khanda symbol with decorative embellishments for a Sikh
marriage biodata template.

Requirements:
- viewBox: "0 0 100 100"
- The Khanda should include:
  - Central double-edged sword (Khanda)
  - Circular chakra (quoit) behind the sword
  - Two single-edged swords (Kirpans) crossed behind
- Add subtle decorative elements:
  - Fine radiating lines behind the main symbol
  - Small dots at cardinal points
  - Optional thin decorative border circle
- Use "currentColor" for coloring
- The main symbol should be filled, decorative elements can be stroked
- Must be recognizable and respectful
- Style: Traditional yet refined, suitable for formal document
- Under 2KB

Output clean SVG code only.
```

## Prompt 10: Cross with Floral Embellishments (Christian)

```
Create an SVG decorative cross for a Christian marriage biodata template.

Requirements:
- viewBox: "0 0 80 100"
- The design should include:
  - A central Latin cross with slightly flared/ornate ends
  - Small floral or vine embellishments wrapping around the cross
  - Fine line detailing within the cross arms
  - Small radiating lines or dots around the intersection
- Use "currentColor" for coloring
- Mix of filled and stroked elements
- Style: Graceful, reverent, similar to church bulletin art
- Should work at sizes from 30px to 80px
- Under 2KB

Output clean SVG code only.
```

## Prompt 11: Alpona (Bengali) Border Pattern

```
Create an SVG Alpona-inspired border corner design for a Bengali marriage
biodata template.

Requirements:
- viewBox: "0 0 150 150" — corner ornament
- The Alpona design should include:
  - Stylized lotus motifs (the signature element of Bengali Alpona)
  - Curved lines flowing from the corner
  - Paisley/mango shapes integrated into the design
  - Rice grain dots (small elongated ellipses)
  - Fish motifs (optional, traditional Bengali symbol)
- Use "currentColor" for coloring
- Primarily stroke-based with some filled elements
- Flowing, organic curves — hand-painted aesthetic
- Should mirror for all four corners
- Style: Traditional Bengali floor art (Alpona/Alpana)
- Under 3KB

Output clean SVG code only.
```

## Prompt 12: Rajasthani Block Print Border

```
Create an SVG border element inspired by Rajasthani block print textiles
for a marriage biodata template.

Requirements:
- viewBox: "0 0 100 40" — horizontal repeating border strip
- The design should include:
  - Geometric flowers in block-print style (simple, bold shapes)
  - Repeating leaf/vine pattern connecting the flowers
  - Small triangular or diamond filler elements
  - The left and right edges must connect seamlessly when tiled
- Use "currentColor" for coloring
- Mix of filled shapes (block-print effect) and fine line details
- Style: Hand-block printed textile feel (Rajasthani/Jaipur style)
  - Bold, slightly imperfect shapes (not perfectly geometric)
  - Dense but not cluttered
- Under 2KB

Output clean SVG code only.
```

---

## Tips for Best Results

1. **Iterate**: First generation might not be perfect. Ask for refinements.
2. **Test at target size**: SVGs can look different at different scales.
3. **Optimize**: Run generated SVGs through [SVGO](https://jakearchibald.github.io/svgomg/) to reduce file size.
4. **Color test**: Since we use `currentColor`, test with multiple color schemes.
5. **Print test**: Generate a PDF and check the ornaments render cleanly in print.

## Converting SVG to React Component

```tsx
// Example: src/components/templates/ornaments/mandala-bg.tsx

interface Props {
  color?: string;
  opacity?: number;
  className?: string;
}

export function MandalaBg({ color = "#800020", opacity = 0.05, className }: Props) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      style={{ color, opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Paste SVG paths here, replacing color values with "currentColor" */}
    </svg>
  );
}
```

## File Naming Convention

Place all ornament components in `src/components/templates/ornaments/`:

```
ornaments/
├── index.ts              # Re-exports all ornaments
├── mandala-bg.tsx        # Background mandala patterns
├── floral-corner.tsx     # Corner floral decorations
├── paisley-border.tsx    # Vertical paisley borders
├── section-divider.tsx   # Horizontal ornamental dividers
├── photo-frame.tsx       # Decorative photo frame overlays
├── islamic-pattern.tsx   # Islamic geometric tiles
├── kolam-pattern.tsx     # South Indian kolam designs
├── ganesh-icon.tsx       # Lord Ganesha silhouette
├── khanda-icon.tsx       # Sikh Khanda symbol
├── cross-ornament.tsx    # Christian cross with flourishes
├── alpona-corner.tsx     # Bengali Alpona border
└── block-print.tsx       # Rajasthani block print border
```
