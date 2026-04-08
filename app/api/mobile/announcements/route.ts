import { apiOk } from "../../../../lib/mobile-api";
import { listActiveAnnouncements } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const items = await listActiveAnnouncements(new Date().toISOString());
  return apiOk({ items });
}
