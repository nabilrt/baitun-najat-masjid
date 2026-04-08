import { apiOk } from "../../../../lib/mobile-api";
import { listActiveCampaignsWithTotals } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const items = await listActiveCampaignsWithTotals();
  return apiOk({ items });
}
