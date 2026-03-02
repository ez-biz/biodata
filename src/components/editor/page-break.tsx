"use client";

/**
 * PageBreak component — renders a visual page-break indicator in preview mode.
 * In the rendered template, it outputs a div with the `page-break` CSS class
 * which the PDF pagination utility uses to detect forced page boundaries.
 *
 * The visual indicator is only shown in preview; it collapses in the PDF
 * capture because the pagination utility splits on `.page-break` markers.
 */
export function PageBreak({ label }: { label?: string }) {
  return (
    <div
      className="page-break"
      data-page-break="true"
      style={{ breakAfter: "page" }}
    >
      {/* Visual indicator shown only in on-screen preview */}
      <div className="page-break-indicator">
        <div className="page-break-line" />
        <span className="page-break-label">
          {label || "Page Break"}
        </span>
        <div className="page-break-line" />
      </div>
    </div>
  );
}
