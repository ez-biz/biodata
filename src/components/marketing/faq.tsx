"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is BiodataCraft free to use?",
    a: "Yes! You can create a biodata using our free templates at no cost. Free biodatas include a small watermark. To remove the watermark and access premium templates, you can upgrade starting at just ₹99.",
  },
  {
    q: "Can I download my biodata as PDF?",
    a: "Absolutely. Every biodata can be downloaded as a print-ready A4 PDF. Free biodatas are 150 DPI with watermark, while premium downloads are 300 DPI without watermark — perfect for printing.",
  },
  {
    q: "How do I share my biodata on WhatsApp?",
    a: "After creating your biodata, click the 'Share on WhatsApp' button. We generate an optimized image that's perfect for WhatsApp sharing, complete with a pre-filled message you can customize.",
  },
  {
    q: "Is my personal data safe?",
    a: "Absolutely. We use industry-standard encryption and never share your data with third parties. You can delete your account and all data at any time. Contact details can be individually hidden from shared biodatas.",
  },
  {
    q: "Can I create biodata in Hindi or other Indian languages?",
    a: "Yes! We support biodata content in both English and Hindi, with plans to add more Indian languages including Marathi, Gujarati, Tamil, Telugu, Bengali, and more.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (Google Pay, PhonePe, Paytm), all debit/credit cards, net banking, and wallets through Razorpay. International users can pay via Stripe with any international card.",
  },
  {
    q: "Can I change the template after filling my details?",
    a: "Yes! Your data is saved separately from the template. You can switch between any template at any time — all your filled information stays intact.",
  },
  {
    q: "Do you have templates for all religions?",
    a: "Yes, we have templates designed specifically for Hindu, Muslim, Sikh, Christian, Jain, and other communities. Each template uses appropriate religious symbols and culturally authentic designs.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm md:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
