import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "About Us | BiodataCraft",
  description:
    "Learn about BiodataCraft — India's most loved marriage biodata maker. Our story, mission, and the team behind the platform.",
};

const TEAM = [
  {
    name: "Anchit Gupta",
    role: "Founder & CEO",
    bio: "Passionate about simplifying the Indian matchmaking experience through technology and beautiful design.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    bio: "Combines traditional Indian aesthetics with modern UI principles to create templates families love.",
  },
  {
    name: "Rahul Mehta",
    role: "Lead Engineer",
    bio: "Full-stack engineer focused on building fast, reliable tools that work seamlessly across all devices.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-paisley py-16 md:py-24">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-maroon-900 mb-4">
            About BiodataCraft
          </h1>
          <p className="text-lg text-maroon-700/70 leading-relaxed">
            We are on a mission to make the biodata creation process joyful,
            beautiful, and effortless for every Indian family.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container px-4 py-16 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-maroon-900 mb-6">
          Our Story
        </h2>
        <div className="space-y-5 text-maroon-800/80 leading-relaxed">
          <p>
            BiodataCraft was born out of a simple frustration: creating a
            marriage biodata should not require wrestling with Microsoft Word
            templates, hunting for the right fonts, or spending hours on
            formatting. When our founder helped his cousin prepare a biodata for
            her wedding search, he realised how outdated and painful the process
            was — and that millions of Indian families face the same struggle
            every year.
          </p>
          <p>
            We launched BiodataCraft in 2024 with a clear vision: give every
            family access to professionally designed biodata templates that can
            be filled out in minutes and downloaded as print-ready PDFs. No
            design skills needed, no software to install, no complicated sign-up
            flows.
          </p>
          <p>
            Today, over 50,000 families across India and the Indian diaspora
            trust BiodataCraft to create their marriage biodatas. From
            traditional maroon-and-gold designs to modern minimalist layouts, we
            offer templates that honour every community and every aesthetic
            preference.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-maroon-50/50 py-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-maroon-900 mb-6">
            Our Mission
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Simplify",
                desc: "Turn a multi-hour formatting ordeal into a 10-minute guided process.",
              },
              {
                title: "Beautify",
                desc: "Offer world-class designs that make families proud to share their biodatas.",
              },
              {
                title: "Respect",
                desc: "Honour every tradition, community, and language with culturally thoughtful templates.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-maroon-100/50 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-gold-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-maroon-700/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container px-4 py-16 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-maroon-900 mb-8 text-center">
          Meet the Team
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-maroon-100/50 bg-white p-6 text-center"
            >
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-maroon-100 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-maroon-700">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-maroon-900">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-gold-600 mb-2">
                {member.role}
              </p>
              <p className="text-sm text-maroon-700/60 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
