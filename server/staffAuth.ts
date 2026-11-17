import { createHash, randomBytes, randomInt, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(nodeScrypt);

export const STAFF_EMAILS = ["rayan@nexusfacility.au", "vinu@nexusfacility.au"] as const;
export const STAFF_SESSION_COOKIE = "nexus_staff_session";

export function normalizeStaffEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAllowedStaffEmail(email: string) {
  return STAFF_EMAILS.includes(normalizeStaffEmail(email) as (typeof STAFF_EMAILS)[number]);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const actual = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(expectedHex, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function makeCode() {
  return String(randomInt(100000, 1000000));
}

export function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function makeSessionToken() {
  return randomBytes(32).toString("hex");
}
