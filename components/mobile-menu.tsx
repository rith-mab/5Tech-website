"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full px-2 sm:px-3 z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col bg-white/20 dark:bg-black/20 backdrop-blur-2xl p-6 animate-in fade-in slide-in-from-right-8 duration-300">
          <div className="flex justify-end mb-8">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full border shadow-sm bg-background">
              <X className="h-6 w-6 text-foreground" />
            </Button>
          </div>
          <nav className="flex flex-col gap-6 text-center text-2xl font-bold">
            {items.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`py-4 rounded-3xl transition-colors ${
                  pathname === item.href 
                    ? "bg-emerald-600 text-white" 
                    : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
