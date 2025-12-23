import LanguageSwitcher from "../components/LanguageSwitcher";
import PasswordField from "../components/PasswordField";
import { loginAdminAction } from "../../lib/actions";
import { getLang, translations, withLang } from "../../lib/i18n";

export const runtime = "nodejs";

export default function AdminLoginPage({ searchParams }: { searchParams?: { lang?: string; error?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-moss-600 text-2xl text-white">🕌</div>
          <h1 className="font-display text-2xl text-moss-900">{copy.login.title}</h1>
          <p className="mt-2 text-sm text-moss-600">{copy.login.subtitle}</p>
        </div>
        <form className="mt-6 grid gap-3" action={loginAdminAction}>
          <input type="hidden" name="lang" value={lang} />
          <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="username" placeholder={copy.login.username} required />
          <PasswordField
            placeholder={copy.login.password}
            showLabel={copy.login.show}
            hideLabel={copy.login.hide}
          />
          <button className="mt-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft" type="submit">{copy.login.button}</button>
        </form>
        {searchParams?.error === "1" && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {copy.login.error}
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-moss-600">
          <a className="font-semibold text-moss-700 hover:text-moss-900" href={withLang("/", lang)}>← {copy.login.back}</a>
          <LanguageSwitcher
            lang={lang}
            path="/admin"
            label={copy.language.label}
            englishLabel={copy.language.english}
            banglaLabel={copy.language.bangla}
          />
        </div>
      </div>
    </main>
  );
}
