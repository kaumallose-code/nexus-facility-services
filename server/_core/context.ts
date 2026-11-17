import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { StaffAccount, User } from "../../drizzle/schema";
import { getStaffAccount, getStaffSession } from "../db";
import { hashValue, STAFF_SESSION_COOKIE } from "../staffAuth";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  staff?: StaffAccount | null;
};

function readCookie(header: string | undefined, name: string) {
  if (!header) return undefined;
  const pair = header.split(";").map((value) => value.trim()).find((value) => value.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : undefined;
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;
  let staff: StaffAccount | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  try {
    const token = readCookie(opts.req.headers.cookie, STAFF_SESSION_COOKIE);
    if (token) {
      const session = await getStaffSession(hashValue(token));
      if (session) staff = (await getStaffAccount(session.email)) ?? null;
    }
  } catch {
    staff = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
    staff,
  };
}
