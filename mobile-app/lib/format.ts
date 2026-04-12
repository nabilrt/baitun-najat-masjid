import type { AppLang } from "./language";

export function formatLocalizedDigits(value: string, lang: AppLang) {
  if (lang !== "bn") return value;
  return value.replace(/\d/g, (digit) => String.fromCharCode(0x09e6 + Number(digit)));
}
