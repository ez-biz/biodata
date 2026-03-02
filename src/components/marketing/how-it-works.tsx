import { FileText, Palette, Download } from "lucide-react";

const STEPS = [
  {
    icon: Palette,
    title: "Choose a Template",
    description:
      "Browse our collection of 20+ beautifully designed biodata templates. Filter by style — traditional, modern, regional, or religion-specific.",
  },
  {
    icon: FileText,
    title: "Fill Your Details",
    description:
      "Our guided wizard helps you fill personal, family, education, and lifestyle details step by step. See a live preview as you type.",
  },
  {
    icon: Download,
    title: "Download & Share",
    description:
      "Download your biodata as a print-ready PDF, share directly on WhatsApp, or generate a private link. It's that simple!",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Create Your Biodata in{" "}
            <span className="text-primary">3 Simple Steps</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            No design skills needed. Our smart biodata maker handles everything.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div className="absolute top-8 left-[60%] hidden h-0.5 w-[80%] bg-gradient-to-r from-primary/30 to-primary/10 md:block" />
                )}

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mb-1 text-sm font-bold text-primary">
                  Step {index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
