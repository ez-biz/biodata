"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is BiodataCraft really free to use?",
    a: "Yes! Create a biodata using any of our 5 free templates at zero cost. Free biodatas include a small watermark. To remove the watermark and access 15+ premium templates, plans start at just ₹99 — less than the cost of a single printout at a cyber cafe.",
  },
  {
    q: "Can I download my biodata as a print-ready PDF?",
    a: "Every biodata can be downloaded as an A4 PDF. Free users get 150 DPI (good for digital sharing). Premium users get 300 DPI with proper bleed margins — perfect for professional printing at any print shop.",
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
    a: "Yes — we have designs specifically made for Hindu (with Om/Swastik), Muslim (with Bismillah), Sikh (with Ek Onkar), Christian, and Jain families. Each template uses appropriate religious symbols and culturally authentic patterns. We never mix symbols across religions.",
  },
  {
    q: "Can I switch templates after filling my details?",
    a: "Absolutely! Your data is saved separately from the template design. Switch between any template anytime — all your information stays intact. This is one of the biggest advantages over Word or Canva.",
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

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container px-4">
        <div className="mx-auto max-w-xl text-center mb-14">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.2em] uppercase text-gold-700 mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-maroon-900 md:text-4xl lg:text-5xl">
            Questions? We&apos;ve got{" "}
            <span className="italic text-maroon-600">answers</span>
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-maroon-100/50 rounded-xl px-5 data-[state=open]:border-maroon-200 data-[state=open]:bg-maroon-50/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-sm md:text-[15px] font-semibold text-maroon-900 hover:text-maroon-700 hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
