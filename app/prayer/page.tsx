import { listPrayerTimes } from "../../lib/db";
import PrayerTimesGrid from "../components/PrayerTimesGrid";
import { getLang, translations } from "../../lib/i18n";

export const runtime = "nodejs";

export default async function PrayerDisplayPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const prayerTimes = await listPrayerTimes();
  const prayerTimesPlain = prayerTimes.map((time) => ({
    id: time.id,
    name: time.name,
    name_bn: time.name_bn ?? null,
    azan_time: time.azan_time,
    prayer_time: time.prayer_time
  }));

  return (
    <main className="min-h-screen bg-[#0f211a] text-[#f5f7f2]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <header className="rounded-[28px] bg-[#143025] p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">{copy.prayerDisplay.kicker}</p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl">{copy.brand.name}</h1>
              <p className="mt-2 text-sm text-[#c7d8c9]">{copy.brand.address}</p>
            </div>
            <div className="rounded-2xl bg-[#10281e] px-4 py-3 text-sm text-[#c7d8c9]">
              <div className="text-xs uppercase tracking-[0.25em] text-gold-300">{copy.prayerDisplay.today}</div>
              <div className="mt-2 text-lg font-semibold">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}
              </div>
            </div>
          </div>
        </header>

        <PrayerTimesGrid times={prayerTimesPlain} copy={copy} />

      </div>
    </main>
  );
}
