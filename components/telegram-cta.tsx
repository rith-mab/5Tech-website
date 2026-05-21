"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/your_username";

export function TelegramCTA() {
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => {
          setShowNote(true);
          window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
        }}
      >
        <Send className="h-4 w-4" />
        Contact via Telegram
      </Button>
      {showNote ? (
        <p className="text-sm text-muted-foreground">
          Interested? Screenshot this product and send it via Telegram.
        </p>
      ) : null}
    </div>
  );
}
