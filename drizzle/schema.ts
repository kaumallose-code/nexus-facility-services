import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "staff", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const inspectionReports = mysqlTable("inspection_reports", {
  id: int("id").autoincrement().primaryKey(),
  staffUserId: int("staffUserId").notNull(),
  staffName: varchar("staffName", { length: 255 }).notNull(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  siteName: varchar("siteName", { length: 255 }).notNull(),
  siteAddress: text("siteAddress").notNull(),
  inspectionDate: varchar("inspectionDate", { length: 32 }).notNull(),
  serviceType: varchar("serviceType", { length: 120 }).notNull(),
  overallRating: varchar("overallRating", { length: 32 }).notNull(),
  checklistJson: text("checklistJson").notNull(),
  notes: text("notes"),
  correctiveActions: text("correctiveActions"),
  photoNames: text("photoNames"),
  pdfUrl: text("pdfUrl"),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InspectionReport = typeof inspectionReports.$inferSelect;
export type InsertInspectionReport = typeof inspectionReports.$inferInsert;
