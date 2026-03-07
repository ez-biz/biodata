import { Navbar } from "@/components/marketing/navbar";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-paisley">
      <Navbar />
      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-8 w-64 bg-maroon-100/50 rounded-lg animate-pulse mx-auto mb-3" />
          <div className="h-4 w-96 bg-maroon-100/30 rounded animate-pulse mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-maroon-100/50 bg-white p-6"
            >
              <div className="h-4 w-16 bg-gold-100 rounded-full animate-pulse mb-3" />
              <div className="h-5 w-full bg-maroon-100/50 rounded animate-pulse mb-2" />
              <div className="h-4 w-3/4 bg-maroon-100/30 rounded animate-pulse mb-4" />
              <div className="h-3 w-20 bg-maroon-100/20 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
