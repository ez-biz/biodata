import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | BiodataCraft",
  description:
    "BiodataCraft privacy policy — how we collect, use, store, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-paisley py-16">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-maroon-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-maroon-500">
            Last updated: 1 January 2025
          </p>
        </div>
      </section>

      <section className="container px-4 py-14 max-w-3xl mx-auto">
        <div className="space-y-10 text-maroon-800/80 leading-relaxed text-[15px]">
          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information you provide directly when you create a
              biodata, register an account, or contact us. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Personal details entered in the biodata form (name, date of
                birth, education, family details, horoscope information)
              </li>
              <li>Account credentials (email address and hashed password)</li>
              <li>
                Photos uploaded for biodata templates
              </li>
              <li>
                Payment information processed securely through our payment
                partner (Razorpay) — we do not store card details on our servers
              </li>
              <li>
                Usage data such as pages visited, features used, and device
                information collected through cookies and analytics
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>To generate and store your marriage biodata documents</li>
              <li>To provide customer support and respond to your requests</li>
              <li>
                To process payments for premium templates and features
              </li>
              <li>
                To send transactional emails (account confirmation, password
                resets, download links)
              </li>
              <li>
                To improve our service through aggregated, anonymised usage
                analytics
              </li>
              <li>
                We do <strong>not</strong> sell, rent, or share your personal
                data with third parties for marketing purposes
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              3. Data Storage & Security
            </h2>
            <p className="mb-3">
              Your data is stored on secure servers with encryption at rest and
              in transit (TLS 1.2+). We use industry-standard security practices
              including:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Encrypted database storage for all personal information</li>
              <li>Hashed passwords using bcrypt — we never store plaintext passwords</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>
                Access controls ensuring only authorised personnel can access
                production data
              </li>
            </ul>
            <p className="mt-3">
              Biodata data is stored in India-based data centres in compliance
              with applicable Indian data protection laws.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              4. Cookies
            </h2>
            <p>
              We use essential cookies to keep you logged in and remember your
              preferences. We also use analytics cookies (Google Analytics) to
              understand how visitors use our site. You can disable non-essential
              cookies through your browser settings at any time.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              5. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Access</strong> — Request a copy of all personal data we
                hold about you
              </li>
              <li>
                <strong>Correction</strong> — Update or correct inaccurate
                information at any time through your account
              </li>
              <li>
                <strong>Deletion</strong> — Request permanent deletion of your
                account and all associated data
              </li>
              <li>
                <strong>Data portability</strong> — Export your biodata data in a
                standard format
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:privacy@biodatacraft.in"
                className="text-maroon-700 hover:underline"
              >
                privacy@biodatacraft.in
              </a>
              . We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              6. Third-Party Services
            </h2>
            <p>
              We use the following third-party services that may process your
              data in accordance with their own privacy policies: Google OAuth
              (for social login), Razorpay (for payment processing), and Google
              Analytics (for usage analytics). We encourage you to review their
              respective privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of significant changes by email or by posting a
              prominent notice on our website. Your continued use of
              BiodataCraft after changes are published constitutes acceptance of
              the updated policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              8. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this privacy policy,
              please contact us at{" "}
              <a
                href="mailto:privacy@biodatacraft.in"
                className="text-maroon-700 hover:underline"
              >
                privacy@biodatacraft.in
              </a>{" "}
              or write to us at: BiodataCraft, Bengaluru, Karnataka, India.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
