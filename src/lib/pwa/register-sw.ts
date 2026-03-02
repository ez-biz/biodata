/**
 * Register the service worker and handle updates.
 * Only registers in production to avoid caching issues during development.
 */
export function registerServiceWorker(): void {
  if (
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator) ||
    process.env.NODE_ENV !== 'production'
  ) {
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      // Check for updates periodically (every 60 minutes)
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

      // Handle SW updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            // New SW is ready — dispatch a custom event so UI can show a toast
            window.dispatchEvent(
              new CustomEvent('sw-update-available', {
                detail: { registration },
              })
            );
          }
        });
      });
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  });
}

/**
 * Tell the waiting service worker to activate immediately.
 */
export function applyServiceWorkerUpdate(
  registration: ServiceWorkerRegistration
): void {
  registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
}
