import { apiOk, normalizeLang } from "../../../../lib/mobile-api";
import { translations } from "../../../../lib/i18n";
import {
  listActiveAnnouncements,
  listActiveCampaignsWithTotals,
  listHadiths,
  listPrayerTimes
} from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = normalizeLang(searchParams.get("lang"));
  const copy = translations[lang];
  const nowIso = new Date().toISOString();

  const [prayerTimes, announcements, campaigns, hadiths] = await Promise.all([
    listPrayerTimes(),
    listActiveAnnouncements(nowIso),
    listActiveCampaignsWithTotals(),
    listHadiths()
  ]);

  return apiOk({
    hero: copy.hero,
    prayer: {
      title: copy.prayer.title,
      subtitle: copy.prayer.subtitle,
      items: prayerTimes
    },
    announcements,
    campaigns: campaigns.slice(0, 4),
    hadith: {
      title: copy.hadith.title,
      subtitle: copy.hadith.subtitle,
      items: hadiths.slice(0, 6)
    },
    guides: {
      title: copy.guides.title,
      subtitle: copy.guides.subtitle,
      items: [
        {
          key: "namaz-guide",
          title: copy.guides.namazTitle,
          subtitle: copy.guides.namazSubtitle
        },
        {
          key: "hadith-library",
          title: copy.guides.hadithTitle,
          subtitle: copy.guides.hadithSubtitle
        }
      ]
    }
  });
}
