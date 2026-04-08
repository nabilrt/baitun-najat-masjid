import { apiError, apiOk } from "../../../../lib/mobile-api";
import { addDonation } from "../../../../lib/db";

export const runtime = "nodejs";

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.toString().trim();
  const amount = toNumber(body?.amount);
  const bkashNumber = body?.bkashNumber?.toString().trim();
  const transactionId = body?.transactionId?.toString().trim();
  const note = body?.note?.toString().trim();
  const campaignIdValue = body?.campaignId;
  const campaignId =
    campaignIdValue === null || campaignIdValue === undefined || campaignIdValue === ""
      ? null
      : toNumber(campaignIdValue);

  if (!name || !bkashNumber || !transactionId || Number.isNaN(amount) || amount <= 0) {
    return apiError("Invalid donation payload", 400);
  }

  await addDonation({
    name,
    amount,
    bkashNumber,
    transactionId,
    note: note || undefined,
    campaignId: Number.isNaN(campaignId) ? null : campaignId
  });

  return apiOk({ ok: true }, { status: 201 });
}
