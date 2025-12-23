import { Lang, withLang } from "../../lib/i18n";

export default function LanguageSwitcher({
  lang,
  path,
  label,
  englishLabel,
  banglaLabel
}: {
  lang: Lang;
  path: string;
  label: string;
  englishLabel: string;
  banglaLabel: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-moss-200 px-3 py-2 text-xs font-semibold text-moss-700">
      <span className="text-moss-500">{label}</span>
      <a className={`px-2 ${lang === "en" ? "text-moss-900" : "text-moss-500"}`} href={withLang(path, "en")}>{englishLabel}</a>
      <span className="text-moss-300">|</span>
      <a className={`px-2 ${lang === "bn" ? "text-moss-900" : "text-moss-500"}`} href={withLang(path, "bn")}>{banglaLabel}</a>
    </div>
  );
}
