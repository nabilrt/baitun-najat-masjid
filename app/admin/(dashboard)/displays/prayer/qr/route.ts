import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { headers } from "next/headers";
import { isAdminSession } from "../../../../../../lib/auth";
import { getDisplayLinkBySlug } from "../../../../../../lib/db";

export const runtime = "nodejs";

function getOrigin() {
  const headerList = headers();
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function GET(request: Request) {
  if (!isAdminSession()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const display = await getDisplayLinkBySlug("prayer-display");
  if (!display) {
    return new NextResponse("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const lang = url.searchParams.get("lang");
  const path = `/display/prayer/${display.token}${lang === "bn" ? "?lang=bn" : ""}`;
  const target = `${getOrigin()}${path}`;

  const png = await QRCode.toBuffer(target, { width: 512, margin: 1 });
  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store"
    }
  });
}
