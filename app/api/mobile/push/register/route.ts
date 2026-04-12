import { apiError, apiOk } from "../../../../../lib/mobile-api";
import { upsertMobileDevice } from "../../../../../lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { token?: string; platform?: string; lang?: string }
    | null;

  const token = body?.token?.trim();
  if (!token) return apiError("Push token is required", 400);

  await upsertMobileDevice({
    token,
    platform: body?.platform ?? null,
    lang: body?.lang ?? null
  });
  return apiOk({ token });
}
