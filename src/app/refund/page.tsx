import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | BiodataCraft",
  description:
    "BiodataCraft refund and cancellation policy for premium template purchases.",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-paisley py-16">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-maroon-900 mb-2">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm text-maroon-500">
            Last updated: 1 March 2026
          </p>
        </div>
      </section>

      <section className="container px-4 py-14 max-w-3xl mx-auto">
        <div className="space-y-10 text-maroon-800/80 leading-relaxed text-[15px]">
          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              1. Digital Product Policy
            </h2>
            <p>
              BiodataCraft provides digital products and services including
              premium biodata templates, PDF downloads, and enhanced features.
              Since these are digital goods delivered instantly upon purchase,
              all sales are generally <strong>non-refundable</strong> once the
              premium features have been accessed or a PDF has been downloaded.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              2. When We Issue Refunds
            </h2>
            <p className="mb-3">
              We will issue a full refund in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Duplicate payment</strong> — You were charged more than
                once for the same purchase
              </li>
              <li>
                <strong>Technical failure</strong> — You paid but were unable to
                access premium features due to a verified technical issue on our
                end
              </li>
              <li>
                <strong>Within 24 hours</strong> — You request a refund within
                24 hours of purchase and have not downloaded any premium PDF or
                used premium templates
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              3. How to Request a Refund
            </h2>
            <p className="mb-3">
              To request a refund, email us at{" "}
              <a
                href="mailto:support@biodatacraft.in"
                className="text-maroon-700 hover:underline"
              >
                support@biodatacraft.in
              </a>{" "}
              with:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Your registered email address</li>
              <li>Payment transaction ID or Razorpay order ID</li>
              <li>Reason for the refund request</li>
            </ul>
            <p className="mt-3">
              We will review your request and respond within 3-5 business days.
              Approved refunds are processed to the original payment method
              within 5-7 business days.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              4. Cancellation
            </h2>
            <p>
              BiodataCraft currently offers one-time purchases, not recurring
              subscriptions. There is nothing to cancel. If we introduce
              subscription plans in the future, you will be able to cancel at
              any time from your account dashboard, and your access will
              continue until the end of the billing period.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              5. Free Tier
            </h2>
            <p>
              The free tier of BiodataCraft (3 free templates, basic PDF
              download) requires no payment and is available to all users
              without any commitment. No refund applies to free features.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              6. Contact Us
            </h2>
            <p>
              For any questions about this policy, reach out to us at{" "}
              <a
                href="mailto:support@biodatacraft.in"
                className="text-maroon-700 hover:underline"
              >
                support@biodatacraft.in
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
