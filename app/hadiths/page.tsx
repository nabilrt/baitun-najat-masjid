import type { Metadata } from "next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { listHadithsPaginated } from "../../lib/db";
import { getLang, translations, withLang } from "../../lib/i18n";

export const runtime = "nodejs";

export async function generateMetadata({
  searchParams
}: {
  searchParams?: { lang?: string; page?: string };
}): Promise<Metadata> {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const title = `${copy.brand.name} | ${copy.guides.hadithTitle}`;
  const description = copy.hadithLibrary.subtitle;
  return {
    title,
    description,
    openGraph: { title, description }
  };
}

export default async function HadithLibraryPage({ searchParams }: { searchParams?: { lang?: string; page?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const page = Math.max(1, Number(searchParams?.page ?? "1") || 1);
  const result = await listHadithsPaginated(page, 12);
  const grouped = result.items.reduce<Record<string, typeof result.items>>((acc, item) => {
    const key = lang === "bn" ? item.category_bn || item.category || "সাধারণ" : item.category || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
  const prevHref = page > 1 ? withLang(`/hadiths?page=${page - 1}`, lang) : null;
  const nextHref = page < result.totalPages ? withLang(`/hadiths?page=${page + 1}`, lang) : null;

  return (
    <main className="min-h-screen bg-[#f5f7f2]">
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
              path="/hadiths"
              label={copy.language.label}
              englishLabel={copy.language.english}
              banglaLabel={copy.language.bangla}
            />
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-16">
        <div className="rounded-[32px] bg-white p-6 shadow-soft sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss-500">{copy.guides.title}</p>
          <h1 className="mt-3 font-display text-3xl text-moss-900 sm:text-4xl">{copy.hadithLibrary.title}</h1>
          <p className="mt-3 text-moss-700">{copy.hadithLibrary.subtitle}</p>
        </div>

        <div className="mt-8 space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-moss-900">{category}</h2>
                <div className="h-px flex-1 bg-moss-200" />
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {items.map((hadith) => (
                  <div key={hadith.id} className="rounded-3xl bg-white p-6 shadow-soft">
                    <blockquote className="text-moss-900 text-base leading-relaxed">
                      “{lang === "bn" ? hadith.text_bn || hadith.text : hadith.text}”
                    </blockquote>
                    <div className="mt-4 text-sm text-moss-600 not-italic">
                      {lang === "bn" ? hadith.source_bn || hadith.source : hadith.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-moss-600">
            {lang === "bn"
              ? `পৃষ্ঠা ${result.page} / ${result.totalPages} • মোট ${result.total}টি হাদিস`
              : `Page ${result.page} of ${result.totalPages} • ${result.total} hadiths total`}
          </div>
          <div className="flex items-center gap-3">
            {prevHref ? (
              <a href={prevHref} className="rounded-full border border-moss-200 bg-white px-5 py-2 text-sm font-semibold text-moss-800 shadow-soft">
                {lang === "bn" ? "পূর্বের" : "Previous"}
              </a>
            ) : null}
            {nextHref ? (
              <a href={nextHref} className="rounded-full bg-moss-700 px-5 py-2 text-sm font-semibold text-white shadow-soft">
                {lang === "bn" ? "আরও দেখুন" : "Load More"}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
