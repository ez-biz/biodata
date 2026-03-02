import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C15.5 5 5 15.5 5 30s10.5 25 25 25 25-10.5 25-25S44.5 5 30 5zm0 45c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z' fill='%23800020' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative px-4 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Shield className="mr-2 h-3.5 w-3.5" />
            Trusted by 50,000+ families across India
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Create Your Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-rose-600 bg-clip-text text-transparent">
              Marriage Biodata
            </span>{" "}
            in Minutes
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Choose from 20+ beautifully designed templates, fill in your
            details, and download a print-ready PDF biodata. Perfect for
            sharing on WhatsApp, matrimonial sites, or printing.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create">
              <Button size="lg" className="gap-2 text-base px-8 py-6">
                Create My Biodata — Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-base px-8 py-6"
              >
                <Palette className="h-4 w-4" />
                Browse Templates
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            No sign-up required to start. Free templates available.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "50K+", label: "Biodatas Created" },
            { value: "20+", label: "Templates" },
            { value: "10+", label: "Languages" },
            { value: "4.8★", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary md:text-3xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Preview mockup */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative rounded-xl bg-white/50 p-2 shadow-2xl ring-1 ring-gray-200">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Traditional Classic",
                  color: "from-red-900 to-amber-700",
                  tag: "FREE",
                },
                {
                  title: "Modern Minimal",
                  color: "from-slate-700 to-rose-300",
                  tag: "FREE",
                },
                {
                  title: "Elegant Royal",
                  color: "from-purple-900 to-amber-500",
                  tag: "FREE",
                },
              ].map((template) => (
                <div
                  key={template.title}
                  className="relative aspect-[210/297] overflow-hidden rounded-lg bg-gradient-to-br p-6"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-90`}
                  />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
                    <div className="mb-2 h-16 w-16 rounded-full bg-white/20" />
                    <div className="mb-1 h-3 w-24 rounded bg-white/40" />
                    <div className="mb-4 h-2 w-16 rounded bg-white/30" />
                    <div className="space-y-1.5 w-full px-4">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 rounded bg-white/20"
                          style={{ width: `${70 + Math.random() * 30}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 z-10 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                    {template.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
