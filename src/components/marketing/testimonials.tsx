import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    text: "Created my daughter's biodata in just 15 minutes. The traditional template was perfect — everyone in our family loved it! Got 10+ responses within a week.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    location: "Ahmedabad",
    text: "As an NRI, I wanted something that looks professional yet traditional. The NRI Professional template was exactly what we needed for our son's biodata.",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    location: "Hyderabad",
    text: "I love that they have religion-specific templates. The Nikah Nama design with beautiful Islamic patterns was perfect for my biodata. Very respectful and authentic.",
    rating: 5,
  },
  {
    name: "Gurpreet Kaur",
    location: "Amritsar",
    text: "The WhatsApp sharing feature is brilliant! I shared my biodata with family groups instantly. The quality of the PDF for printing was also excellent.",
    rating: 5,
  },
  {
    name: "Suresh Reddy",
    location: "Bangalore",
    text: "Used the modern minimal template for my daughter. Clean, elegant, and professional. Much better than the generic formats we see everywhere.",
    rating: 4,
  },
  {
    name: "Meena Iyer",
    location: "Chennai",
    text: "The horoscope section was very detailed — Rashi, Nakshatra, Nadi — everything our families needed. Saved us hours of formatting work. Highly recommend!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Loved by{" "}
            <span className="text-primary">Families Across India</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of happy families who created their perfect biodata with us.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
