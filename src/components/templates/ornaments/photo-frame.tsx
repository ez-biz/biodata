/**
 * Decorative photo frame overlays — wraps around profile photos
 * for a polished, premium look.
 */
import React from "react";

interface FrameProps {
  children: React.ReactNode;
  color?: string;
  secondaryColor?: string;
  className?: string;
}

/** Circular frame with ornamental double ring and dots */
export function OrnateCircleFrame({
  children,
  color = "#800020",
  secondaryColor = "#D4AF37",
  className,
}: FrameProps) {
  return (
    <div className={`relative inline-block ${className || ""}`}>
      {/* Outer decorative ring */}
      <div
        className="absolute -inset-2 rounded-full border"
        style={{ borderColor: `${secondaryColor}40` }}
      />
      {/* Middle ring with dots */}
      <div
        className="absolute -inset-1 rounded-full border-2"
        style={{ borderColor: `${color}30` }}
      />
      {/* Inner content */}
      <div className="relative rounded-full overflow-hidden">{children}</div>
      {/* Cardinal point dots */}
      {[
        { top: "-6px", left: "50%", transform: "translateX(-50%)" },
        { bottom: "-6px", left: "50%", transform: "translateX(-50%)" },
        { left: "-6px", top: "50%", transform: "translateY(-50%)" },
        { right: "-6px", top: "50%", transform: "translateY(-50%)" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ ...pos, backgroundColor: secondaryColor, opacity: 0.5 } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/** Rectangular frame with arch top and decorative molding */
export function ArchFrame({
  children,
  color = "#800020",
  secondaryColor = "#D4AF37",
  className,
}: FrameProps) {
  return (
    <div className={`relative inline-block ${className || ""}`}>
      {/* Outer frame line */}
      <div
        className="absolute -inset-2 rounded-t-full rounded-b-md border"
        style={{ borderColor: `${secondaryColor}40` }}
      />
      {/* Inner frame */}
      <div
        className="absolute -inset-1 rounded-t-full rounded-b-sm border-2"
        style={{ borderColor: `${color}25` }}
      />
      {/* Content with arch shape */}
      <div className="relative rounded-t-full rounded-b-sm overflow-hidden">
        {children}
      </div>
      {/* Top center ornament dot */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{ backgroundColor: secondaryColor, opacity: 0.4 }}
      />
    </div>
  );
}

/** Simple elegant frame — thin border with subtle shadow */
export function ElegantFrame({
  children,
  color = "#800020",
  className,
}: FrameProps) {
  return (
    <div className={`relative inline-block ${className || ""}`}>
      <div
        className="absolute -inset-1.5 rounded-md"
        style={{
          border: `1px solid ${color}20`,
          boxShadow: `0 2px 8px ${color}10, 0 0 0 1px ${color}08`,
        }}
      />
      <div className="relative rounded-md overflow-hidden">{children}</div>
    </div>
  );
}
