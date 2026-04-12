import { apiOk } from "../../../../lib/mobile-api";
import { listMobileNotifications } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const items = await listMobileNotifications(50);
  return apiOk({ items });
}
