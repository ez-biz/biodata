/**
 * Ornamental section dividers — horizontal decorative separators
 * for use between biodata sections.
 */

interface DividerProps {
  color?: string;
  secondaryColor?: string;
  className?: string;
  width?: number;
}

/** Lotus bud center with tapering flourish lines */
export function LotusDivider({
  color = "currentColor",
  className,
  width = 500,
}: DividerProps) {
  return (
    <svg
      viewBox="0 0 500 30"
      width={width}
      height={(30 / 500) * width}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left tapering line */}
      <path
        d="M10 15 Q80 15, 200 15"
        stroke={color}
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <path
        d="M50 15 Q120 14, 210 15"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />

      {/* Center lotus bud */}
      <path
        d="M250 5 Q258 12 250 20 Q242 12 250 5Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="0.6"
      />
      <path
        d="M240 8 Q245 12 250 20 Q247 14 240 8Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="0.4"
      />
      <path
        d="M260 8 Q255 12 250 20 Q253 14 260 8Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle cx="250" cy="18" r="1.5" fill={color} fillOpacity="0.35" />

      {/* Small dots flanking center */}
      <circle cx="230" cy="15" r="1.2" fill={color} fillOpacity="0.3" />
      <circle cx="270" cy="15" r="1.2" fill={color} fillOpacity="0.3" />
      <circle cx="218" cy="15" r="0.8" fill={color} fillOpacity="0.2" />
      <circle cx="282" cy="15" r="0.8" fill={color} fillOpacity="0.2" />

      {/* Right tapering line */}
      <path
        d="M290 15 Q420 15, 490 15"
        stroke={color}
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <path
        d="M290 15 Q380 16, 450 15"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Diamond cluster center with ornamental lines */
export function DiamondDivider({
  color = "currentColor",
  className,
  width = 500,
}: DividerProps) {
  return (
    <svg
      viewBox="0 0 500 24"
      width={width}
      height={(24 / 500) * width}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left line with curve */}
      <path
        d="M20 12 C80 12, 140 10, 220 12"
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M20 12 C80 12, 140 14, 220 12"
        stroke={color}
        strokeWidth="0.5"
      />

      {/* Center diamond cluster */}
      <rect
        x="245"
        y="7"
        width="10"
        height="10"
        transform="rotate(45 250 12)"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="0.6"
      />
      <rect
        x="231"
        y="9"
        width="6"
        height="6"
        transform="rotate(45 234 12)"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="0.4"
      />
      <rect
        x="263"
        y="9"
        width="6"
        height="6"
        transform="rotate(45 266 12)"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="0.4"
      />

      {/* Right line with curve */}
      <path
        d="M280 12 C360 10, 420 12, 480 12"
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M280 12 C360 14, 420 12, 480 12"
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
}

/** Simple flourish — elegant swirl with center dot */
export function FlourishDivider({
  color = "currentColor",
  className,
  width = 500,
}: DividerProps) {
  return (
    <svg
      viewBox="0 0 500 20"
      width={width}
      height={(20 / 500) * width}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left flourish */}
      <path
        d="M60 10 C100 10, 140 4, 200 4 C220 4, 235 7, 245 10"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        d="M100 10 C130 10, 160 16, 210 16 C230 16, 240 13, 245 10"
        stroke={color}
        strokeWidth="0.4"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx="250" cy="10" r="2.5" fill={color} fillOpacity="0.3" />
      <circle cx="250" cy="10" r="1" fill={color} fillOpacity="0.5" />

      {/* Right flourish (mirror) */}
      <path
        d="M440 10 C400 10, 360 4, 300 4 C280 4, 265 7, 255 10"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        d="M400 10 C370 10, 340 16, 290 16 C270 16, 260 13, 255 10"
        stroke={color}
        strokeWidth="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Minimal line with small ornamental endpoints — for modern templates */
export function MinimalDivider({
  color = "currentColor",
  className,
  width = 500,
}: DividerProps) {
  return (
    <svg
      viewBox="0 0 500 12"
      width={width}
      height={(12 / 500) * width}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="100"
        y1="6"
        x2="400"
        y2="6"
        stroke={color}
        strokeWidth="0.4"
      />
      <circle cx="100" cy="6" r="1.5" fill={color} fillOpacity="0.3" />
      <circle cx="250" cy="6" r="2" fill={color} fillOpacity="0.2" />
      <circle cx="400" cy="6" r="1.5" fill={color} fillOpacity="0.3" />
    </svg>
  );
}
