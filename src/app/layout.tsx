import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BiodataCraft — Create Beautiful Marriage Biodata in Minutes",
  description:
    "India's most loved marriage biodata maker. 20+ stunning templates, print-ready PDF, WhatsApp sharing. Trusted by 50,000+ Indian families.",
  keywords: [
    "marriage biodata",
    "biodata for marriage",
    "biodata maker",
    "shaadi ka biodata",
    "marriage biodata format",
    "biodata template",
    "Indian biodata",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-body antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
