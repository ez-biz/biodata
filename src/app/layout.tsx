import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Noto_Sans_Devanagari, Noto_Sans_Gujarati } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { PosthogProvider } from "@/components/providers/posthog-provider";
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

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-gujarati",
  weight: ["400", "500", "600", "700"],
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
        className={`${dmSans.variable} ${playfair.variable} ${notoDevanagari.variable} ${notoGujarati.variable} font-body antialiased`}
      >
        <AuthProvider>
          <I18nProvider>
            <PosthogProvider>{children}</PosthogProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
