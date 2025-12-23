import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "baitun-najat";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "baitun_najat_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function base64Url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("base64url");
}

export function isValidAdmin(username: string, password: string) {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

export function createSessionCookie() {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = JSON.stringify({ exp });
  const encoded = base64Url(payload);
  const signature = signPayload(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionCookie(token: string | undefined) {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  const expected = signPayload(encoded);
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { exp: number };
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdminSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySessionCookie(token);
}

export function setAdminSession() {
  const token = createSessionCookie();
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_MS / 1000,
    path: "/"
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
}
