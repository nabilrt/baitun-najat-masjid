import QRCode from "qrcode";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminSession } from "../../../../../../lib/auth";
import { getDisplayLinkBySlug } from "../../../../../../lib/db";
import { getLang, translations, withLang } from "../../../../../../lib/i18n";
import DownloadPosterButton from "../../../../../components/DownloadPosterButton";

export const runtime = "nodejs";

function getOrigin() {
  const headerList = headers();
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export default async function PrayerPosterPage({ searchParams }: { searchParams?: { lang?: string } }) {
  if (!isAdminSession()) {
    redirect("/admin");
  }

  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const display = await getDisplayLinkBySlug("prayer-display");
  if (!display) {
    redirect(withLang("/admin/displays", lang));
  }

  const path = `/display/prayer/${display.token}${lang === "bn" ? "?lang=bn" : ""}`;
  const target = `${getOrigin()}${path}`;
  const qrData = await QRCode.toDataURL(target, { width: 420, margin: 1 });

  return (
    <main className="min-h-screen bg-[#f5f7f2] p-6">
      <div className="flex justify-center">
        <div id="prayer-poster" className="w-[820px] max-w-full rounded-[32px] bg-white p-8 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-moss-500">{copy.admin.displays.posterKicker}</p>
              <h1 className="mt-2 font-display text-3xl text-moss-900">{copy.admin.displays.posterTitle}</h1>
              <p className="mt-2 text-moss-700">{copy.brand.address}</p>
            </div>
            <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-moss-600 text-2xl text-white">🕌</div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_240px]">
            <div className="rounded-3xl bg-moss-900 p-6 text-moss-50">
              <h2 className="text-lg font-semibold">{copy.admin.displays.posterCardTitle}</h2>
              <p className="mt-2 text-sm text-moss-200">{copy.admin.displays.posterCardBody}</p>
              <div className="mt-6 rounded-2xl bg-moss-800 px-4 py-3 text-base font-semibold">{copy.admin.displays.openLink}</div>
              <div className="mt-2 text-sm text-moss-200">{copy.brand.name}</div>
            </div>
            <div className="rounded-3xl border border-moss-100 bg-moss-50 p-4 text-center">
              <img src={qrData} alt="QR Code" className="mx-auto h-44 w-44" />
              <p className="mt-3 text-sm font-semibold text-moss-700">{copy.admin.displays.posterScanTitle}</p>
              <p className="mt-1 text-xs text-moss-500">{copy.admin.displays.posterScanHint}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-moss-900">{copy.footer.title}</div>
              <div className="text-xs text-moss-600">{copy.footer.address}</div>
            </div>
            <DownloadPosterButton
              targetId="prayer-poster"
              fileName={`prayer-display-${lang}.png`}
              label={copy.poster.download}
              loadingLabel={copy.poster.downloading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
