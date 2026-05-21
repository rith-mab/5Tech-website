import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "5Tech Store",
    template: "%s | 5Tech Store"
  },
  icons: {
    icon: "/logos/logo-5tech.png",
    shortcut: "/logos/logo-5tech.png",
    apple: "/logos/logo-5tech.png"
  },
  description: "Explore quality computer accessories and gaming products at 5Tech Store.",
  openGraph: {
    title: "5Tech Store",
    description: "Explore quality computer accessories and gaming products.",
    siteName: "5Tech Store",
    type: "website"
  },
  keywords: ["tech store", "gaming accessories", "computer accessories", "Cambodia tech store"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
