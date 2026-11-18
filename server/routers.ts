import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, staffProcedure } from "./_core/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";
import { notifyOwner } from "./_core/notification";
import { createStaffAccount, createStaffSession, createStaffVerificationCode, getActiveStaffVerificationCode, getStaffAccount, insertInspectionReport, listInspectionClients, listInspectionReports, saveInspectionClient } from "./db";
import { createInspectionPdf } from "./inspection";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import { hashPassword, hashValue, isAllowedStaffEmail, makeCode, makeSessionToken, normalizeStaffEmail, STAFF_SESSION_COOKIE, verifyPassword } from "./staffAuth";

// ─── Email helper ──────────────────────────────────────────────────────────────
async function sendEnquiryEmail(data: {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  representativeName?: string;
  cleaningRequirements?: string;
  cleaningType?: string;
  service?: string;
  message?: string;
  suburb?: string;
  propertySize?: string;
  source: "contact_form" | "quotebot" | "partner_form" | "commercial_form";
}) {
  const RECIPIENT = "admin.hr@nexusfacility.au";

  // Build a plain-text and HTML body
  const subject =
    data.source === "partner_form"
      ? `New Partnership Enquiry from ${data.company || data.name} — Nexus Facility Group`
      : data.source === "commercial_form"
        ? `New Commercial Cleaning Quote from ${data.name} — Nexus Facility Group`
        : data.source === "quotebot"
          ? `New Quote Request from ${data.name} — Nexus Facility Group`
          : `New Enquiry from ${data.name} — Nexus Facility Group`;

  const sourceLabel =
    data.source === "partner_form"
      ? "Partner With Us Form"
      : data.source === "commercial_form"
        ? "Commercial Cleaning Quote Form"
        : data.source === "quotebot"
          ? "QuoteBot"
          : "Contact Form";

  const rows = [
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Representative Name", data.representativeName || "—"],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Cleaning Type", data.cleaningType || data.service || "—"],
    ["Cleaning Requirements", data.cleaningRequirements || "—"],
    ["Suburb", data.suburb || "—"],
    ["Property Size", data.propertySize || "—"],
    ["Comments / Message", data.message || "—"],
    ["Source", sourceLabel],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#1e3a5f;background:#f0f6ff;border:1px solid #dce8f5;white-space:nowrap">${label}</td><td style="padding:6px 12px;border:1px solid #dce8f5">${value}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1a4fa0;padding:24px;text-align:center">
        <h1 style="color:white;margin:0;font-size:22px">Nexus Facility Group</h1>
        <p style="color:#a8c8ff;margin:4px 0 0">New ${sourceLabel}</p>
      </div>
      <div style="padding:24px;background:#ffffff;border:1px solid #dce8f5">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${htmlRows}
        </table>
        <div style="margin-top:24px;padding:16px;background:#f0f6ff;border-left:4px solid #1a4fa0">
          <p style="margin:0;font-size:13px;color:#555">
            Please respond to this enquiry as soon as possible. 
            If a phone number is provided, a callback is recommended.
          </p>
        </div>
      </div>
      <div style="padding:12px;background:#f8f9fa;text-align:center;font-size:12px;color:#888">
        © ${new Date().getFullYear()} Nexus Facility Group · admin.hr@nexusfacility.au · 0477 376 440 · 0404 934 544
      </div>
    </div>
  `;

  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");

  // Try Manus notification first (always works), then attempt SMTP
  try {
    await notifyOwner({
      title: subject,
      content: text,
    });
  } catch {
    // notification failure is non-fatal
  }

  // Attempt SMTP via Gmail relay or any configured SMTP
  // If SMTP_HOST is not set, we skip silently (notification above already delivered)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Nexus Facility Services Website" <${smtpUser}>`,
      to: RECIPIENT,
      replyTo: data.email || smtpUser,
      subject,
      text,
      html,
    });
  }

  return { success: true };
}

async function sendInspectionEmail(input: { clientName: string; recipientEmails: string[]; siteName: string; inspectionDate: string; pdf: Buffer; reportId: number | undefined; overallResult: "PASS" | "FAIL"; overallScore: number }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("Inspection email delivery is not configured yet. Please contact the site administrator.");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: smtpUser, pass: smtpPass },
  });
  const subject = `Cleaning Inspection Report — ${input.siteName} — ${input.inspectionDate}`;
  await transporter.sendMail({
    from: `"Nexus Facility Group" <${smtpUser}>`,
    to: [...input.recipientEmails, "admin.hr@nexusfacility.au"],
    replyTo: smtpUser,
    subject,
    text: `Hello ${input.clientName},\n\nPlease find attached the Nexus Facility Group cleaning inspection report for ${input.siteName} dated ${input.inspectionDate}.\n\nOverall result: ${input.overallResult} (${input.overallScore}/100)\n\nKind regards,\nNexus Facility Group\n0477 376 440 · 0404 934 544`,
    html: `<p>Hello ${input.clientName},</p><p>Please find attached the Nexus Facility Group cleaning inspection report for <strong>${input.siteName}</strong> dated <strong>${input.inspectionDate}</strong>.</p><p><strong>Overall result: ${input.overallResult} (${input.overallScore}/100)</strong></p><p>Kind regards,<br>Nexus Facility Group<br>0477 376 440 · 0404 934 544</p>`,
    attachments: [{ filename: `nexus-cleaning-inspection-${input.reportId || "report"}.pdf`, content: input.pdf, contentType: "application/pdf" }],
  });
}

