"use client";

import React from "react";
import LogoLoop, { LogoItem } from "@/components/ui/logo-loop";
import ScrollFloat from "@/components/ui/scroll-float";
import { getTranslation, TranslationKey } from "@/lib/translations";

interface StorePhotoItem extends LogoItem {
  image: string;
  text: string;
}

const STORE_PHOTOS: StorePhotoItem[] = [
  { image: '/image/photo_2026-03-24_14-54-05.jpg', text: '5Tech Store' },
  { image: '/image/photo_2026-03-29_00-26-03 (2).jpg', text: '5Tech Products' },
  { image: '/image/photo_2026-03-29_00-26-03 (3).jpg', text: '5Tech Products' },
  { image: '/image/photo_2026-03-29_00-26-03.jpg', text: '5Tech Store' },
  { image: '/image/photo_2026-03-31_23-39-13.jpg', text: '5Tech Store' },
  { image: '/image/photo_2026-04-21_12-17-26.jpg', text: '5Tech Products' },
  { image: '/image/photo_2026-04-28_15-13-28.jpg', text: '5Tech Products' },
];

interface StoreMarqueeProps {
  lang?: string;
}

export default function StoreMarquee({ lang }: StoreMarqueeProps) {
  return (
    <div className="w-full bg-white pt-8 pb-3 dark:bg-background/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header Title for the gallery section */}
        <div className="mb-6 flex justify-between items-center">
          <ScrollFloat
            containerClassName="my-0 overflow-hidden"
            textClassName="text-lg md:text-xl font-bold text-emerald-800 tracking-wide inline-block"
            scrollStart="top bottom-=5%"
            scrollEnd="bottom bottom-=25%"
            stagger={0.02}
          >
            {getTranslation(lang, "gallery.title" as TranslationKey)}
          </ScrollFloat>
          <span className="text-xs text-gray-400 font-medium">
            {getTranslation(lang, "gallery.hover" as TranslationKey)}
          </span>
        </div>

        {/* Store Photo Loop */}
        <div className="w-full max-w-full overflow-hidden">
          <LogoLoop
            logos={STORE_PHOTOS}
            speed={60}
            gap={32}
            logoHeight={260}
            fadeOut={true}
            pauseOnHover={true}
            scaleOnHover={true}
            renderItem={(item) => {
              const photo = item as StorePhotoItem;
              if ('image' in photo) {
                return (
                  <div className="group relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100/80 aspect-square w-[260px] h-[260px] bg-white p-2">
                    <img
                      src={photo.image}
                      alt={photo.text}
                      className="h-full w-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
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
