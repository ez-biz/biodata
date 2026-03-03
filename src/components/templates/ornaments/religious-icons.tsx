/**
 * Religious icons for biodata template headers.
 * Respectful, refined silhouette-style designs.
 */
import { type ReactNode } from "react";

export interface IconProps {
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

/** Lord Shiva — trident (trishul) with crescent moon */
export function ShivaIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 80" width={size} height={(80 / 60) * size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trishul shaft */}
      <line x1="30" y1="16" x2="30" y2="74" stroke={color} strokeWidth="2" />
      {/* Center prong */}
      <path d="M28 16 L30 6 L32 16" fill={color} fillOpacity="0.8" />
      {/* Left prong */}
      <path d="M14 22 C18 18, 24 16, 26 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 20 L14 14 L16 20" fill={color} fillOpacity="0.7" />
      {/* Right prong */}
      <path d="M46 22 C42 18, 36 16, 34 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44 20 L46 14 L48 20" fill={color} fillOpacity="0.7" />
      {/* Crescent moon on shaft */}
      <path d="M24 28 C22 24, 26 20, 30 22 C27 21, 24 24, 24 28Z" fill={color} fillOpacity="0.5" />
      {/* Damru (small drum) */}
      <path d="M26 34 L28 38 L32 38 L34 34 L32 36 L28 36 Z" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

/** Lord Krishna — flute silhouette with peacock feather */
export function KrishnaIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Flute (horizontal bansuri) */}
      <rect x="8" y="28" width="44" height="5" rx="2.5" fillOpacity="0.7" />
      {/* Flute holes */}
      <circle cx="18" cy="30.5" r="1.2" fill={color} fillOpacity="0.3" />
      <circle cx="26" cy="30.5" r="1.2" fill={color} fillOpacity="0.3" />
      <circle cx="34" cy="30.5" r="1.2" fill={color} fillOpacity="0.3" />
      <circle cx="42" cy="30.5" r="1.2" fill={color} fillOpacity="0.3" />
      {/* Peacock feather — stem */}
      <path d="M30 28 C32 20, 28 12, 30 6" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" />
      {/* Feather eye (oval) */}
      <ellipse cx="30" cy="12" rx="5" ry="7" fillOpacity="0.25" />
      <ellipse cx="30" cy="12" rx="2.5" ry="4" fillOpacity="0.5" />
      <ellipse cx="30" cy="12" rx="1" ry="2" fillOpacity="0.75" />
      {/* Feather plumes */}
      <path d="M25 12 C20 8, 22 4, 26 6" stroke={color} strokeWidth="0.6" fill="none" />
      <path d="M35 12 C40 8, 38 4, 34 6" stroke={color} strokeWidth="0.6" fill="none" />
    </svg>
  );
}

/** Lord Hanuman — stylized mace (gada) silhouette */
export function HanumanIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 80" width={size} height={(80 / 60) * size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Mace shaft */}
      <rect x="28" y="24" width="4" height="48" rx="2" fillOpacity="0.7" />
      {/* Mace head (heavy top) */}
      <ellipse cx="30" cy="16" rx="10" ry="12" fillOpacity="0.6" />
      <ellipse cx="30" cy="12" rx="7" ry="8" fillOpacity="0.8" />
      {/* Decorative ring on shaft */}
      <rect x="26" y="28" width="8" height="3" rx="1.5" fillOpacity="0.5" />
      {/* Small top spike */}
      <path d="M28 6 L30 2 L32 6" fillOpacity="0.7" />
    </svg>
  );
}

/** Goddess Lakshmi — lotus with coins silhouette */
export function LakshmiIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Central lotus */}
      <ellipse cx="30" cy="28" rx="5" ry="4" fillOpacity="0.8" />
      {/* Petals */}
      <ellipse cx="30" cy="18" rx="4" ry="8" fillOpacity="0.4" />
      <ellipse cx="30" cy="38" rx="4" ry="8" fillOpacity="0.4" />
      <ellipse cx="20" cy="28" rx="8" ry="4" fillOpacity="0.4" />
      <ellipse cx="40" cy="28" rx="8" ry="4" fillOpacity="0.4" />
      {/* Diagonal petals */}
      <ellipse cx="22" cy="20" rx="3" ry="7" fillOpacity="0.3" transform="rotate(-45 22 20)" />
      <ellipse cx="38" cy="20" rx="3" ry="7" fillOpacity="0.3" transform="rotate(45 38 20)" />
      <ellipse cx="22" cy="36" rx="3" ry="7" fillOpacity="0.3" transform="rotate(45 22 36)" />
      <ellipse cx="38" cy="36" rx="3" ry="7" fillOpacity="0.3" transform="rotate(-45 38 36)" />
      {/* Coins falling from sides */}
      <circle cx="10" cy="42" r="4" fillOpacity="0.35" />
      <circle cx="50" cy="42" r="4" fillOpacity="0.35" />
      <circle cx="14" cy="50" r="3" fillOpacity="0.25" />
      <circle cx="46" cy="50" r="3" fillOpacity="0.25" />
    </svg>
  );
}

