import { and, desc, eq, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertInspectionReport, InsertUser, inspectionClients, inspectionReports, staffAccounts, staffSessions, staffVerificationCodes, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function insertInspectionReport(report: InsertInspectionReport) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save inspection report: database not available");
    return undefined;
  }
  const result = await db.insert(inspectionReports).values(report);
  return Number(result[0].insertId);
}

export async function listInspectionReports(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(inspectionReports).orderBy(desc(inspectionReports.createdAt)).limit(limit);
}

export async function listInspectionClients() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(inspectionClients).orderBy(inspectionClients.clientName);
}

export async function saveInspectionClient(input: { clientName: string; clientEmail: string; siteName: string; siteAddress: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(inspectionClients).values(input).onDuplicateKeyUpdate({ set: { clientEmail: input.clientEmail, siteName: input.siteName, siteAddress: input.siteAddress, updatedAt: new Date() } });
}

export async function getStaffAccount(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(staffAccounts).where(eq(staffAccounts.email, email)).limit(1);
  return result[0];
}

export async function createStaffAccount(email: string, passwordHash: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(staffAccounts).values({ email, passwordHash, verified: true }).onDuplicateKeyUpdate({ set: { passwordHash, verified: true, updatedAt: new Date() } });
  return getStaffAccount(email);
}

export async function createStaffVerificationCode(input: { email: string; codeHash: string; passwordHash?: string | null; purpose: "setup" | "login"; expiresAt: Date }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(staffVerificationCodes).values(input);
}

export async function getActiveStaffVerificationCode(email: string, purpose: "setup" | "login") {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(staffVerificationCodes).where(and(eq(staffVerificationCodes.email, email), eq(staffVerificationCodes.purpose, purpose), gt(staffVerificationCodes.expiresAt, new Date()))).orderBy(desc(staffVerificationCodes.createdAt)).limit(1);
  return result[0];
}

export async function createStaffSession(email: string, tokenHash: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(staffSessions).values({ email, tokenHash, expiresAt });
}

export async function getStaffSession(tokenHash: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(staffSessions).where(and(eq(staffSessions.tokenHash, tokenHash), gt(staffSessions.expiresAt, new Date()))).limit(1);
  return result[0];
}
