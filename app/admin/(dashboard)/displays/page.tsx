import { getDisplayLinkBySlug } from "../../../../lib/db";
import { getLang, translations } from "../../../../lib/i18n";

export const runtime = "nodejs";

export default async function AdminDisplaysPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const display = await getDisplayLinkBySlug("prayer-display");

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-lg font-semibold text-moss-900">{copy.admin.displays.title}</h2>
      <p className="mt-2 text-sm text-moss-600">{copy.admin.displays.subtitle}</p>

      <div className="mt-6 rounded-3xl border border-moss-100 bg-moss-50 p-5">
        <div className="text-base font-semibold text-moss-800">{copy.admin.displays.prayerTitle}</div>
        <div className="mt-2 text-sm text-moss-600">{copy.admin.displays.prayerSubtitle}</div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700"
            href={lang === "bn" ? "/admin/displays/prayer/qr?lang=bn" : "/admin/displays/prayer/qr"}
            target="_blank"
            rel="noreferrer"
          >
            {copy.admin.displays.qrEn}
          </a>
          <a
            className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700"
            href="/admin/displays/prayer/qr?lang=bn"
            target="_blank"
            rel="noreferrer"
          >
            {copy.admin.displays.qrBn}
          </a>
          <a
            className="rounded-full bg-moss-600 px-4 py-2 text-xs font-semibold text-white"
            href={lang === "bn" ? "/admin/displays/prayer/poster?lang=bn" : "/admin/displays/prayer/poster"}
            target="_blank"
            rel="noreferrer"
          >
            {copy.admin.displays.posterEn}
          </a>
          <a
            className="rounded-full bg-moss-600 px-4 py-2 text-xs font-semibold text-white"
            href="/admin/displays/prayer/poster?lang=bn"
            target="_blank"
            rel="noreferrer"
          >
            {copy.admin.displays.posterBn}
          </a>
        </div>
        {display && (
          <div className="mt-4 text-xs text-moss-500">Token: {display.token}</div>
        )}
      </div>
    </div>
  );
}
