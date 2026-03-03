/**
 * Decorative border patterns — full-page frames and edge decorations.
 */

interface BorderProps {
  color?: string;
  secondaryColor?: string;
  className?: string;
}

/** Full-page ornamental border frame with corner flourishes */
export function OrnamentalFrame({
  color = "currentColor",
  secondaryColor,
  className,
}: BorderProps) {
  const sc = secondaryColor || color;
  return (
    <div className={`absolute inset-0 pointer-events-none ${className || ""}`}>
      {/* Outer thin line */}
      <div
        className="absolute inset-[8px] border"
        style={{ borderColor: `${color}20` }}
      />
      {/* Inner thicker line */}
      <div
        className="absolute inset-[12px] border-2"
        style={{ borderColor: `${color}15` }}
      />

      {/* Top-left corner flourish */}
      <svg
        className="absolute top-[4px] left-[4px]"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          d="M5 5 L5 25 C5 18, 8 12, 15 8 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 L25 5 C18 5, 12 8, 8 15 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 C5 5, 8 15, 15 22"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M5 5 C5 5, 15 8, 22 15"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" fill={sc} fillOpacity="0.2" />
      </svg>

      {/* Top-right corner flourish */}
      <svg
        className="absolute top-[4px] right-[4px]"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        style={{ transform: "scaleX(-1)" }}
      >
        <path
          d="M5 5 L5 25 C5 18, 8 12, 15 8 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 L25 5 C18 5, 12 8, 8 15 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 C5 5, 8 15, 15 22"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M5 5 C5 5, 15 8, 22 15"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" fill={sc} fillOpacity="0.2" />
      </svg>

      {/* Bottom-left corner flourish */}
      <svg
        className="absolute bottom-[4px] left-[4px]"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        style={{ transform: "scaleY(-1)" }}
      >
        <path
          d="M5 5 L5 25 C5 18, 8 12, 15 8 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 L25 5 C18 5, 12 8, 8 15 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 C5 5, 8 15, 15 22"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M5 5 C5 5, 15 8, 22 15"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" fill={sc} fillOpacity="0.2" />
      </svg>

      {/* Bottom-right corner flourish */}
      <svg
        className="absolute bottom-[4px] right-[4px]"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        style={{ transform: "scale(-1, -1)" }}
      >
        <path
          d="M5 5 L5 25 C5 18, 8 12, 15 8 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 L25 5 C18 5, 12 8, 8 15 L5 5Z"
          fill={sc}
          fillOpacity="0.1"
        />
        <path
          d="M5 5 C5 5, 8 15, 15 22"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M5 5 C5 5, 15 8, 22 15"
          stroke={sc}
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" fill={sc} fillOpacity="0.2" />
      </svg>
    </div>
  );
}

/** Double-line border with gold accent — traditional Indian wedding card style */
export function WeddingCardBorder({
  color = "#800020",
  secondaryColor = "#D4AF37",
  className,
}: BorderProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className || ""}`}>
      {/* Outer gold line */}
      <div
        className="absolute inset-[6px] border"
        style={{ borderColor: secondaryColor, opacity: 0.4 }}
      />
      {/* Inner colored line */}
      <div
        className="absolute inset-[10px] border"
        style={{ borderColor: color, opacity: 0.25 }}
      />
      {/* Innermost gold thin line */}
      <div
        className="absolute inset-[14px] border"
        style={{ borderColor: secondaryColor, opacity: 0.2 }}
      />

      {/* Corner gold dots */}
      {[
        "top-[3px] left-[3px]",
        "top-[3px] right-[3px]",
        "bottom-[3px] left-[3px]",
        "bottom-[3px] right-[3px]",
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} w-2 h-2 rounded-full`}
          style={{ backgroundColor: secondaryColor, opacity: 0.3 }}
        />
      ))}
    </div>
  );
}

/** Geometric Islamic border — interlocking pattern */
export function IslamicBorder({
  color = "#006400",
  secondaryColor = "#D4AF37",
  className,
}: BorderProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className || ""}`}>
      {/* Outer line */}
      <div
        className="absolute inset-[6px] border-2"
        style={{ borderColor: `${color}25` }}
      />
      {/* Inner line */}
      <div
        className="absolute inset-[12px] border"
        style={{ borderColor: `${secondaryColor}30` }}
      />

      {/* Corner geometric stars */}
      {[
        { top: "2px", left: "2px" },
        { top: "2px", right: "2px" },
        { bottom: "2px", left: "2px" },
        { bottom: "2px", right: "2px" },
      ].map((pos, i) => (
        <svg
          key={i}
          className="absolute"
          style={{
            ...pos,
            transform: i === 1 ? "scaleX(-1)" : i === 2 ? "scaleY(-1)" : i === 3 ? "scale(-1)" : undefined,
          } as React.CSSProperties}
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          {/* 8-pointed star */}
          <path
            d="M20 4 L23 15 L34 12 L25 20 L34 28 L23 25 L20 36 L17 25 L6 28 L15 20 L6 12 L17 15 Z"
            fill={secondaryColor}
            fillOpacity="0.15"
            stroke={secondaryColor}
            strokeWidth="0.4"
            strokeOpacity="0.3"
          />
        </svg>
      ))}
    </div>
  );
}
