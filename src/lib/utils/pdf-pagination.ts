/**
 * Multi-page PDF generation utility.
 *
 * Detects page boundaries inside a rendered biodata container and produces
 * a multi-page PDF where each page is an A4-sized image.
 *
 * Two strategies are used to determine page boundaries:
 * 1. Explicit `.page-break` markers placed by templates
 * 2. Automatic overflow detection — when the total content height exceeds
 *    one A4 page (1123px at 96 dpi), the content is sliced into pages.
 */

/** A4 dimensions at 96 dpi (CSS pixels) */
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

/** A4 in mm (for jsPDF) */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export interface PageSlice {
  /** Y offset in CSS pixels from the top of the container */
  yStart: number;
  /** Height of this slice in CSS pixels */
  height: number;
}

/**
 * Given the preview container element, compute the page slices.
 *
 * It looks for `.page-break` elements first, then falls back to
 * automatic slicing at A4_HEIGHT_PX intervals.
 */
export function computePageSlices(container: HTMLElement): PageSlice[] {
  const totalHeight = container.scrollHeight;

  // If everything fits on one page, return a single slice
  if (totalHeight <= A4_HEIGHT_PX) {
    return [{ yStart: 0, height: totalHeight }];
  }

  const containerRect = container.getBoundingClientRect();
  const pageBreaks = container.querySelectorAll(".page-break");

  const breakYPositions: number[] = [];

  pageBreaks.forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Position relative to the container top (account for scroll)
    const y = rect.top - containerRect.top + container.scrollTop;
    breakYPositions.push(y);
  });

  // Sort ascending
  breakYPositions.sort((a, b) => a - b);

  const slices: PageSlice[] = [];

  if (breakYPositions.length > 0) {
    // Build slices from explicit page-break positions
    let cursor = 0;
    for (const breakY of breakYPositions) {
      if (breakY <= cursor) continue;

      // If the segment between cursor and breakY is taller than one page,
      // auto-slice it
      const segmentHeight = breakY - cursor;
      if (segmentHeight > A4_HEIGHT_PX) {
        const autoSlices = autoSliceSegment(cursor, segmentHeight);
        slices.push(...autoSlices);
      } else {
        slices.push({ yStart: cursor, height: segmentHeight });
      }
      cursor = breakY;
    }

    // Remaining content after last break
    if (cursor < totalHeight) {
      const remaining = totalHeight - cursor;
      if (remaining > A4_HEIGHT_PX) {
        slices.push(...autoSliceSegment(cursor, remaining));
      } else {
        slices.push({ yStart: cursor, height: remaining });
      }
    }
  } else {
    // No explicit page breaks — auto-slice the whole thing
    slices.push(...autoSliceSegment(0, totalHeight));
  }

  return slices;
}

function autoSliceSegment(startY: number, totalHeight: number): PageSlice[] {
  const slices: PageSlice[] = [];
  let remaining = totalHeight;
  let cursor = startY;
  while (remaining > 0) {
    const h = Math.min(remaining, A4_HEIGHT_PX);
    slices.push({ yStart: cursor, height: h });
    cursor += h;
    remaining -= h;
  }
  return slices;
}

/**
 * Generates a multi-page PDF from the given container element.
 *
 * @param container  The DOM element wrapping the biodata template
 * @param options    Render options
 * @returns          The generated jsPDF instance (caller can .save() or .output())
 */
export async function generateMultiPagePdf(
  container: HTMLElement,
  options: { scale?: number; quality?: number; filename?: string } = {}
): Promise<void> {
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  const scale = options.scale ?? 2;
  const quality = options.quality ?? 0.85;
  const filename = options.filename ?? "biodata.pdf";

  const slices = computePageSlices(container);
  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < slices.length; i++) {
    const slice = slices[i];

    // Capture the full container at high res
    const canvas = await html2canvas(container, {
      scale,
      useCORS: true,
      logging: false,
      y: slice.yStart,
      height: slice.height,
      windowHeight: slice.height,
    });

    const imgData = canvas.toDataURL("image/jpeg", quality);

    // Calculate the image dimensions to fit A4 width, preserving aspect ratio
    const imgAspect = canvas.width / canvas.height;
    const pageWidth = A4_WIDTH_MM;
    const pageHeight = pageWidth / imgAspect;

    // Use the smaller of calculated height or full A4 height
    const finalHeight = Math.min(pageHeight, A4_HEIGHT_MM);

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, finalHeight);
  }

  pdf.save(filename);
}
