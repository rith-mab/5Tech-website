"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "kh">("en");
  const router = useRouter();

  useEffect(() => {
    // Read cookie on mount to set initial state
    const match = document.cookie.match(/(^| )language=([^;]+)/);
    if (match) {
      setLang(match[2] as "en" | "kh");
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "kh" : "en";
    setLang(newLang);
    document.cookie = `language=${newLang}; path=/; max-age=31536000`; // 1 year
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-10 w-10 rounded-full px-0 flex items-center justify-center overflow-hidden hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
      aria-label="Toggle language"
      onClick={toggleLang}
    >
      {lang === "en" ? (
        <img src="https://flagcdn.com/w40/us.png" width="22" alt="English" className="rounded-[2px] shadow-sm" />
      ) : (
        <img src="https://flagcdn.com/w40/kh.png" width="22" alt="Khmer" className="rounded-[2px] shadow-sm" />
      )}
    </Button>
  );
}
