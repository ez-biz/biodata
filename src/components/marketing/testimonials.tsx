import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    initials: "PS",
    text: "Created my daughter's biodata in just 15 minutes. The traditional template with Om symbol was exactly what our family wanted. Got 10+ responses within a week of sharing on WhatsApp!",
    rating: 5,
    highlight: "10+ responses in a week",
  },
  {
    name: "Rajesh Patel",
    location: "Ahmedabad",
    initials: "RP",
    text: "As an NRI parent, I wanted something professional yet traditional for my son. The NRI template was perfect — clean design that works for both Indian and Western audiences.",
    rating: 5,
    highlight: "Perfect for NRI families",
  },
  {
    name: "Fatima Khan",
    location: "Hyderabad",
    initials: "FK",
    text: "So happy they have proper Muslim biodata templates with Bismillah. Other sites just use generic designs. This feels authentic and respectful of our culture.",
    rating: 5,
    highlight: "Culturally authentic",
  },
  {
    name: "Gurpreet Kaur",
    location: "Amritsar",
    initials: "GK",
    text: "The WhatsApp sharing feature is brilliant — I shared my biodata with 5 family groups instantly. The PDF quality for printing was also excellent. Much better than Word documents!",
    rating: 5,
    highlight: "WhatsApp sharing",
  },
  {
    name: "Suresh Reddy",
    location: "Bangalore",
    initials: "SR",
    text: "Used the modern minimal template for my daughter — she wanted something elegant, not the typical flashy designs. The live preview while filling was so helpful.",
    rating: 5,
    highlight: "Elegant modern design",
  },
  {
    name: "Meena Iyer",
    location: "Chennai",
    initials: "MI",
    text: "The horoscope section with Rashi, Nakshatra, and Nadi fields saved us hours. Our pandit was impressed with the complete kundli details. Highly recommended for Hindu families!",
    rating: 5,
    highlight: "Complete kundli support",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-maroon-50/30 relative bg-paisley">
      <div className="container px-4">
        <div className="mx-auto max-w-xl text-center mb-14">
          <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.2em] uppercase text-gold-700 mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-maroon-900 md:text-4xl lg:text-5xl">
            Families across India{" "}
            <span className="italic text-maroon-600">love us</span>
          </h2>
        </div>

        <div className="mx-auto max-w-6xl grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="group rounded-2xl border border-maroon-100/50 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-maroon-900/5 hover:border-maroon-200/60"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < t.rating
                        ? "fill-gold-500 text-gold-500"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Highlight chip */}
              <div className="mb-4">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full">
                  {t.highlight}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-maroon-100 flex items-center justify-center text-xs font-display font-bold text-maroon-700">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-maroon-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
