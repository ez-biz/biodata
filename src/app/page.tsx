import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TemplateShowcase } from "@/components/marketing/template-showcase";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";
import {
  JsonLd,
  organizationJsonLd,
  webApplicationJsonLd,
  faqPageJsonLd,
} from "@/components/seo/json-ld";

const LANDING_FAQS = [
  {
    q: "Is BiodataCraft really free to use?",
    a: "Yes! Create a biodata using any of our 5 free templates at zero cost. Free biodatas include a small watermark. To remove the watermark and access 15+ premium templates, plans start at just \u20B999 \u2014 less than the cost of a single printout at a cyber cafe.",
  },
  {
    q: "Can I download my biodata as a print-ready PDF?",
    a: "Every biodata can be downloaded as an A4 PDF. Free users get 150 DPI (good for digital sharing). Premium users get 300 DPI with proper bleed margins \u2014 perfect for professional printing at any print shop.",
  },
  {
    q: "How do I share my biodata on WhatsApp?",
    a: "After creating your biodata, tap 'Share on WhatsApp'. We generate an optimized image (under 1MB) that loads instantly in WhatsApp, complete with a pre-filled message you can customize before sending to family groups.",
  },
  {
    q: "Is my personal data safe with you?",
    a: "We use bank-grade encryption for all data. Your contact details can be individually hidden from shared biodatas. We never sell or share your data. You can permanently delete your account and all data anytime from Settings.",
  },
  {
    q: "Do you have templates for all religions?",
    a: "Yes \u2014 we have designs specifically made for Hindu (with Om/Swastik), Muslim (with Bismillah), Sikh (with Ek Onkar), Christian, and Jain families. Each template uses appropriate religious symbols and culturally authentic patterns. We never mix symbols across religions.",
  },
  {
    q: "Can I switch templates after filling my details?",
    a: "Absolutely! Your data is saved separately from the template design. Switch between any template anytime \u2014 all your information stays intact. This is one of the biggest advantages over Word or Canva.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support UPI (Google Pay, PhonePe, Paytm), all debit & credit cards, net banking, and wallets through Razorpay. International users can pay via Stripe with any global card. Payments are 100% secure.",
  },
  {
    q: "Can I create a biodata in Hindi or regional languages?",
    a: "We currently support biodata content in English and Hindi. Support for Marathi, Gujarati, Tamil, Telugu, Bengali, Kannada, Malayalam, and Punjabi is coming soon. The UI is already available in multiple languages.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={webApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(LANDING_FAQS)} />
      <Navbar />
      <Hero />
      <HowItWorks />
      <TemplateShowcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
