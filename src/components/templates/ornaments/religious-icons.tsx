/**
 * Religious icons for biodata template headers.
 * Respectful, refined silhouette-style designs.
 */

interface IconProps {
  color?: string;
  className?: string;
  size?: number;
}

/** Lord Ganesha — stylized silhouette for Hindu biodata headers */
export function GaneshIcon({ color = "currentColor", className, size = 60 }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown/headpiece */}
      <path
        d="M40 8 L36 16 L32 12 L30 18 L28 14 L26 20 L34 20 L40 14 L46 20 L54 20 L52 14 L50 18 L48 12 L44 16 Z"
        fillOpacity="0.8"
      />
      {/* Head */}
      <ellipse cx="40" cy="30" rx="14" ry="12" fillOpacity="0.85" />
      {/* Left ear */}
      <ellipse cx="22" cy="28" rx="6" ry="9" fillOpacity="0.7" />
      {/* Right ear */}
      <ellipse cx="58" cy="28" rx="6" ry="9" fillOpacity="0.7" />
      {/* Trunk curving left */}
      <path
        d="M36 36 C34 42, 28 48, 24 52 C22 54, 24 56, 26 55 C28 54, 32 50, 34 46"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Body */}
      <ellipse cx="40" cy="52" rx="16" ry="14" fillOpacity="0.75" />
      {/* Belly line */}
      <path
        d="M34 48 Q40 56, 46 48"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />
      {/* Left arm holding modak */}
      <path
        d="M26 46 C20 48, 18 52, 20 54"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="55" r="3" fillOpacity="0.6" />
      {/* Right arm raised */}
      <path
        d="M54 46 C60 44, 62 40, 60 38"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Base/seat */}
      <ellipse cx="40" cy="66" rx="20" ry="5" fillOpacity="0.4" />
      {/* Feet */}
      <ellipse cx="30" cy="64" rx="5" ry="3" fillOpacity="0.6" />
      <ellipse cx="50" cy="64" rx="5" ry="3" fillOpacity="0.6" />
    </svg>
  );
}

/** Om Symbol — decorative version */
export function OmIcon({ color = "currentColor", className, size = 40 }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 38 C12 38, 8 32, 10 26 C12 20, 18 18, 22 20 C26 22, 26 28, 22 30 C18 32, 16 28, 18 26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 30 C28 34, 36 36, 40 32 C44 28, 44 22, 40 18 C36 14, 30 14, 26 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 18 C44 14, 48 16, 48 20 C48 24, 44 28, 40 32 C38 34, 36 38, 38 42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Top arc and dot */}
      <path
        d="M38 16 C42 10, 48 10, 50 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="10" r="2" fill={color} />
    </svg>
  );
}

/** Crescent and Star — for Muslim biodata */
export function CrescentStarIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crescent */}
      <path
        d="M22 10 C10 16, 6 32, 16 44 C26 56, 44 54, 50 42 C40 50, 24 46, 20 34 C16 22, 22 14, 22 10Z"
        fillOpacity="0.8"
      />
      {/* Star */}
      <path
        d="M44 18 L45.5 22.5 L50 23 L46.5 26 L47.5 30.5 L44 28 L40.5 30.5 L41.5 26 L38 23 L42.5 22.5 Z"
        fillOpacity="0.9"
      />
    </svg>
  );
}

/** Khanda — Sikh emblem */
export function KhandaIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chakra (circle) */}
      <circle cx="40" cy="40" r="18" stroke={color} strokeWidth="2.5" />
      {/* Central Khanda (double-edged sword) */}
      <line x1="40" y1="8" x2="40" y2="72" stroke={color} strokeWidth="2.5" />
      <path d="M37 8 L40 4 L43 8" fill={color} />
      {/* Sword blade edges */}
      <path
        d="M38 12 L40 8 L42 12 L42 68 L40 72 L38 68 Z"
        fill={color}
        fillOpacity="0.15"
      />
      {/* Left Kirpan */}
      <path
        d="M14 16 C20 20, 24 28, 24 40 C24 52, 20 60, 14 64"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 14 L14 16 L16 14" fill={color} />
      {/* Right Kirpan */}
      <path
        d="M66 16 C60 20, 56 28, 56 40 C56 52, 60 60, 66 64"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M64 14 L66 16 L68 14" fill={color} />
    </svg>
  );
}

/** Latin Cross — decorative version for Christian biodata */
export function CrossIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 80"
      width={size}
      height={(80 / 60) * size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main cross with flared ends */}
      <path
        d="M27 5 L33 5 L33 25 L50 25 L50 35 L33 35 L33 72 L27 72 L27 35 L10 35 L10 25 L27 25 Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="1"
      />
      {/* Flared tips */}
      <path d="M25 5 L30 2 L35 5" stroke={color} strokeWidth="0.8" />
      <path d="M25 72 L30 75 L35 72" stroke={color} strokeWidth="0.8" />
      <path d="M10 23 L7 30 L10 37" stroke={color} strokeWidth="0.8" />
      <path d="M50 23 L53 30 L50 37" stroke={color} strokeWidth="0.8" />
      {/* Center intersection detail */}
      <circle cx="30" cy="30" r="4" stroke={color} strokeWidth="0.6" />
      <circle cx="30" cy="30" r="1.5" fill={color} fillOpacity="0.3" />
      {/* Small vine flourishes */}
      <path
        d="M33 45 C38 43, 40 46, 38 48"
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <path
        d="M27 50 C22 48, 20 51, 22 53"
        stroke={color}
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
