"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  initialActiveIndex = 0
}) => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (pathname) {
      const index = items.findIndex(item => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href)));
      return index !== -1 ? index : initialActiveIndex;
    }
    return initialActiveIndex;
  });

  useEffect(() => {
    if (pathname) {
      const index = items.findIndex(item => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href)));
      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  }, [pathname, items, activeIndex]);

  return (
    <div className="relative">
      <nav className="flex relative">
        <ul className="flex list-none p-0 m-0 relative z-[3] gap-1 sm:gap-2">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                key={index}
                className={`rounded-full relative cursor-pointer font-bold text-base md:text-lg transition-colors duration-300 ease-in-out ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-700 hover:bg-gray-100/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-emerald-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <Link
                  href={item.href}
                  className="outline-none py-2 px-4 sm:px-6 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
