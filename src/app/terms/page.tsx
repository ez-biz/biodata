import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Terms of Service | BiodataCraft",
  description:
    "Terms of service for using BiodataCraft — India's most loved marriage biodata maker.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="bg-paisley py-16">
        <div className="container px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-maroon-900 mb-2">
            Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using BiodataCraft (&quot;the Service&quot;), you
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the Service. These terms apply
              to all visitors, users, and others who access BiodataCraft.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              2. Description of Service
            </h2>
            <p>
              BiodataCraft is an online platform that enables users to create,
              customise, and download marriage biodatas using professionally
              designed templates. The Service includes free and paid features.
              We reserve the right to modify, suspend, or discontinue any part
              of the Service at any time with reasonable notice.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              3. User Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                You must provide accurate and complete information when creating
                an account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You are responsible for all activities that occur under your
                account.
              </li>
              <li>
                You must be at least 18 years old to create an account and use
                the Service.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these terms.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              4. User Content
            </h2>
            <p className="mb-3">
              You retain ownership of all content you submit to BiodataCraft
              (personal details, photos, text). By using the Service, you grant
              us a limited licence to process and store your content solely for
              the purpose of providing the Service to you. You agree that:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                All information you provide is truthful and not misleading.
              </li>
              <li>
                You will not upload content that is illegal, offensive, or
                infringes on the rights of others.
              </li>
              <li>
                You will not use the Service to harass, deceive, or defraud any
                person.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              5. Payments & Refunds
            </h2>
            <p className="mb-3">
              Premium features are available through one-time purchases.
              Payments are processed securely through Razorpay. All prices are
              listed in Indian Rupees (INR) and include applicable taxes.
            </p>
            <p>
              Refunds may be requested within 7 days of purchase if you have not
              downloaded a premium (watermark-free) biodata. Once a premium PDF
              has been downloaded, the purchase is considered fulfilled and is
              non-refundable. To request a refund, contact{" "}
              <a
                href="mailto:support@biodatacraft.in"
                className="text-maroon-700 hover:underline"
              >
                support@biodatacraft.in
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All template designs, graphics, logos, code, and content on
              BiodataCraft are the intellectual property of BiodataCraft and are
              protected by Indian and international copyright laws. You may not
              reproduce, distribute, or create derivative works from our
              templates or designs without prior written permission. Your
              purchased templates grant you a personal, non-transferable licence
              to use the design for your own biodata.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              BiodataCraft is provided &quot;as is&quot; without warranties of
              any kind. We do not guarantee that the Service will be
              uninterrupted or error-free. To the maximum extent permitted by
              law, BiodataCraft shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of the
              Service. Our total liability shall not exceed the amount you paid
              us in the 12 months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              8. Governing Law
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising from these terms or the
              Service shall be subject to the exclusive jurisdiction of the
              courts of Bengaluru, Karnataka.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              9. Changes to Terms
            </h2>
            <p>
              We may update these terms from time to time. We will notify
              registered users of material changes via email. Continued use of
              the Service after changes are posted constitutes acceptance of the
              revised terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900 mb-3">
              10. Contact
            </h2>
            <p>
              For any questions regarding these Terms of Service, please contact
              us at{" "}
              <a
                href="mailto:support@biodatacraft.in"
                className="text-maroon-700 hover:underline"
              >
                support@biodatacraft.in
              </a>{" "}
              or write to: BiodataCraft, Bengaluru, Karnataka, India.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
