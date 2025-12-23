import LanguageSwitcher from "../../components/LanguageSwitcher";
import ShareLink from "../../components/ShareLink";
import { notFound } from "next/navigation";
import { getCampaignBySlugWithTotals, listActiveAnnouncements } from "../../../lib/db";
import CampaignDonationForm from "../../components/CampaignDonationForm";
import { getLang, translations, withLang } from "../../../lib/i18n";

export const runtime = "nodejs";

export default async function CampaignDetailPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const campaign = await getCampaignBySlugWithTotals(params.slug);
  if (!campaign || !campaign.is_active) {
    notFound();
  }
  const announcements = await listActiveAnnouncements(new Date().toISOString());
  const bkashNumber = process.env.BKASH_NUMBER || "01XXXXXXXXX";
  const goal = campaign.goal_amount ?? 0;
  const total = campaign.total_confirmed ?? 0;
  const percent = goal > 0 ? Math.min(100, Math.round((total / goal) * 100)) : 0;
  const remaining = goal > 0 ? Math.max(0, goal - total) : 0;

  return (
    <main className="flex min-h-screen flex-col gap-12 sm:gap-16 pb-0">
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
            <a href={withLang("/campaigns", lang)} className="hover:text-moss-900">{copy.nav.campaigns}</a>
            <a href={withLang("/admin", lang)} className="rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-[#1a1a1a] shadow-soft">{copy.nav.admin}</a>
            <LanguageSwitcher
              lang={lang}
              path={`/campaigns/${campaign.slug}`}
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
        <div className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
          <p className="text-sm font-semibold text-moss-500">{copy.campaignDetail.label}</p>
          <h1 className="mt-2 font-display text-3xl text-moss-900">{campaign.title}</h1>
          <p className="mt-4 text-moss-700">{campaign.description}</p>
          {goal > 0 && (
            <div className="mt-6">
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
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <ShareLink
          path={withLang(`/campaigns/share/${campaign.share_token ?? campaign.slug}`, lang)}
          title={copy.campaignDetail.shareTitle}
          buttonLabel={copy.campaignDetail.shareButton}
          copiedLabel={copy.campaignDetail.shareCopied}
        />
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
            <h2 className="text-lg font-semibold text-moss-900">{copy.campaignDetail.donateTitle}</h2>
            <p className="mt-2 text-sm text-moss-600">{copy.campaignDetail.donateSubtitle}</p>
            <CampaignDonationForm campaignId={campaign.id} copy={copy} />
          </div>
          <div className="rounded-3xl bg-moss-900 p-5 text-moss-50 shadow-soft sm:p-6">
            <h3 className="text-lg font-semibold">{copy.campaignDetail.bkashTitle}</h3>
            <p className="mt-2 text-sm text-moss-200">{copy.campaignDetail.bkashSubtitle}</p>
            <div className="mt-4 rounded-2xl bg-moss-800 px-4 py-3 text-base font-semibold">{bkashNumber}</div>
            <div className="mt-6 text-sm text-moss-200">{copy.campaignDetail.supportNote}</div>
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
