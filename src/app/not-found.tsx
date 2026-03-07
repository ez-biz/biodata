import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gold-50/30 to-white bg-paisley px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-maroon-50 flex items-center justify-center mb-6">
          <span className="font-display text-3xl font-bold text-maroon-300">
            404
          </span>
        </div>

        <h1 className="font-display text-2xl font-bold text-maroon-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 px-6">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/create">
            <Button
              variant="outline"
              className="gap-2 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 px-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Create Biodata
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
