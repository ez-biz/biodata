import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Biodata — BiodataCraft",
  description:
    "Build a stunning marriage biodata in minutes. Choose from 14+ beautiful templates, add photos, and download as PDF.",
  openGraph: {
    title: "Create Your Biodata — BiodataCraft",
    description:
      "Build a stunning marriage biodata in minutes with 14+ beautiful templates.",
    type: "website",
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
