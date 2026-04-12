import type { AppLang } from "./language";

export function getHijriDate(lang: AppLang) {
  const locale = lang === "bn" ? "bn-BD-u-ca-islamic" : "en-TN-u-ca-islamic";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}
