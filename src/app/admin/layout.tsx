"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  TicketPercent,
  ArrowLeft,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/promo", label: "Promo Codes", icon: TicketPercent },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = (session?.user as { isAdmin?: boolean } | undefined)?.isAdmin;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && !isAdmin) {
      router.push("/dashboard");
    }
  }, [status, isAdmin, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-maroon-900">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-maroon-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-maroon-700 bg-maroon-800">
        {/* Logo area */}
        <div className="flex items-center gap-3 border-b border-maroon-700 px-6 py-5">
          <ShieldCheck className="h-7 w-7 text-gold-400" />
          <div>
            <h1 className="font-display text-lg font-bold text-gold-100">
              Admin Panel
            </h1>
            <p className="text-xs text-maroon-300">BiodataCraft</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold-500/20 text-gold-300"
                    : "text-maroon-200 hover:bg-maroon-700 hover:text-gold-100"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="border-t border-maroon-700 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-maroon-300 transition-colors hover:bg-maroon-700 hover:text-gold-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-maroon-900 p-8">
        {children}
      </main>
    </div>
  );
}
