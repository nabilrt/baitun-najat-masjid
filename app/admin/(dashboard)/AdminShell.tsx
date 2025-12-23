"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { getLang, translations } from "../../../lib/i18n";

export default function AdminShell({
  children,
  logoutAction
}: {
  children: React.ReactNode;
  logoutAction: () => Promise<void>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = getLang(searchParams.get("lang") ?? undefined);
  const copy = translations[lang];

  return (
    <main className="min-h-screen bg-[#f3f4ef]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 pb-10 pt-4 sm:pt-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-moss-900 p-5 text-moss-50 shadow-soft sm:p-6 lg:sticky lg:top-8 lg:self-start">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss-700 text-2xl">🕌</div>
            <div>
              <div className="text-base font-semibold">Baitun Najat</div>
              <div className="text-xs text-moss-200">{copy.admin.title}</div>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="ml-auto inline-flex items-center justify-center rounded-full border border-moss-700/60 px-3 py-2 text-xs font-semibold text-moss-100 lg:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
          <div className={`${menuOpen ? "mt-6 grid gap-4" : "mt-0 hidden"} lg:mt-6 lg:grid lg:gap-4`}>
            <AdminSidebar />
            <form action={logoutAction}>
              <button className="w-full rounded-full bg-gold-400 px-4 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft" type="submit">
                {copy.admin.logout}
              </button>
            </form>
          </div>
        </aside>

        <section className="space-y-5 sm:space-y-8">
          <header className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl text-moss-900">{copy.admin.title}</h1>
                <p className="mt-2 text-sm text-moss-600">{copy.admin.subtitle}</p>
              </div>
              <LanguageSwitcher
                lang={lang}
                path={pathname}
                label={copy.language.label}
                englishLabel={copy.language.english}
                banglaLabel={copy.language.bangla}
              />
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
