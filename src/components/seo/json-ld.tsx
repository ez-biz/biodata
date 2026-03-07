import type { BlogPost } from "@/lib/blog/posts";
import type { TemplateConfig } from "@/lib/types/biodata";

// ─── Base URL ────────────────────────────────────────────────
const SITE_URL = "https://www.biodatacraft.in";
const SITE_NAME = "BiodataCraft";
const LOGO_URL = `${SITE_URL}/logo.png`;

// ─── Generic renderer ────────────────────────────────────────
interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Organization ────────────────────────────────────────────
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "India's most loved marriage biodata maker. Create beautiful biodata in minutes with 14 stunning templates, print-ready PDF, and WhatsApp sharing.",
    sameAs: [
      "https://www.facebook.com/biodatacraft",
      "https://www.instagram.com/biodatacraft",
      "https://twitter.com/biodatacraft",
      "https://www.youtube.com/@biodatacraft",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@biodatacraft.in",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  };
}

// ─── WebApplication ──────────────────────────────────────────
export function webApplicationJsonLd(options?: { inLanguage?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    description:
      "Create beautiful Indian marriage biodata in minutes. Choose from 14 stunning templates, fill in your details, and download a print-ready PDF.",
    ...(options?.inLanguage ? { inLanguage: options.inLanguage } : {}),
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "INR",
        description:
          "3 free templates, basic PDF download, watermarked output, 1 biodata",
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "99",
        priceCurrency: "INR",
        description:
          "1 premium template, no watermark, high-resolution PDF, priority support",
      },
      {
        "@type": "Offer",
        name: "Unlimited",
        price: "299",
        priceCurrency: "INR",
        description:
          "All 14 templates, no watermark, high-resolution PDF, multiple biodatas, WhatsApp sharing, priority support",
      },
      {
        "@type": "Offer",
        name: "Family Pack",
        price: "499",
        priceCurrency: "INR",
        description:
          "5 biodatas, all 14 templates, no watermark, high-resolution PDF, WhatsApp sharing, dedicated support",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2450",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ─── FAQPage ─────────────────────────────────────────────────
export function faqPageJsonLd(
  faqs: { q?: string; question?: string; a?: string; answer?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q ?? faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a ?? faq.answer,
      },
    })),
  };
}

// ─── Article (Blog post) ─────────────────────────────────────
export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/blog/${post.slug}/og.png`,
  };
}

// ─── BreadcrumbList ──────────────────────────────────────────
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── Product (Pricing page) ──────────────────────────────────
export function pricingProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "BiodataCraft - Marriage Biodata Maker",
    description:
      "Create beautiful Indian marriage biodata with 14 templates. Download as print-ready PDF or share on WhatsApp.",
    brand: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "INR",
        description:
          "3 free templates, basic PDF download, watermarked output, 1 biodata",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "99",
        priceCurrency: "INR",
        description:
          "1 premium template, no watermark, high-resolution PDF, priority support",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Unlimited",
        price: "299",
        priceCurrency: "INR",
        description:
          "All 14 templates, no watermark, high-resolution PDF, multiple biodatas, WhatsApp sharing",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Family Pack",
        price: "499",
        priceCurrency: "INR",
        description:
          "5 biodatas, all 14 templates, no watermark, high-resolution PDF, WhatsApp sharing, dedicated support",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2450",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ─── ItemList (Templates page) ───────────────────────────────
export function templateItemListJsonLd(templates: TemplateConfig[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Marriage Biodata Templates",
    description:
      "Browse our collection of beautifully designed Indian marriage biodata templates.",
    numberOfItems: templates.length,
    itemListElement: templates.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: template.name,
      url: `${SITE_URL}/create?template=${template.id}`,
      item: {
        "@type": "CreativeWork",
        name: template.name,
        description: `${template.name} - ${template.category} biodata template. ${template.tier === "free" ? "Free" : "Premium"}.`,
        url: `${SITE_URL}/create?template=${template.id}`,
      },
    })),
  };
}

// ─── CollectionPage (Blog listing) ───────────────────────────
export function blogCollectionJsonLd(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BiodataCraft Blog",
    description:
      "Expert tips, guides, and insights to help you create the perfect marriage biodata and navigate the matchmaking journey.",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}
