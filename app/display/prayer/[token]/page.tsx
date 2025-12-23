import { notFound } from "next/navigation";
import { getDisplayLinkByToken } from "../../../../lib/db";
import PrayerDisplayPage from "../../../prayer/page";

export const runtime = "nodejs";

export default async function PrayerDisplayTokenPage({
  params,
  searchParams
}: {
  params: { token: string };
  searchParams?: { lang?: string };
}) {
  const record = await getDisplayLinkByToken(params.token);
  if (!record) {
    notFound();
  }
  return <PrayerDisplayPage searchParams={searchParams} />;
}
