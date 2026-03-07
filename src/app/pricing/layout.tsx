import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — BiodataCraft",
  description:
    "Affordable plans for creating beautiful marriage biodatas. Start free, upgrade for premium templates, unlimited downloads, and family packs.",
  openGraph: {
    title: "Pricing — BiodataCraft",
    description:
      "Affordable plans for creating beautiful marriage biodatas. Start free, upgrade anytime.",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
