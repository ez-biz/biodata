import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Cormorant_Garamond, Noto_Sans_Devanagari, Noto_Sans_Gujarati, Lora, Poppins, Merriweather } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { PosthogProvider } from "@/components/providers/posthog-provider";
import { ServiceWorkerRegistrar } from "@/components/pwa/sw-registrar";
import { InstallPrompt } from "@/components/pwa/install-prompt";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
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

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "BiodataCraft — Create Beautiful Marriage Biodata in Minutes",
  description:
    "India's most loved marriage biodata maker. 14 stunning templates, print-ready PDF, WhatsApp sharing. Trusted by 50,000+ Indian families.",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7f1d1d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BiodataCraft" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${cormorant.variable} ${notoDevanagari.variable} ${notoGujarati.variable} ${lora.variable} ${poppins.variable} ${merriweather.variable} font-body antialiased`}
      >
        <AuthProvider>
          <I18nProvider>
            <PosthogProvider>
              {children}
              <ServiceWorkerRegistrar />
              <InstallPrompt />
            </PosthogProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
