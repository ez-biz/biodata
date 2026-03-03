/**
 * Intricate mandala background — used as a subtle watermark behind biodata content.
 * Renders at low opacity for an elegant, traditional Indian feel.
 */
interface Props {
  color?: string;
  opacity?: number;
  className?: string;
  size?: number;
}

export function MandalaBg({
  color = "#800020",
  opacity = 0.05,
  className,
  size = 600,
}: Props) {
  return (
    <svg
      viewBox="0 0 600 600"
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outermost ring — dotted circle */}
      <circle cx="300" cy="300" r="290" stroke={color} strokeWidth="0.5" strokeDasharray="3 6" />
      <circle cx="300" cy="300" r="280" stroke={color} strokeWidth="0.3" />

      {/* Outer petal ring — 16 large petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={`outer-${i}`} transform={`rotate(${angle} 300 300)`}>
            <path
              d="M300 30 Q330 120 300 200 Q270 120 300 30Z"
              fill={color}
              fillOpacity="0.15"
            />
            <path
              d="M300 50 Q320 120 300 190 Q280 120 300 50Z"
              stroke={color}
              strokeWidth="0.5"
            />
          </g>
        );
      })}

      {/* Middle ring border */}
      <circle cx="300" cy="300" r="200" stroke={color} strokeWidth="0.8" />
      <circle cx="300" cy="300" r="195" stroke={color} strokeWidth="0.3" strokeDasharray="2 4" />

      {/* Middle petal ring — 12 medium petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <g key={`mid-${i}`} transform={`rotate(${angle} 300 300)`}>
            <path
              d="M300 115 Q322 170 300 220 Q278 170 300 115Z"
              fill={color}
              fillOpacity="0.12"
            />
            <path
              d="M300 125 Q315 170 300 210 Q285 170 300 125Z"
              stroke={color}
              strokeWidth="0.5"
            />
            {/* Small teardrop between petals */}
            <ellipse
              cx="300"
              cy="105"
              rx="3"
              ry="6"
              fill={color}
              fillOpacity="0.3"
            />
          </g>
        );
      })}

      {/* Inner ring border */}
      <circle cx="300" cy="300" r="145" stroke={color} strokeWidth="0.6" />

      {/* Inner lotus ring — 8 petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <g key={`inner-${i}`} transform={`rotate(${angle} 300 300)`}>
            <path
              d="M300 165 Q318 210 300 255 Q282 210 300 165Z"
              fill={color}
              fillOpacity="0.1"
            />
            <path
              d="M300 175 Q312 210 300 245 Q288 210 300 175Z"
              stroke={color}
              strokeWidth="0.5"
            />
          </g>
        );
      })}

      {/* Center ring */}
      <circle cx="300" cy="300" r="100" stroke={color} strokeWidth="0.5" />

      {/* Innermost — 8-pointed star lattice */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <g key={`star-${i}`} transform={`rotate(${angle} 300 300)`}>
            <line
              x1="300"
              y1="210"
              x2="300"
              y2="260"
              stroke={color}
              strokeWidth="0.4"
            />
          </g>
        );
      })}

      {/* Center circle and dot */}
      <circle cx="300" cy="300" r="60" stroke={color} strokeWidth="0.6" />
      <circle cx="300" cy="300" r="55" stroke={color} strokeWidth="0.3" strokeDasharray="1.5 3" />
      <circle cx="300" cy="300" r="25" fill={color} fillOpacity="0.15" />
      <circle cx="300" cy="300" r="8" fill={color} fillOpacity="0.25" />

      {/* Decorative dots on outer ring */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * 360) / 32;
        const rad = (angle * Math.PI) / 180;
        const cx = 300 + 265 * Math.cos(rad);
        const cy = 300 + 265 * Math.sin(rad);
        return (
          <circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r="2"
            fill={color}
            fillOpacity="0.3"
          />
        );
      })}
    </svg>
  );
}
