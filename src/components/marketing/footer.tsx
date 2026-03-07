"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-maroon-100/50 bg-maroon-950 text-white/80">
      <div className="container px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-7 w-7 rounded-full bg-gold-500/20 flex items-center justify-center">
                <span className="text-xs font-display font-bold text-gold-300">
                  B
                </span>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Biodata<span className="text-gold-400">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-gold-300 mb-4 tracking-wide">
              {t.footer.product}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: t.nav.templates, href: "/templates" },
                { label: t.nav.pricing, href: "/#pricing" },
                { label: t.footer.createBiodata, href: "/create" },
                { label: t.footer.examples, href: "/templates" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-gold-300 mb-4 tracking-wide">
              {t.footer.company}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: t.footer.about, href: "/about" },
                { label: t.footer.contact, href: "/contact" },
                { label: t.footer.blog, href: "/blog" },
                { label: t.footer.careers, href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-gold-300 mb-4 tracking-wide">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: t.footer.privacy, href: "/privacy" },
                { label: t.footer.terms, href: "/terms" },
                { label: t.footer.refund, href: "/refund" },
                { label: t.footer.cookie, href: "/privacy" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} BiodataCraft. {t.footer.madeInIndia}
          </p>
          <p className="text-xs text-white/30">
            {t.footer.builtForFamilies}
          </p>
        </div>
      </div>
    </footer>
  );
}
