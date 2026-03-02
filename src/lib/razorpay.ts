import Razorpay from "razorpay";

let _razorpay: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!_razorpay) {
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return _razorpay;
}

export const PLANS = {
  PREMIUM: {
    id: "PREMIUM",
    name: "Premium",
    amount: 9900, // ₹99 in paise
    currency: "INR",
    description: "Premium Plan — 1 premium template, no watermark",
    features: [
      "1 premium template",
      "No watermark",
      "High-resolution PDF",
      "Priority support",
    ],
  },
  UNLIMITED: {
    id: "UNLIMITED",
    name: "Unlimited",
    amount: 29900, // ₹299 in paise
    currency: "INR",
    description: "Unlimited Plan — All templates, all features",
    features: [
      "All 20+ templates",
      "No watermark",
      "High-resolution PDF",
      "Multiple biodatas",
      "WhatsApp sharing",
      "Priority support",
    ],
  },
  FAMILY: {
    id: "FAMILY",
    name: "Family Pack",
    amount: 49900, // ₹499 in paise
    currency: "INR",
    description: "Family Pack — 5 biodatas, all templates",
    features: [
      "5 biodatas",
      "All 20+ templates",
      "No watermark",
      "High-resolution PDF",
      "WhatsApp sharing",
      "Dedicated support",
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;
