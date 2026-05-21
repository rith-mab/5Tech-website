import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { cookies } from "next/headers";
import { getTranslation, TranslationKey } from "@/lib/translations";


export async function SiteFooter() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value;

  return (
    <footer className="bg-[#0f291e] text-white py-12">
      <div className="page-shell">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-16">
          {/* Logo & Socials */}
          <div className="flex flex-col items-center space-y-8 md:items-start">
            <Link href="/" className="block">
              <div className="relative h-24 w-40 md:h-28 md:w-48">
                <Image
                  src="/logos/logo-5tech.png"
                  alt="5Tech Store Logo"
                  fill
                  className="object-contain object-center md:object-left"
                />
              </div>
            </Link>
            
            <div className="flex flex-col items-center md:items-start">
              <h2 className="mb-4 text-lg font-semibold text-[#39b54a]">
                {getTranslation(lang, "footer.connect" as TranslationKey)}
              </h2>
              <div className="flex justify-center gap-4 md:justify-start">
                <a href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#39b54a] hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#39b54a] hover:text-white" title="Telegram">
                  <Send className="h-5 w-5" />
                </a>
                <a href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#39b54a] hover:text-white" title="TikTok">
                  {/* Custom TikTok SVG */}
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-white/10 p-2 transition hover:bg-[#39b54a] hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-[#39b54a]">
              {getTranslation(lang, "footer.contact" as TranslationKey)}
            </h2>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[#39b54a]" />
                <p>
                  <span className="block font-medium text-white">{getTranslation(lang, "footer.email" as TranslationKey)}</span>
                  5techstore@gmail.com
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#39b54a]" />
                <p>
                  <span className="block font-medium text-white">{getTranslation(lang, "footer.phone" as TranslationKey)}</span>
                  +855 76 554 2456
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#39b54a]" />
                <p>
                  <span className="block font-medium text-white">{getTranslation(lang, "footer.address" as TranslationKey)}</span>
                  {getTranslation(lang, "footer.address.value" as TranslationKey)}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-lg font-semibold text-[#39b54a]">
              {getTranslation(lang, "footer.quicklinks" as TranslationKey)}
            </h2>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <Link href="/" className="transition hover:text-[#39b54a]">{getTranslation(lang, "nav.home" as TranslationKey)}</Link>
              <Link href="/products" className="transition hover:text-[#39b54a]">{getTranslation(lang, "nav.products" as TranslationKey)}</Link>
              <Link href="/about" className="transition hover:text-[#39b54a]">{getTranslation(lang, "nav.about" as TranslationKey)}</Link>
              <Link href="/contact" className="transition hover:text-[#39b54a]">{getTranslation(lang, "nav.contact" as TranslationKey)}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-gray-400">
          <p>{getTranslation(lang, "footer.rights" as TranslationKey)}</p>
        </div>
      </div>
    </footer>
  );
}