/** Goddess Durga — trishul and shield silhouette */
export function DurgaIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 70" width={size} height={(70 / 60) * size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path d="M30 18 C16 18, 10 30, 12 42 C14 52, 22 58, 30 60 C38 58, 46 52, 48 42 C50 30, 44 18, 30 18Z" fillOpacity="0.2" stroke={color} strokeWidth="1.2" fill="none" />
      {/* Central trishul */}
      <line x1="30" y1="24" x2="30" y2="54" stroke={color} strokeWidth="1.8" />
      <path d="M28 24 L30 18 L32 24" fill={color} fillOpacity="0.8" />
      <path d="M22 28 C24 25, 28 24, 29 25" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M20 27 L22 22 L24 27" fill={color} fillOpacity="0.6" />
      <path d="M38 28 C36 25, 32 24, 31 25" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M36 27 L38 22 L40 27" fill={color} fillOpacity="0.6" />
      {/* Lion silhouette at base */}
      <ellipse cx="30" cy="50" rx="8" ry="4" fillOpacity="0.3" />
    </svg>
  );
}

/** Goddess Saraswati — veena silhouette */
export function SaraswatiIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 70" width={size} height={(70 / 60) * size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Veena body (gourd shape) */}
      <ellipse cx="18" cy="52" rx="10" ry="12" fillOpacity="0.5" />
      <ellipse cx="44" cy="18" rx="7" ry="9" fillOpacity="0.4" />
      {/* Veena neck */}
      <line x1="22" y1="42" x2="40" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Strings */}
      <line x1="20" y1="42" x2="42" y2="16" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
      <line x1="24" y1="44" x2="44" y2="20" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
      {/* Tuning pegs */}
      <circle cx="44" cy="12" r="1.5" fillOpacity="0.6" />
      <circle cx="48" cy="14" r="1.5" fillOpacity="0.6" />
      {/* Book below (knowledge) */}
      <rect x="8" y="62" width="14" height="3" rx="1" fillOpacity="0.3" />
    </svg>
  );
}

/** Radha-Krishna — intertwined flutes forming heart */
export function RadhaKrishnaIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart shape from two flutes */}
      <path
        d="M30 52 C20 44, 6 36, 6 24 C6 16, 12 10, 18 10 C24 10, 28 14, 30 18 C32 14, 36 10, 42 10 C48 10, 54 16, 54 24 C54 36, 40 44, 30 52Z"
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        fillOpacity="0.15"
      />
      {/* Left flute */}
      <rect x="14" y="26" width="16" height="3" rx="1.5" fill={color} fillOpacity="0.7" />
      <circle cx="18" cy="27.5" r="0.8" fill={color} fillOpacity="0.3" />
      <circle cx="22" cy="27.5" r="0.8" fill={color} fillOpacity="0.3" />
      <circle cx="26" cy="27.5" r="0.8" fill={color} fillOpacity="0.3" />
      {/* Right flute */}
      <rect x="30" y="26" width="16" height="3" rx="1.5" fill={color} fillOpacity="0.7" />
      <circle cx="34" cy="27.5" r="0.8" fill={color} fillOpacity="0.3" />
      <circle cx="38" cy="27.5" r="0.8" fill={color} fillOpacity="0.3" />
      <circle cx="42" cy="27.5" r="0.8" fill={color} fillOpacity="0.3" />
      {/* Peacock feather */}
      <path d="M30 26 C30 20, 28 14, 30 10" stroke={color} strokeWidth="0.8" />
      <ellipse cx="30" cy="14" rx="2" ry="3.5" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

/** Mahavir — Jain hand with Ahimsa wheel */
export function MahavirIcon({ color = "currentColor", className, size = 50 }: IconProps) {
  return (
    <svg viewBox="0 0 60 70" width={size} height={(70 / 60) * size} className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Open palm */}
      <path
        d="M22 60 L22 30 C22 26, 24 24, 26 24 L26 14 C26 12, 28 12, 28 14 L28 24 L30 24 L30 12 C30 10, 32 10, 32 12 L32 24 L34 24 L34 14 C34 12, 36 12, 36 14 L36 24 C38 24, 40 26, 40 30 L40 36 C42 34, 44 34, 44 36 L44 44 C44 52, 38 60, 30 62 Z"
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      {/* Ahimsa wheel in palm */}
      <circle cx="31" cy="38" r="7" stroke={color} strokeWidth="1" fill="none" />
      {/* Wheel spokes */}
      <line x1="31" y1="31" x2="31" y2="45" stroke={color} strokeWidth="0.6" />
      <line x1="24" y1="38" x2="38" y2="38" stroke={color} strokeWidth="0.6" />
      <line x1="26" y1="33" x2="36" y2="43" stroke={color} strokeWidth="0.6" />
      <line x1="36" y1="33" x2="26" y2="43" stroke={color} strokeWidth="0.6" />
      {/* Center dot */}
      <circle cx="31" cy="38" r="1.5" fillOpacity="0.6" />
    </svg>
  );
}

