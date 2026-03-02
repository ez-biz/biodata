'use client';

export function OfflineContent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-amber-50 px-4 text-center">
      <div className="mx-auto max-w-md">
        {/* Offline icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-maroon-100">
          <svg
            className="h-10 w-10 text-maroon-800"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h1 className="font-display mb-3 text-2xl font-bold text-maroon-900">
          You&apos;re Offline
        </h1>

        <p className="mb-2 text-gray-600">
          It looks like you&apos;ve lost your internet connection.
        </p>

        <p className="mb-8 text-sm text-gray-500">
          Don&apos;t worry — your biodata form editing still works offline.
          All your data is saved locally on this device and will sync when
          you&apos;re back online.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/create"
            className="rounded-lg bg-maroon-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-900"
          >
            Continue Editing Biodata
          </a>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </main>
  );
}
