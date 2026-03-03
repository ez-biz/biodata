/**
 * Floral corner ornament — vine with flowers, leaves, and tendrils.
 * Use CSS transform to mirror for all four corners.
 */
interface Props {
  color?: string;
  opacity?: number;
  className?: string;
  size?: number;
}

export function FloralCorner({
  color = "currentColor",
  opacity = 1,
  className,
  size = 150,
}: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main vine curve from corner */}
      <path
        d="M5 5 C20 5, 40 15, 55 35 C70 55, 75 80, 80 110 C85 130, 95 150, 120 165"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Secondary vine branch */}
      <path
        d="M5 5 C5 20, 15 40, 35 55 C55 70, 80 75, 110 80 C130 85, 150 95, 165 120"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Large flower at (65, 65) — lotus-inspired */}
      <path
        d="M65 50 Q72 58 65 68 Q58 58 65 50Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="0.6"
      />
      <path
        d="M50 60 Q58 60 65 68 Q58 68 50 60Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="0.6"
      />
      <path
        d="M80 60 Q72 60 65 68 Q72 68 80 60Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="0.6"
      />
      <path
        d="M55 52 Q60 58 65 68 Q58 62 55 52Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M75 52 Q70 58 65 68 Q72 62 75 52Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="0.5"
      />
      <circle cx="65" cy="66" r="3" fill={color} fillOpacity="0.35" />

      {/* Medium flower at (110, 100) */}
      <path
        d="M110 88 Q115 94 110 102 Q105 94 110 88Z"
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M100 93 Q105 93 110 102 Q105 98 100 93Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M120 93 Q115 93 110 102 Q115 98 120 93Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="0.5"
      />
      <circle cx="110" cy="100" r="2" fill={color} fillOpacity="0.3" />

      {/* Small flower/bud at (100, 145) */}
      <path
        d="M100 138 Q104 142 100 148 Q96 142 100 138Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="0.5"
      />
      <circle cx="100" cy="146" r="1.5" fill={color} fillOpacity="0.3" />

      {/* Leaves along the main vine */}
      <path
        d="M35 20 Q45 25 40 35"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M35 20 Q38 30 40 35"
        stroke={color}
        strokeWidth="0.4"
      />

      <path
        d="M20 35 Q25 45 35 40"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M20 35 Q30 38 35 40"
        stroke={color}
        strokeWidth="0.4"
      />

      <path
        d="M70 85 Q82 82 78 95"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />

      <path
        d="M85 72 Q82 82 95 78"
        stroke={color}
        strokeWidth="0.7"
        strokeLinecap="round"
      />

      {/* Curling tendrils */}
      <path
        d="M130 168 C138 170, 142 165, 140 158"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <path
        d="M168 130 C170 138, 165 142, 158 140"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
      />

      {/* Decorative dots */}
      <circle cx="25" cy="12" r="1.5" fill={color} fillOpacity="0.3" />
      <circle cx="12" cy="25" r="1.5" fill={color} fillOpacity="0.3" />
      <circle cx="92" cy="120" r="1" fill={color} fillOpacity="0.25" />
      <circle cx="120" cy="130" r="1" fill={color} fillOpacity="0.25" />
      <circle cx="140" cy="155" r="1.2" fill={color} fillOpacity="0.2" />
      <circle cx="155" cy="140" r="1.2" fill={color} fillOpacity="0.2" />
    </svg>
  );
}
