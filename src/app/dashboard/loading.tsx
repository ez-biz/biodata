import { Navbar } from "@/components/marketing/navbar";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-50/30 to-white bg-paisley">
      <Navbar />
      <div className="container px-4 py-10">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-7 w-40 bg-maroon-100/50 rounded-lg animate-pulse" />
            <div className="h-4 w-56 bg-maroon-100/30 rounded mt-2 animate-pulse" />
          </div>
          <div className="h-10 w-36 bg-maroon-100/50 rounded-full animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-maroon-100/50 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-maroon-50 animate-pulse" />
                <div>
                  <div className="h-7 w-12 bg-maroon-100/50 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-maroon-100/30 rounded mt-1.5 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card skeletons */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-maroon-100/50 bg-white overflow-hidden"
            >
              <div className="h-1.5 bg-maroon-100/50 animate-pulse" />
              <div className="p-5">
                <div className="h-5 w-32 bg-maroon-100/50 rounded animate-pulse mb-1.5" />
                <div className="h-3 w-24 bg-maroon-100/30 rounded animate-pulse mb-4" />
                <div className="h-3 w-20 bg-maroon-100/30 rounded animate-pulse mb-5" />
                <div className="flex gap-2">
                  <div className="h-8 flex-1 bg-maroon-100/30 rounded-full animate-pulse" />
                  <div className="h-8 w-8 bg-maroon-100/30 rounded-full animate-pulse" />
                  <div className="h-8 w-8 bg-maroon-100/30 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
