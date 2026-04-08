import { apiOk } from "../../../../lib/mobile-api";
import { listPrayerTimes } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const items = await listPrayerTimes();
  return apiOk({ items });
}
