import { apiError, apiOk } from "../../../../../lib/mobile-api";
import { getCampaignBySlugWithTotals } from "../../../../../lib/db";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const campaign = await getCampaignBySlugWithTotals(params.slug);
  if (!campaign || !campaign.is_active) {
    return apiError("Campaign not found", 404);
  }
  return apiOk({ item: campaign });
}
