import { listPrayerTimes } from "../../lib/db";
import IqamahCountdown from "../components/IqamahCountdown";
import { getLang, translations } from "../../lib/i18n";

export const runtime = "nodejs";

export default async function PrayerDisplayPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const prayerTimes = await listPrayerTimes();

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

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prayerTimes.map((time) => (
            <div key={time.id} className="rounded-[26px] bg-[#143025] p-5 shadow-soft sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">{time.name}</div>
                  <div className="mt-2 text-2xl font-semibold">{time.name_bn ?? ""}</div>
                </div>
                <div className="rounded-full bg-[#1e3c2e] px-3 py-1 text-xs text-[#c7d8c9]">Iqamah</div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#10281e] px-4 py-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#9ebaa4]">{copy.prayerDisplay.adhan}</div>
                  <div className="mt-1 text-lg font-semibold text-[#f5f7f2]">{time.azan_time}</div>
                </div>
                <div className="h-10 w-px bg-[#2f4f3c]" />
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#9ebaa4]">{copy.prayerDisplay.iqamah}</div>
                  <div className="mt-1 text-lg font-semibold text-[#f5f7f2]">{time.prayer_time}</div>
                </div>
              </div>
              <IqamahCountdown timeLabel={copy.prayerDisplay.timeLeft} timeValue={time.prayer_time} />
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
