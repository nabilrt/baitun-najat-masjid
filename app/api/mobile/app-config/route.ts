import { apiOk, normalizeLang } from "../../../../lib/mobile-api";
import { translations } from "../../../../lib/i18n";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = normalizeLang(searchParams.get("lang"));
  const copy = translations[lang];

  return apiOk({
    brand: copy.brand,
    contact: copy.footer,
    bkashNumber: process.env.BKASH_NUMBER || "01XXXXXXXXX",
    menu: [
      { key: "home", label: copy.nav.home, enabled: true },
      { key: "prayer", label: copy.nav.prayer, enabled: true },
      { key: "campaigns", label: copy.nav.campaigns, enabled: true },
      { key: "donate", label: copy.nav.donate, enabled: true },
      { key: "namaz-guide", label: copy.guides.namazTitle, enabled: true },
      { key: "hadith-library", label: copy.guides.hadithTitle, enabled: true },
      { key: "announcements", label: copy.announcementLabel, enabled: true }
    ],
    features: {
      announcements: true,
      prayerTimes: true,
      campaigns: true,
      donations: true,
      namazGuide: true,
      hadithLibrary: true
    }
  });
}
