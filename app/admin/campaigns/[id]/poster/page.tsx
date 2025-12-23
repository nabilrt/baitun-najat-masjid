import QRCode from "qrcode";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCampaignById } from "../../../../../lib/db";
import { isAdminSession } from "../../../../../lib/auth";
import { getLang, translations, withLang } from "../../../../../lib/i18n";
import DownloadPosterButton from "../../../../components/DownloadPosterButton";

export const runtime = "nodejs";

function getOrigin() {
  const headerList = headers();
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export default async function CampaignPosterPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: { lang?: string };
}) {
  if (!isAdminSession()) {
    redirect("/admin");
  }

  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const id = Number(params.id);
  if (!id) {
    redirect(withLang("/admin/campaigns", lang));
  }

  const campaign = await getCampaignById(id);
  if (!campaign || !campaign.share_token) {
    redirect(withLang("/admin/campaigns", lang));
  }

  const origin = getOrigin();
  const path = `/campaigns/share/${campaign.share_token}${lang === "bn" ? "?lang=bn" : ""}`;
  const target = `${origin}${path}`;
  const qrData = await QRCode.toDataURL(target, { width: 420, margin: 1 });
  const donationHadiths = [
    {
      en: "The believer’s shade on the Day of Resurrection will be his charity.",
      bn: "কিয়ামতের দিনে মুমিনের ছায়া হবে তার সদকা।",
      refEn: "Jami` at-Tirmidhi 604",
      refBn: "জামি` আত-তিরমিজি ৬০৪"
    },
    {
      en: "Charity does not decrease wealth.",
      bn: "সদকা সম্পদ কমায় না।",
      refEn: "Sahih Muslim 2588",
      refBn: "সহিহ মুসলিম ২৫৮৮"
    },
    {
      en: "Save yourself from Hellfire even by giving half a date in charity.",
      bn: "অর্ধেক খেজুর হলেও সদকা দিয়ে আগুন থেকে বাঁচার চেষ্টা করো।",
      refEn: "Sahih al-Bukhari 1417",
      refBn: "সহিহ আল-বুখারি ১৪১৭"
    }
  ];
  const hadith = donationHadiths[Math.floor(Math.random() * donationHadiths.length)];

  return (
    <main className="min-h-screen bg-[#f5f7f2] p-6">
      <div className="flex justify-center">
        <div id="poster-capture" className="w-[820px] max-w-full rounded-[32px] bg-white p-8 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-moss-500">{copy.poster.kicker}</p>
            <h1 className="mt-2 font-display text-3xl text-moss-900">{campaign.title}</h1>
            <p className="mt-2 text-moss-700">{campaign.description}</p>
          </div>
          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-moss-600 text-2xl text-white">🕌</div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_240px]">
          <div className="rounded-3xl bg-moss-900 p-6 text-moss-50">
            <h2 className="text-lg font-semibold">{copy.poster.ctaTitle}</h2>
            <p className="mt-2 text-sm text-moss-200">{copy.poster.ctaSubtitle}</p>
            <div className="mt-6 rounded-2xl bg-moss-800 px-4 py-3 text-base font-semibold">{copy.poster.bkashLabel}</div>
            <div className="mt-2 text-sm text-moss-200">{process.env.BKASH_NUMBER || "01XXXXXXXXX"}</div>
            <div className="mt-6 rounded-2xl bg-moss-800/60 px-4 py-3 text-sm text-moss-100">
              “{lang === "bn" ? hadith.bn : hadith.en}”
              <div className="mt-2 text-xs text-moss-200">{lang === "bn" ? hadith.refBn : hadith.refEn}</div>
            </div>
          </div>
          <div className="rounded-3xl border border-moss-100 bg-moss-50 p-4 text-center">
            <img src={qrData} alt="QR Code" className="mx-auto h-44 w-44" />
            <p className="mt-3 text-sm font-semibold text-moss-700">{copy.poster.scan}</p>
            <p className="mt-1 text-xs text-moss-500">{copy.poster.scanHint}</p>
          </div>
        </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-moss-900">{copy.footer.title}</div>
              <div className="text-xs text-moss-600">{copy.footer.address}</div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-moss-100 bg-moss-50 px-3 py-1 text-xs font-semibold text-moss-600">
                <span>{copy.footer.website}</span>
                <span className="h-1 w-1 rounded-full bg-moss-300" />
                <span className="text-moss-700">{origin}</span>
              </div>
            </div>
            <DownloadPosterButton
              targetId="poster-capture"
              fileName={`campaign-${campaign.id}-${lang}.png`}
              label={copy.poster.download}
              loadingLabel={copy.poster.downloading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
