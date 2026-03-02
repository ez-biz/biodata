import Link from "next/link";

export function Footer() {
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
              India&apos;s most loved marriage biodata maker. Helping families
              create beautiful, print-ready biodatas since 2024.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-gold-300 mb-4 tracking-wide">
              Product
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Templates", href: "/templates" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Create Biodata", href: "/create" },
                { label: "Examples", href: "/templates" },
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
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/about" },
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
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Refund Policy", href: "/refund" },
                { label: "Cookie Policy", href: "/privacy" },
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
            &copy; {new Date().getFullYear()} BiodataCraft. Made with love in
            India.
          </p>
          <p className="text-xs text-white/30">
            Designed for Indian families, built with respect for every tradition.
          </p>
        </div>
      </div>
    </footer>
  );
}
