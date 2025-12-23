import LanguageSwitcher from "../components/LanguageSwitcher";
import { listActiveAnnouncements, listActiveCampaignsWithTotals } from "../../lib/db";
import { getLang, translations, withLang } from "../../lib/i18n";

export const runtime = "nodejs";

export default async function CampaignsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const campaigns = await listActiveCampaignsWithTotals();
  const announcements = await listActiveAnnouncements(new Date().toISOString());

  return (
    <main className="flex min-h-screen flex-col gap-12 sm:gap-16">
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <nav className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-moss-600 text-white flex items-center justify-center text-2xl shadow-soft">🕌</div>
            <div>
              <div className="font-semibold text-lg">{copy.brand.name}</div>
              <div className="text-sm text-moss-700">{copy.brand.address}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-moss-700">
            <a href={withLang("/", lang)} className="hover:text-moss-900">{copy.nav.home}</a>
            <a href={withLang("/#donate", lang)} className="hover:text-moss-900">{copy.nav.donate}</a>
            <a href={withLang("/admin", lang)} className="rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-[#1a1a1a] shadow-soft">{copy.nav.admin}</a>
            <LanguageSwitcher
              lang={lang}
              path="/campaigns"
              label={copy.language.label}
              englishLabel={copy.language.english}
              banglaLabel={copy.language.bangla}
            />
          </div>
        </nav>
      </header>

      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 -mt-10 -mb-10">
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
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-3xl text-moss-900">{copy.campaigns.title}</h1>
          <p className="max-w-2xl text-moss-700">{copy.campaigns.subtitle}</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {campaigns.length === 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-soft text-sm text-moss-500">{copy.campaigns.noActive}</div>
          )}
          {campaigns.map((campaign) => {
            const goal = campaign.goal_amount ?? 0;
            const total = campaign.total_confirmed ?? 0;
            const percent = goal > 0 ? Math.min(100, Math.round((total / goal) * 100)) : 0;
            const remaining = goal > 0 ? Math.max(0, goal - total) : 0;
            return (
              <a key={campaign.id} href={withLang(`/campaigns/${campaign.slug}`, lang)} className="rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-xl sm:p-6">
                <h2 className="text-lg font-semibold text-moss-900">{campaign.title}</h2>
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
                <div className="mt-4 text-sm font-semibold text-moss-700">{copy.campaigns.viewCampaign}</div>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
