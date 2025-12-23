import LanguageSwitcher from "../components/LanguageSwitcher";
import { getLang, translations, withLang } from "../../lib/i18n";

export const runtime = "nodejs";

export default function NamazGuidePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];

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
              path="/namaz"
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
          <h1 className="mt-3 font-display text-3xl text-moss-900 sm:text-4xl">{copy.namazGuide.title}</h1>
          <p className="mt-3 text-moss-700">{copy.namazGuide.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-moss-900">{copy.namazGuide.rakahTitle}</h2>
            <p className="mt-2 text-sm text-moss-600">{copy.namazGuide.rakahNote}</p>
            <div className="mt-4 grid gap-3">
              {copy.namazGuide.rakahItems.map((item) => (
                <div key={item.name} className="rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3">
                  <div className="text-sm font-semibold text-moss-800">{item.name}</div>
                  <div className="text-sm text-moss-600">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-moss-900">{copy.namazGuide.rulesTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-moss-700">
              {copy.namazGuide.rules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gold-400" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
