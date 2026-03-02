"use client";

import { useCallback, useState } from "react";
import { PlanId } from "@/lib/razorpay";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    document.head.appendChild(script);
  });
}

interface UseRazorpayOptions {
  onSuccess?: (plan: string) => void;
  onFailure?: (error: string) => void;
}

export function useRazorpay({ onSuccess, onFailure }: UseRazorpayOptions = {}) {
  const [loading, setLoading] = useState(false);

  const initiatePayment = useCallback(
    async (planId: PlanId, biodataId?: string, promoCode?: string) => {
      setLoading(true);
      try {
        await loadRazorpayScript();

        // Create order on server
        const res = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId, biodataId, promoCode }),
        });

        if (!res.ok) {
          throw new Error("Failed to create order");
        }

        const { orderId, amount, currency, keyId } = await res.json();

        const options = {
          key: keyId,
          amount,
          currency,
          name: "BiodataCraft",
          description: `${planId} Plan`,
          order_id: orderId,
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            // Verify payment on server
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (verifyRes.ok) {
              const data = await verifyRes.json();
              onSuccess?.(data.plan);
            } else {
              onFailure?.("Payment verification failed");
            }
          },
          prefill: {},
          theme: {
            color: "#831843",
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", () => {
          onFailure?.("Payment failed. Please try again.");
          setLoading(false);
        });
        rzp.open();
      } catch (error) {
        onFailure?.(
          error instanceof Error ? error.message : "Payment failed"
        );
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onFailure]
  );

  return { initiatePayment, loading };
}
