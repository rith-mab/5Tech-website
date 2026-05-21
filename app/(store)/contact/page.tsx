import Link from "next/link";
import { Facebook, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { cookies } from "next/headers";
import { getTranslation } from "@/lib/translations";

const TikTokIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    <path d="M15 8a4 4 0 1 0 0-8c0 2.5 2.5 4 4 4" />
  </svg>
);

function getCleanDisplayValue(value: string, label: string): string {
  if (label === "Telegram" && value.includes("t.me/")) {
    const parts = value.split("t.me/");
    return "@" + parts[parts.length - 1].replace(/\/$/, "");
  }
  if (label === "Facebook" && value.includes("facebook.com/")) {
    const parts = value.split("facebook.com/");
    return "@" + parts[parts.length - 1].replace(/\/$/, "");
  }
  if (label === "TikTok" && value.includes("tiktok.com/")) {
    const parts = value.split("tiktok.com/");
    const handle = parts[parts.length - 1].split("?")[0].replace(/\/$/, "");
    return handle.startsWith("@") ? handle : "@" + handle;
  }
  return value;
}

const contacts = [
  {
    label: "Telegram",
    value: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? "https://t.me/Five_5TechCambodia",
    icon: Send
  },
  {
    label: "Facebook",
    value: process.env.NEXT_PUBLIC_STORE_FACEBOOK ?? "https://facebook.com/5techcambodia",
    icon: Facebook
  },
  {
    label: "Phone",
    value: process.env.NEXT_PUBLIC_STORE_PHONE ?? "+855 76 554 2456",
    icon: Phone
  },
  {
    label: "Email",
    value: process.env.NEXT_PUBLIC_STORE_EMAIL ?? "5techstore@gmail.com",
    icon: Mail
  },
  {
    label: "Location",
    value: process.env.NEXT_PUBLIC_STORE_LOCATION ?? "Phnom Penh, Cambodia",
    icon: MapPin
  },
  {
    label: "TikTok",
    value: process.env.NEXT_PUBLIC_STORE_TIKTOK ?? "https://www.tiktok.com/@5tech.computer?_r=1&_t=ZS-96Xd3OvoK29",
    icon: TikTokIcon
  }
];

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value;
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key);

  return (
    <div className="page-shell space-y-8 pt-32 pb-12 lg:pt-40">
      <SectionHeading
        eyebrow={t("contact.eyebrow") as string}
        title={t("contact.title") as string}
        description={t("contact.description") as string}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {contacts.map((item) => {
          const Icon = item.icon;
          const isUrl = item.value.startsWith("http");
          const isEmail = item.value.includes("@");
          const isPhone = item.label === "Phone";
          const href = isUrl
            ? item.value
            : isEmail
              ? `mailto:${item.value}`
              : isPhone
                ? `tel:${item.value.replace(/\s+/g, "")}`
                : null;

          const displayVal = getCleanDisplayValue(item.value, item.label);

          return (
            <div
              key={item.label}
              className="group rounded-[28px] border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-card/70 backdrop-blur-md p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-3 border border-emerald-100/50 dark:border-emerald-900/30 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.label === "Location" ? t("contact.location") : item.label}
                  </p>
                  {href ? (
                    <Link href={href} className="font-medium text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200" target={isUrl ? "_blank" : undefined}>
                      {displayVal}
                    </Link>
                  ) : (
                    <p className="font-medium text-slate-800 dark:text-slate-200">{displayVal}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
