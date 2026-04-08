import { apiOk, normalizeLang } from "../../../../lib/mobile-api";
import { translations } from "../../../../lib/i18n";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = normalizeLang(searchParams.get("lang"));
  const copy = translations[lang];

  return apiOk({
    namazGuide: copy.namazGuide,
    hadithLibrary: copy.hadithLibrary
  });
}
