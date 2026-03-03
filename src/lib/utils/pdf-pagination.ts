/**
 * Multi-page PDF generation utility.
 *
 * Renders biodata templates in an offscreen container at exact A4 pixel
 * dimensions for sharp, print-quality PDF output.
 *
 * Key design: The preview panel renders at whatever width the UI gives it,
 * but PDF capture renders at full A4 width (794px) in a hidden offscreen
 * container to ensure consistent layout and high-resolution output.
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
 * Captures a high-quality PDF from an offscreen container.
 *
 * This clones the visible content into a hidden container at exact A4 width,
 * waits for layout, then captures each page slice at high resolution using
 * PNG format for crisp text rendering.
 */
export async function captureHighQualityPdf(
  sourceElement: HTMLElement,
  options: {
    scale?: number;
    filename?: string;
    showWatermark?: boolean;
  } = {}
): Promise<void> {
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  const scale = options.scale ?? 3;
  const filename = options.filename ?? "biodata.pdf";

  // 1. Create an offscreen container at exact A4 pixel width
  const offscreen = document.createElement("div");
  offscreen.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${A4_WIDTH_PX}px;
    overflow: hidden;
    background: white;
    z-index: -1;
  `;
  document.body.appendChild(offscreen);

  // 2. Clone the source content into the offscreen container
  const clone = sourceElement.cloneNode(true) as HTMLElement;
  // Reset any transforms that the preview panel applies (e.g., translateY for page nav)
  clone.style.transform = "none";
  clone.style.transition = "none";
  clone.style.width = "100%";
  offscreen.appendChild(clone);

  // 3. Wait for layout to settle (fonts, images)
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 4. Compute page slices on the offscreen container
  const slices = computePageSlices(offscreen);
  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < slices.length; i++) {
    const slice = slices[i];

    const canvas = await html2canvas(offscreen, {
      scale,
      useCORS: true,
      logging: false,
      y: slice.yStart,
      height: Math.min(slice.height, A4_HEIGHT_PX),
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight: Math.min(slice.height, A4_HEIGHT_PX),
      backgroundColor: "#ffffff",
    });

    // Use PNG for text sharpness (no JPEG compression artifacts)
    const imgData = canvas.toDataURL("image/png");

    // Calculate dimensions to fill A4 page
    const imgAspect = canvas.width / canvas.height;
    const imgHeight = Math.min(A4_WIDTH_MM / imgAspect, A4_HEIGHT_MM);

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH_MM, imgHeight);

    // Add watermark if needed
    if (options.showWatermark) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(40);
      // Semi-transparent watermark via GState
      const gState = pdf.GState({ opacity: 0.06 });
      pdf.saveGraphicsState();
      pdf.setGState(gState);
      // Rotate and center the watermark text
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const centerX = pageW / 2;
      const centerY = pageH / 2;
      pdf.text("BiodataCraft.in", centerX, centerY, {
        align: "center",
        angle: 30,
      });
      pdf.restoreGraphicsState();
    }
  }

  // 5. Cleanup offscreen container
  document.body.removeChild(offscreen);

  pdf.save(filename);
}
