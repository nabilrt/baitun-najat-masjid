import { redirect } from "next/navigation";
import { getCampaignByShareToken } from "../../../../lib/db";
import { getLang, withLang } from "../../../../lib/i18n";

export const runtime = "nodejs";

export default async function CampaignSharePage({
  params,
  searchParams
}: {
  params: { token: string };
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams?.lang);
  const campaign = await getCampaignByShareToken(params.token);
  if (!campaign) {
    redirect(withLang("/campaigns", lang));
  }
  redirect(withLang(`/campaigns/${campaign.slug}`, lang));
}
