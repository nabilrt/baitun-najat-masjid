import LanguageSwitcher from "./components/LanguageSwitcher";
import MobileNav from "./components/MobileNav";
import {
  listActiveAnnouncements,
  listActiveCampaignsWithTotals,
  listConfirmedDonations,
  listHadiths,
  listPrayerTimes
} from "../lib/db";
import DonationForm from "./components/DonationForm";
import { getLang, translations, withLang } from "../lib/i18n";

export const runtime = "nodejs";

export default async function HomePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const prayerTimes = await listPrayerTimes();
  const hadiths = await listHadiths();
  const confirmedDonations = await listConfirmedDonations();
  const campaigns = await listActiveCampaignsWithTotals();
  const announcements = await listActiveAnnouncements(new Date().toISOString());
  const bkashNumber = process.env.BKASH_NUMBER || "01XXXXXXXXX";

  return (
    <main className="flex flex-col gap-20">
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <nav className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-moss-600 text-white flex items-center justify-center text-2xl shadow-soft">🕌</div>
            <div>
              <div className="font-semibold text-lg">{copy.brand.name}</div>
              <div className="text-sm text-moss-700">{copy.brand.address}</div>
            </div>
          </div>
          <div className="hidden md:flex flex-wrap items-center gap-3 text-sm font-medium text-moss-700">
            <a href={withLang("/prayer", lang)} className="hover:text-moss-900">{copy.nav.prayer}</a>
            <a href={withLang("/#donate", lang)} className="hover:text-moss-900">{copy.nav.donate}</a>
            <a href={withLang("/campaigns", lang)} className="hover:text-moss-900">{copy.nav.campaigns}</a>
            <a href={withLang("/#hadith", lang)} className="hover:text-moss-900">{copy.nav.hadith}</a>
            <a href={withLang("/admin", lang)} className="rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-[#1a1a1a] shadow-soft">{copy.nav.admin}</a>
            <LanguageSwitcher
              lang={lang}
              path="/"
              label={copy.language.label}
              englishLabel={copy.language.english}
              banglaLabel={copy.language.bangla}
            />
          </div>
          <MobileNav
            lang={lang}
            labels={{
              prayer: copy.nav.prayer,
              donate: copy.nav.donate,
              campaigns: copy.nav.campaigns,
              hadith: copy.nav.hadith,
              admin: copy.nav.admin,
              language: copy.language.label,
              english: copy.language.english,
              bangla: copy.language.bangla,
              menu: copy.menu.open,
              close: copy.menu.close
            }}
          />
        </nav>
      </header>

      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-12 -mb-12">
          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-3xl border border-gold-300/40 bg-white px-6 py-4 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-wide text-gold-600">{copy.announcementLabel}</div>
                <div className="mt-1 text-base font-semibold text-moss-900">
                  {lang === "bn" ? announcement.title_bn || announcement.title : announcement.title}
                </div>
                <p className="mt-1 text-sm text-moss-700">
                  {lang === "bn" ? announcement.message_bn || announcement.message : announcement.message}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-hero text-white shadow-soft">
          <div className="pattern-grid absolute inset-0 opacity-80" />
          <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:p-14">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">{copy.hero.title}</h1>
              <p className="mt-4 text-white/80 text-base sm:text-lg">{copy.hero.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft">{copy.hero.cta}</button>
                <div className="flex items-center gap-2 rounded-full border border-white/40 px-4 py-3 text-xs text-white/80">{copy.hero.friday}</div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">{copy.hero.highlightsTitle}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {copy.hero.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-gold-400" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6" id="prayer">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl text-moss-900">{copy.prayer.title}</h2>
          <p className="max-w-2xl text-moss-700">{copy.prayer.subtitle}</p>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-moss-50 text-moss-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{copy.prayer.table.prayer}</th>
                  <th className="px-6 py-4 text-left font-semibold">{copy.prayer.table.adhan}</th>
                  <th className="px-6 py-4 text-left font-semibold">{copy.prayer.table.iqamah}</th>
                </tr>
              </thead>
              <tbody>
                {prayerTimes.map((time) => (
                  <tr key={time.id} className="border-t border-moss-100">
                    <td className="px-6 py-4 font-medium text-moss-900">
                      {lang === "bn" ? time.name_bn || time.name : time.name}
                    </td>
                    <td className="px-6 py-4 text-moss-700">{time.azan_time}</td>
                    <td className="px-6 py-4 text-moss-700">{time.prayer_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6" id="donate">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl text-moss-900">{copy.donate.title}</h2>
          <p className="max-w-2xl text-moss-700">{copy.donate.subtitle}</p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="inline-flex items-center gap-2 rounded-full bg-moss-100 px-4 py-2 text-sm font-semibold text-moss-700">bKash: {bkashNumber}</div>
            <h3 className="mt-4 text-lg font-semibold text-moss-900">{copy.donate.formTitle}</h3>
            <DonationForm campaigns={campaigns} copy={copy} />
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-moss-900">{copy.donate.confirmedTitle}</h3>
            <p className="mt-2 text-sm text-moss-600">{copy.donate.confirmedSubtitle}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="text-moss-600">
                  <tr>
                    <th className="pb-3 text-left font-semibold">{copy.donate.table.name}</th>
                    <th className="pb-3 text-left font-semibold">{copy.donate.table.amount}</th>
                    <th className="pb-3 text-left font-semibold">{copy.donate.table.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedDonations.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-moss-500">{copy.donate.empty}</td>
                    </tr>
                  )}
                  {confirmedDonations.map((donation) => (
                    <tr key={donation.id} className="border-t border-moss-100">
                      <td className="py-3 font-medium text-moss-800">{donation.name}</td>
                      <td className="py-3 text-moss-700">BDT {donation.amount}</td>
                      <td className="py-3 text-moss-600">{new Date(donation.confirmed_at ?? donation.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6" id="campaigns">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-moss-900">{copy.campaigns.title}</h2>
            <p className="max-w-2xl text-moss-700">{copy.campaigns.subtitle}</p>
          </div>
          <a href={withLang("/campaigns", lang)} className="inline-flex items-center justify-center rounded-full border border-moss-200 px-5 py-2 text-sm font-semibold text-moss-700 hover:bg-moss-50">{copy.campaigns.viewAll}</a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {campaigns.map((campaign) => {
            const goal = campaign.goal_amount ?? 0;
            const total = campaign.total_confirmed ?? 0;
            const percent = goal > 0 ? Math.min(100, Math.round((total / goal) * 100)) : 0;
            const remaining = goal > 0 ? Math.max(0, goal - total) : 0;
            return (
              <div className="rounded-3xl bg-white p-6 shadow-soft" key={campaign.id}>
                <h3 className="text-lg font-semibold text-moss-900">{campaign.title}</h3>
                <p className="mt-2 text-sm text-moss-600">{campaign.description}</p>
                {goal > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-moss-600">
                      <span>{copy.campaigns.collected}: BDT {total}</span>
                      <span>{copy.campaigns.goal}: BDT {goal}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-moss-100">
                      <div className="h-2 rounded-full bg-gold-400" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-moss-500">{copy.campaigns.remaining}: BDT {remaining}</div>
                  </div>
                )}
                {goal === 0 && (
                  <div className="mt-4 text-xs text-moss-600">{copy.campaigns.collected}: BDT {total}</div>
                )}
                <a className="mt-4 inline-flex text-sm font-semibold text-moss-700" href={withLang(`/campaigns/${campaign.slug}`, lang)}>{copy.campaigns.viewCampaign}</a>
              </div>
            );
          })}
          {campaigns.length === 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-soft text-sm text-moss-500">{copy.campaigns.noActive}</div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6" id="hadith">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl text-moss-900">{copy.hadith.title}</h2>
          <p className="max-w-2xl text-moss-700">{copy.hadith.subtitle}</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {hadiths.map((hadith) => (
            <div className="rounded-3xl bg-white p-6 shadow-soft" key={hadith.id}>
              <blockquote className="text-moss-900 text-base leading-relaxed">“{hadith.text}”</blockquote>
              <cite className="mt-4 block text-sm text-moss-600 not-italic">{hadith.source}</cite>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6" id="location">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl text-moss-900">{copy.location.title}</h2>
          <p className="max-w-2xl text-moss-700">{copy.location.subtitle}</p>
        </div>
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-moss-700">Google Maps</div>
              <div className="text-xs text-moss-500">Tap to open the exact location.</div>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft"
              href="https://maps.app.goo.gl/eLSEsphi3ETwNQKQA"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-12 bg-moss-900 text-moss-50">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">{copy.footer.title}</h3>
            <p className="mt-2 text-sm text-moss-100">{copy.footer.address}</p>
          </div>
          <div>
            <h4 className="text-base font-semibold">{copy.footer.contact}</h4>
            <p className="mt-2 text-sm text-moss-100">{copy.footer.phone}</p>
            <p className="text-sm text-moss-100">{copy.footer.email}</p>
          </div>
          <div>
            <h4 className="text-base font-semibold">{copy.footer.quick}</h4>
            {copy.footer.quickItems.map((item) => (
              <p key={item} className="mt-2 text-sm text-moss-100">{item}</p>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