async function sendStaffCodeEmail(email: string, code: string, purpose: "setup" | "login") {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpHost || !smtpUser || !smtpPass) throw new Error("Staff email verification is not configured yet.");
  const transporter = nodemailer.createTransport({ host: smtpHost, port: parseInt(process.env.SMTP_PORT || "587"), secure: process.env.SMTP_SECURE === "true", auth: { user: smtpUser, pass: smtpPass } });
  const subject = purpose === "setup" ? "Create your Nexus Facility Group staff portal password" : "Your Nexus Facility Group staff portal verification code";
  await transporter.sendMail({
    from: `"Nexus Facility Group" <${smtpUser}>`,
    to: email,
    subject,
    text: `Your Nexus Facility Group verification code is ${code}. It expires in 10 minutes. If you did not request this, you can ignore this email.`,
    html: `<p>Your Nexus Facility Group verification code is:</p><p style="font-size:28px;font-weight:700;letter-spacing:8px">${code}</p><p>This code expires in 10 minutes. If you did not request this, you can ignore this email.</p>`,
  });
}

function setStaffSessionCookie(ctx: { req: Parameters<typeof getSessionCookieOptions>[0]; res: { cookie: (name: string, value: string, options: Record<string, unknown>) => void } }) {
  const token = makeSessionToken();
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
  ctx.res.cookie(STAFF_SESSION_COOKIE, token, { ...getSessionCookieOptions(ctx.req), sameSite: "lax", maxAge: 8 * 60 * 60 * 1000 });
  return { token, expiresAt };
}

