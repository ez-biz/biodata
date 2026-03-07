"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, LayoutDashboard, LogOut, User } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { t } = useI18n();

  const NAV_LINKS = [
    { label: t.nav.templates, href: "/templates" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.howItWorks, href: "/#how-it-works" },
  ];

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-maroon-100/50 bg-white/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Custom logo mark — stylized mandala */}
          <div className="relative h-8 w-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 group-hover:from-maroon-600 group-hover:to-maroon-800 transition-all duration-300" />
            <span className="relative text-sm font-display font-bold text-gold-200 leading-none">
              B
            </span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-maroon-800">
            Biodata<span className="text-gold-600">Craft</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/60 hover:text-maroon-700 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {session ? (
            <>
              <Link href="/create">
                <Button
                  size="sm"
                  className="bg-maroon-800 hover:bg-maroon-700 text-gold-100 font-medium rounded-full px-5"
                >
                  {t.nav.createBiodata}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-maroon-100 text-maroon-700 font-display font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="gap-2 cursor-pointer">
                      <LayoutDashboard className="h-4 w-4" />
                      {t.nav.dashboard}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      {t.nav.myBiodatas}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 text-destructive cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4" />
                    {t.common.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-maroon-700 hover:text-maroon-900 hover:bg-maroon-50 font-medium"
                >
                  {t.nav.logIn}
                </Button>
              </Link>
              <Link href="/create">
                <Button
                  size="sm"
                  className="bg-maroon-800 hover:bg-maroon-700 text-gold-100 font-medium rounded-full px-5 shadow-sm shadow-maroon-900/20"
                >
                  {t.nav.createMyBiodata}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-maroon-800" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <div className="flex flex-col gap-1 mt-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium py-3 px-2 rounded-lg hover:bg-maroon-50 text-foreground/80 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-4" />
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-maroon-200 text-maroon-800"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {t.nav.dashboard}
                    </Button>
                  </Link>
                  <Link
                    href="/create"
                    onClick={() => setOpen(false)}
                    className="mt-2"
                  >
                    <Button className="w-full bg-maroon-800 hover:bg-maroon-700 text-gold-100">
                      {t.nav.createBiodata}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-muted-foreground"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    {t.common.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-maroon-200 text-maroon-800"
                    >
                      {t.nav.logIn}
                    </Button>
                  </Link>
                  <Link
                    href="/create"
                    onClick={() => setOpen(false)}
                    className="mt-2"
                  >
                    <Button className="w-full bg-maroon-800 hover:bg-maroon-700 text-gold-100">
                      {t.nav.createMyBiodata}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
