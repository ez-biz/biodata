"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function PosthogPageView() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      posthog.capture("$pageview", { $current_url: window.location.href });
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return null;
}

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  const isInitialized = useRef(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (!key || isInitialized.current) return;

    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only",
      capture_pageview: false, // We handle this manually with usePathname
      capture_pageleave: true,
    });
    isInitialized.current = true;
  }, []);

  return (
    <PHProvider client={posthog}>
      <PosthogPageView />
      {children}
    </PHProvider>
  );
}
