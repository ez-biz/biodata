const DISMISSAL_PREFIX = "upsell_dismissed_";
const DEFAULT_EXPIRY_DAYS = 3;

export function isDismissed(bannerId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(`${DISMISSAL_PREFIX}${bannerId}`);
    if (!raw) return false;
    const expiresAt = parseInt(raw, 10);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(`${DISMISSAL_PREFIX}${bannerId}`);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function dismiss(bannerId: string, days = DEFAULT_EXPIRY_DAYS): void {
  if (typeof window === "undefined") return;
  try {
    const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(`${DISMISSAL_PREFIX}${bannerId}`, String(expiresAt));
  } catch {
    // localStorage may be unavailable
  }
}

export function isOneTimeShown(flagKey: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(flagKey) === "1";
  } catch {
    return false;
  }
}

export function markOneTimeShown(flagKey: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(flagKey, "1");
  } catch {
    // localStorage may be unavailable
  }
}
