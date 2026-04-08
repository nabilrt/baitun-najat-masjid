import { apiOk } from "../../../../lib/mobile-api";
import { listHadiths } from "../../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  const items = await listHadiths();
  return apiOk({ items });
}
