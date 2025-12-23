"use client";

import { useState } from "react";
import { Lang, withLang } from "../../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

type Labels = {
  prayer: string;
  donate: string;
  campaigns: string;
  guides: string;
  hadith: string;
  admin: string;
  language: string;
  english: string;
  bangla: string;
  menu: string;
  close: string;
};

export default function MobileNav({ lang, labels }: { lang: Lang; labels: Labels }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700"
      >
        {open ? labels.close : labels.menu}
      </button>
      <div
        className={`mt-4 overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-3 p-4">
          <a href={withLang("/prayer", lang)} className="text-sm font-semibold text-moss-800">{labels.prayer}</a>
          <a href={withLang("/#donate", lang)} className="text-sm font-semibold text-moss-800">{labels.donate}</a>
          <a href={withLang("/campaigns", lang)} className="text-sm font-semibold text-moss-800">{labels.campaigns}</a>
          <a href={withLang("/#guides", lang)} className="text-sm font-semibold text-moss-800">{labels.guides}</a>
          <a href={withLang("/#hadith", lang)} className="text-sm font-semibold text-moss-800">{labels.hadith}</a>
          <a href={withLang("/admin", lang)} className="text-sm font-semibold text-moss-800">{labels.admin}</a>
          <LanguageSwitcher
            lang={lang}
            path="/"
            label={labels.language}
            englishLabel={labels.english}
            banglaLabel={labels.bangla}
          />
        </div>
      </div>
    </div>
  );
}