// ─── App Router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  staffAuth: router({
    status: publicProcedure.input(z.object({ email: z.string().email() })).query(async ({ input }) => {
      const email = normalizeStaffEmail(input.email);
      return { allowed: isAllowedStaffEmail(email), hasAccount: Boolean(await getStaffAccount(email)) };
    }),
    requestSetup: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(8).max(128) })).mutation(async ({ input }) => {
      const email = normalizeStaffEmail(input.email);
      if (!isAllowedStaffEmail(email)) throw new Error("This email address is not authorised for the Nexus staff portal.");
      if (await getStaffAccount(email)) throw new Error("An account already exists. Use the staff login option instead.");
      const code = makeCode();
      await createStaffVerificationCode({ email, codeHash: hashValue(code), passwordHash: await hashPassword(input.password), purpose: "setup", expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
      await sendStaffCodeEmail(email, code, "setup");
      return { success: true };
    }),
    verifySetup: publicProcedure.input(z.object({ email: z.string().email(), code: z.string().regex(/^\d{6}$/) })).mutation(async ({ input, ctx }) => {
      const email = normalizeStaffEmail(input.email);
      const record = await getActiveStaffVerificationCode(email, "setup");
      if (!record || record.codeHash !== hashValue(input.code) || !record.passwordHash) throw new Error("The verification code is invalid or expired.");
      await createStaffAccount(email, record.passwordHash);
      const session = setStaffSessionCookie(ctx);
      await createStaffSession(email, hashValue(session.token), session.expiresAt);
      return { success: true };
    }),
    requestLogin: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(1).max(128) })).mutation(async ({ input }) => {
      const email = normalizeStaffEmail(input.email);
      if (!isAllowedStaffEmail(email)) throw new Error("This email address is not authorised for the Nexus staff portal.");
      const account = await getStaffAccount(email);
      if (!account) throw new Error("No staff account exists yet. Use Create password first.");
      if (!(await verifyPassword(input.password, account.passwordHash))) throw new Error("The email or password is incorrect.");
      const code = makeCode();
      await createStaffVerificationCode({ email, codeHash: hashValue(code), purpose: "login", expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
      await sendStaffCodeEmail(email, code, "login");
      return { success: true };
    }),
    verifyLogin: publicProcedure.input(z.object({ email: z.string().email(), code: z.string().regex(/^\d{6}$/) })).mutation(async ({ input, ctx }) => {
      const email = normalizeStaffEmail(input.email);
      const record = await getActiveStaffVerificationCode(email, "login");
      if (!record || record.codeHash !== hashValue(input.code)) throw new Error("The verification code is invalid or expired.");
      const session = setStaffSessionCookie(ctx);
      await createStaffSession(email, hashValue(session.token), session.expiresAt);
      return { success: true };
    }),
    me: publicProcedure.query(({ ctx }) => ctx.staff ?? null),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(STAFF_SESSION_COOKIE, { ...getSessionCookieOptions(ctx.req), sameSite: "lax", maxAge: 0 });
      return { success: true };
    }),
  }),

  // ── Enquiry / Quote submission ────────────────────────────────────────────
  enquiry: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          phone: z.string().min(1),
          email: z.string().email().optional().or(z.literal("")),
          company: z.string().optional(),
          representativeName: z.string().optional(),
          cleaningRequirements: z.string().optional(),
          cleaningType: z.string().optional(),
          service: z.string().optional(),
          message: z.string().optional(),
          suburb: z.string().optional(),
          propertySize: z.string().optional(),
          source: z.enum(["contact_form", "quotebot", "partner_form", "commercial_form"]).default("contact_form"),
        })
      )
      .mutation(async ({ input }) => {
        return await sendEnquiryEmail(input);
      }),
  }),

  staffInspections: router({
    recent: staffProcedure.query(async () => listInspectionReports()),
    clients: staffProcedure.query(async () => listInspectionClients()),
    submit: staffProcedure
      .input(
        z.object({
          clientName: z.string().min(1).max(255),
          clientEmail: z.string().email(),
          recipientEmails: z.array(z.string().email()).min(1).max(10).optional(),
          siteName: z.string().min(1).max(255),
          siteAddress: z.string().min(1).max(1000),
          inspectionDate: z.string().min(1).max(32),
          serviceType: z.string().min(1).max(120),
          overallRating: z.string().max(32).optional(),
          checklist: z.array(z.object({ area: z.string().min(1).max(255), items: z.array(z.object({ label: z.string().min(1).max(255), score: z.number().int().min(1).max(5), comment: z.string().max(500).optional(), photos: z.array(z.object({ name: z.string().max(120), dataUrl: z.string().max(1_500_000) })).max(2) })).min(1).max(30) })).min(1).max(20),
          notes: z.string().max(4000).optional(),
          correctiveActions: z.string().max(4000).optional(),
          photos: z.array(z.object({ name: z.string().max(120), dataUrl: z.string().max(1_500_000) })).max(6),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const staffName = ctx.staff?.email || ctx.user?.name || ctx.user?.email || "Nexus Facility Staff";
        const totalItems = input.checklist.reduce((sum, section) => sum + section.items.length, 0);
        const totalPoints = input.checklist.reduce((sum, section) => sum + section.items.reduce((sectionSum, item) => sectionSum + item.score, 0), 0);
        const overallScore = totalItems ? Math.round((totalPoints / (totalItems * 5)) * 100) : 0;
        const overallResult = overallScore >= 70 ? "PASS" as const : "FAIL" as const;
        const overallRating = `${overallScore}/100 — ${overallResult}`;
        const pdf = await createInspectionPdf({ ...input, overallRating, overallScore, overallResult, staffName });
        await saveInspectionClient({ clientName: input.clientName, clientEmail: input.clientEmail, siteName: input.siteName, siteAddress: input.siteAddress });
        const reportId = await insertInspectionReport({
          staffUserId: ctx.staff?.id || ctx.user?.id || 0,
          staffName,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          siteName: input.siteName,
          siteAddress: input.siteAddress,
          inspectionDate: input.inspectionDate,
          serviceType: input.serviceType,
          overallRating,
          checklistJson: JSON.stringify(input.checklist.map((section) => ({ area: section.area, items: section.items.map((item) => ({ label: item.label, score: item.score, comment: item.comment || "", photos: item.photos.map((photo) => photo.name) })) }))),
          notes: input.notes || null,
          correctiveActions: input.correctiveActions || null,
          photoNames: JSON.stringify([...input.photos.map((photo) => photo.name), ...input.checklist.flatMap((section) => section.items.flatMap((item) => item.photos.map((photo) => photo.name)))]),
          pdfUrl: null,
        });

        let pdfUrl: string | null = null;
        try {
          const stored = await storagePut(`inspection-reports/${Date.now()}-${nanoid(8)}.pdf`, pdf, "application/pdf");
          pdfUrl = stored.url;
        } catch (error) {
          console.warn("[Inspection] Could not archive PDF in storage:", error);
        }

        await sendInspectionEmail({ clientName: input.clientName, recipientEmails: input.recipientEmails?.length ? input.recipientEmails : [input.clientEmail], siteName: input.siteName, inspectionDate: input.inspectionDate, pdf, reportId, overallResult, overallScore });
        return { success: true, reportId, pdfUrl };
      }),
  }),
});

export type AppRouter = typeof appRouter;
