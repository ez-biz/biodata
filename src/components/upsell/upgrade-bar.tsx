"use client";

import { useEffect, useState } from "react";
import { Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { isDismissed, dismiss } from "@/lib/utils/upsell-dismissal";
import {
  trackUpsellShown,
  trackUpsellClicked,
  trackUpsellDismissed,
} from "@/lib/analytics";

const BANNER_ID = "upgrade_bar_sticky";

interface UpgradeBarProps {
  onUpgrade: () => void;
}

export function UpgradeBar({ onUpgrade }: UpgradeBarProps) {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);

  const userTier =
    (session?.user as { tier?: string } | undefined)?.tier || "FREE";
  const isPaidUser = userTier !== "FREE";

  useEffect(() => {
    if (!isPaidUser && !isDismissed(BANNER_ID)) {
      setVisible(true);
    }
  }, [isPaidUser]);

  useEffect(() => {
    if (visible) {
      trackUpsellShown("create_page_bar", "inline");
    }
  }, [visible]);

  if (!visible || isPaidUser) return null;

  const handleDismiss = () => {
    setVisible(false);
    // Dismiss for current session only — uses 0 days so it reappears next session.
    // We store with a short expiry of ~8 hours so it comes back next session.
    dismiss(BANNER_ID, 0.33);
    trackUpsellDismissed("create_page_bar", "inline");
  };

  const handleUpgrade = () => {
    trackUpsellClicked("create_page_bar", "inline");
    onUpgrade();
  };

  return (
    <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 text-white animate-in slide-in-from-top duration-300">
      <div className="container px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Crown className="h-3.5 w-3.5 text-gold-300 flex-shrink-0" />
          <p className="text-xs sm:text-sm truncate">
            <span className="hidden sm:inline">
              You&apos;re using the free plan. Upgrade for premium templates &amp;
              no watermark.
            </span>
            <span className="sm:hidden">
              Free plan — upgrade for premium features
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            onClick={handleUpgrade}
            className="rounded-full bg-gold-400 hover:bg-gold-500 text-maroon-900 text-xs font-semibold h-7 px-3"
          >
            Upgrade
          </Button>
          <button
            onClick={handleDismiss}
            className="text-white/60 hover:text-white p-0.5"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
