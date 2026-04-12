import { apiError, apiOk } from "../../../../../lib/mobile-api";
import { listPrayerReminderPreferences, setPrayerReminderPreference, upsertMobileDevice } from "../../../../../lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token")?.trim();
  if (!token) return apiError("Push token is required", 400);

  const preferences = await listPrayerReminderPreferences(token);
  return apiOk({
    items: preferences.map((item) => ({
      prayerId: item.prayer_id,
      enabled: Boolean(item.enabled)
    }))
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { token?: string; prayerId?: number; enabled?: boolean; lang?: string; platform?: string }
    | null;

  const token = body?.token?.trim();
  const prayerId = Number(body?.prayerId);
  if (!token || !prayerId) return apiError("Push token and prayer ID are required", 400);

  await upsertMobileDevice({
    token,
    platform: body?.platform ?? null,
    lang: body?.lang ?? null
  });
  await setPrayerReminderPreference(token, prayerId, Boolean(body?.enabled));

  return apiOk({ ok: true });
}
