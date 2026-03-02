"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex relative bg-maroon-950 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-paisley opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/80 to-maroon-950" />

        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-gold-500/10" />
        <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full border border-gold-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gold-500/5" />

        <div className="relative z-10 max-w-md px-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center">
              <span className="text-lg font-display font-bold text-gold-300">
                B
              </span>
            </div>
            <span className="font-display text-2xl font-bold text-white">
              Biodata<span className="text-gold-400">Craft</span>
            </span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-white leading-tight mb-4">
            Every love story deserves a beautiful beginning
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Join 50,000+ Indian families who created their perfect marriage
            biodata with us.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-b from-white to-gold-50/30">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="text-center mb-8 lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="h-8 w-8 rounded-full bg-maroon-800 flex items-center justify-center">
                <span className="text-sm font-display font-bold text-gold-200">
                  B
                </span>
              </div>
              <span className="font-display text-xl font-bold text-maroon-800">
                BiodataCraft
              </span>
            </Link>
          </div>

          <h1 className="font-display text-2xl font-bold text-maroon-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Log in to manage your biodatas
          </p>

          <Button
            variant="outline"
            className="w-full gap-2.5 h-11 border-maroon-200 hover:bg-maroon-50 rounded-lg font-medium"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-4 my-6">
            <Separator className="flex-1 bg-maroon-100" />
            <span className="text-xs text-muted-foreground font-medium">
              or
            </span>
            <Separator className="flex-1 bg-maroon-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-destructive bg-red-50 border border-red-200 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-lg border-maroon-200 focus:border-maroon-400 focus:ring-maroon-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-11 rounded-lg border-maroon-200 focus:border-maroon-400 focus:ring-maroon-400"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-lg bg-maroon-800 hover:bg-maroon-700 text-gold-100 font-medium shadow-sm"
              disabled={loading}
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-maroon-700 font-semibold hover:text-maroon-600 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
