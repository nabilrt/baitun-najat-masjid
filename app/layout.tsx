import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import TopbarProgress from "./components/TopbarProgress";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://baitun-najat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Baitun Najat Jame Mosjid",
    template: "%s | Baitun Najat Jame Mosjid"
  },
  description: "Prayer times, community updates, and donation info for Baitun Najat Jame Mosjid.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Baitun Najat Jame Mosjid",
    description: "Prayer times, community updates, and donation info for Baitun Najat Jame Mosjid."
  },
  twitter: {
    card: "summary",
    title: "Baitun Najat Jame Mosjid",
    description: "Prayer times, community updates, and donation info for Baitun Najat Jame Mosjid."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body">
        <Suspense fallback={null}>
          <TopbarProgress />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
