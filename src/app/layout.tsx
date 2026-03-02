import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BiodataCraft - Create Beautiful Marriage Biodata in Minutes",
  description:
    "India's #1 marriage biodata maker. Choose from 20+ stunning templates, fill your details, and download print-ready PDF biodata. Free templates available!",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
