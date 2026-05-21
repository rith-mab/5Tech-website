"use client";

import React from "react";
import LogoLoop, { LogoItem } from "@/components/ui/logo-loop";
import { getTranslation, TranslationKey } from "@/lib/translations";

const BRAND_LOGOS: LogoItem[] = [
  { src: "/logos/Razer.png", alt: "Razer" },
  { src: "/logos/Aula.png", alt: "Aula" },
  { src: "/logos/Picun.png", alt: "Picun" },
  { src: "/logos/Dark%20Alien.png", alt: "Dark Alien" },
  { src: "/logos/Edifier.png", alt: "Edifier" },
  { src: "/logos/Leaven.png", alt: "Leaven" },
  { src: "/logos/Leobog.png", alt: "Leobog" },
  { src: "/logos/Ugren.png", alt: "Ugreen" },
];

interface BrandMarqueeProps {
  lang?: string;
}

export function BrandMarquee({ lang }: BrandMarqueeProps) {
  return (
    <div className="w-full bg-white/70 dark:bg-background/80 backdrop-blur-md py-6 border-y border-emerald-100 dark:border-border shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center">
        {/* Title */}
        <div className="shrink-0 md:pr-8 md:mr-8 md:border-r border-emerald-200 mb-6 md:mb-0">
          <span className="text-sm md:text-base font-bold text-emerald-600 whitespace-nowrap">
            {getTranslation(lang, "brand.title" as TranslationKey)}
          </span>
        </div>

        {/* Logo Loop Component */}
        <div className="flex-1 w-full max-w-full overflow-hidden">
          <LogoLoop 
            logos={BRAND_LOGOS} 
            speed={40} 
            gap={64} 
            logoHeight={70}
            fadeOut={true}
            pauseOnHover={true}
            scaleOnHover={true}
            renderItem={(item) => {
              if ('src' in item) {
                return (
                  <div className="group relative">
                    {/* Fallback to text if image fails to load. 
                        We use standard img tag but we handle errors nicely */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-[70px] w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <span className="hidden text-xl font-bold text-gray-500 tracking-wider">
                      {item.alt}
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />
        </div>
      </div>
    </div>
  );
}
