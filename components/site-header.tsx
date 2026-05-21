import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { getTranslation } from "@/lib/translations";
import GooeyNav from "@/components/ui/gooey-nav";
import { MobileMenu } from "@/components/mobile-menu";


export async function SiteHeader() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value;

  const navItems = [
    { href: "/", label: getTranslation(lang, "nav.home") },
    { href: "/products", label: getTranslation(lang, "nav.products") },
    { href: "/about", label: getTranslation(lang, "nav.about") },
    { href: "/contact", label: getTranslation(lang, "nav.contact") }
  ];

  return (
    <div className="absolute top-4 z-50 flex w-full justify-center px-4 md:top-6 pointer-events-none">
      <header className="w-full max-w-7xl rounded-full border border-border/50 bg-background/70 shadow-lg backdrop-blur-md pointer-events-auto">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 md:px-10">
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-10 w-32 xs:w-36 sm:h-12 sm:w-48 lg:h-14 lg:w-64">
              <Image
                src="/logos/logo-wide.png"
                alt="5Tech Store Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            <GooeyNav items={navItems} />
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <div className="flex items-center gap-1 sm:gap-2 md:hidden">
              <MobileMenu items={navItems} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