// ─── Deity Options Config ───────────────────────────────────────────

export interface DeityOption {
  id: string;
  label: string;
  religions: string[];
  mantra?: string;
}

export const DEITY_OPTIONS: DeityOption[] = [
  { id: "ganesha", label: "Ganesha", religions: ["Hindu"], mantra: "|| \u0936\u094D\u0930\u0940 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903 ||" },
  { id: "om", label: "Om", religions: ["Hindu", "Jain", "Buddhist"], mantra: "\u0950" },
  { id: "shiva", label: "Shiva", religions: ["Hindu"], mantra: "|| \u0913\u092E \u0928\u092E\u0903 \u0936\u093F\u0935\u093E\u092F ||" },
  { id: "krishna", label: "Krishna", religions: ["Hindu"], mantra: "|| \u0936\u094D\u0930\u0940 \u0915\u0943\u0937\u094D\u0923\u093E\u092F \u0928\u092E\u0903 ||" },
  { id: "hanuman", label: "Hanuman", religions: ["Hindu"], mantra: "|| \u091C\u092F \u0936\u094D\u0930\u0940 \u0930\u093E\u092E ||" },
  { id: "lakshmi", label: "Lakshmi", religions: ["Hindu"], mantra: "|| \u0936\u094D\u0930\u0940 \u092E\u0939\u093E\u0932\u0915\u094D\u0937\u094D\u092E\u0940 \u0928\u092E\u0903 ||" },
  { id: "durga", label: "Durga", religions: ["Hindu"], mantra: "|| \u091C\u092F \u092E\u093E\u0901 \u0926\u0941\u0930\u094D\u0917\u093E ||" },
  { id: "saraswati", label: "Saraswati", religions: ["Hindu"], mantra: "|| \u0936\u094D\u0930\u0940 \u0938\u0930\u0938\u094D\u0935\u0924\u0940 \u0928\u092E\u0903 ||" },
  { id: "radha-krishna", label: "Radha Krishna", religions: ["Hindu"], mantra: "|| \u0930\u093E\u0927\u0947 \u0915\u0943\u0937\u094D\u0923\u093E ||" },
  { id: "khanda", label: "Khanda", religions: ["Sikh"], mantra: "\u0A07\u0A15 \u0A13\u0A05\u0A70\u0A15\u0A3E\u0A30 \u0A38\u0A24\u0A3F \u0A28\u0A3E\u0A2E\u0A41" },
  { id: "crescent-star", label: "Crescent & Star", religions: ["Muslim"], mantra: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0647\u0650 \u0627\u0644\u0631\u0651\u064E\u062D\u0652\u0645\u064E\u0646\u0650 \u0627\u0644\u0631\u0651\u064E\u062D\u0650\u064A\u0645\u0650" },
  { id: "cross", label: "Cross", religions: ["Christian"], mantra: "In God\u2019s Grace" },
  { id: "mahavir", label: "Mahavir", religions: ["Jain"], mantra: "|| \u0928\u092E\u094B\u0915\u093E\u0930 \u092E\u0902\u0924\u094D\u0930 ||" },
];

const ICON_MAP: Record<string, (props: IconProps) => ReactNode> = {
  ganesha: GaneshIcon,
  om: OmIcon,
  shiva: ShivaIcon,
  krishna: KrishnaIcon,
  hanuman: HanumanIcon,
  lakshmi: LakshmiIcon,
  durga: DurgaIcon,
  saraswati: SaraswatiIcon,
  "radha-krishna": RadhaKrishnaIcon,
  khanda: KhandaIcon,
  "crescent-star": CrescentStarIcon,
  cross: CrossIcon,
  mahavir: MahavirIcon,
};

export interface DeityInfo {
  icon: (props: IconProps) => ReactNode;
  mantra?: string;
  label: string;
}

/** Look up a deity by ID. Returns null for "none" or unknown IDs. */
export function getDeityIcon(deityImageId?: string): DeityInfo | null {
  if (!deityImageId || deityImageId === "none") return null;
  const option = DEITY_OPTIONS.find((d) => d.id === deityImageId);
  const icon = ICON_MAP[deityImageId];
  if (!option || !icon) return null;
  return { icon, mantra: option.mantra, label: option.label };
}

/** Get deity options filtered by religion */
export function getDeityOptionsForReligion(religion?: string): DeityOption[] {
  if (!religion) return DEITY_OPTIONS;
  return DEITY_OPTIONS.filter((d) => d.religions.includes(religion));
}
