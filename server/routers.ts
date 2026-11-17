import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, staffProcedure } from "./_core/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";
import { notifyOwner } from "./_core/notification";
import { insertInspectionReport, listInspectionReports } from "./db";
import { createInspectionPdf } from "./inspection";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

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

async function sendInspectionEmail(input: { clientName: string; clientEmail: string; siteName: string; inspectionDate: string; pdf: Buffer; reportId: number | undefined }) {
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
    to: [input.clientEmail, "admin.hr@nexusfacility.au"],
    replyTo: smtpUser,
    subject,
    text: `Hello ${input.clientName},\n\nPlease find attached the Nexus Facility Group cleaning inspection report for ${input.siteName} dated ${input.inspectionDate}.\n\nKind regards,\nNexus Facility Group\n0477 376 440 · 0404 934 544`,
    html: `<p>Hello ${input.clientName},</p><p>Please find attached the Nexus Facility Group cleaning inspection report for <strong>${input.siteName}</strong> dated <strong>${input.inspectionDate}</strong>.</p><p>Kind regards,<br>Nexus Facility Group<br>0477 376 440 · 0404 934 544</p>`,
    attachments: [{ filename: `nexus-cleaning-inspection-${input.reportId || "report"}.pdf`, content: input.pdf, contentType: "application/pdf" }],
  });
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
    submit: staffProcedure
      .input(
        z.object({
          clientName: z.string().min(1).max(255),
          clientEmail: z.string().email(),
          siteName: z.string().min(1).max(255),
          siteAddress: z.string().min(1).max(1000),
          inspectionDate: z.string().min(1).max(32),
          serviceType: z.string().min(1).max(120),
          overallRating: z.string().min(1).max(32),
          checklist: z.array(z.object({ area: z.string().min(1).max(255), status: z.enum(["pass", "attention", "not_applicable"]), comment: z.string().max(500).optional() })).min(1).max(30),
          notes: z.string().max(4000).optional(),
          correctiveActions: z.string().max(4000).optional(),
          photos: z.array(z.object({ name: z.string().max(120), dataUrl: z.string().max(1_500_000) })).max(6),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const staffName = ctx.user.name || ctx.user.email || "Nexus Facility Staff";
        const pdf = await createInspectionPdf({ ...input, staffName });
        const reportId = await insertInspectionReport({
          staffUserId: ctx.user.id,
          staffName,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          siteName: input.siteName,
          siteAddress: input.siteAddress,
          inspectionDate: input.inspectionDate,
          serviceType: input.serviceType,
          overallRating: input.overallRating,
          checklistJson: JSON.stringify(input.checklist),
          notes: input.notes || null,
          correctiveActions: input.correctiveActions || null,
          photoNames: JSON.stringify(input.photos.map((photo) => photo.name)),
          pdfUrl: null,
        });

        let pdfUrl: string | null = null;
        try {
          const stored = await storagePut(`inspection-reports/${Date.now()}-${nanoid(8)}.pdf`, pdf, "application/pdf");
          pdfUrl = stored.url;
        } catch (error) {
          console.warn("[Inspection] Could not archive PDF in storage:", error);
        }

        await sendInspectionEmail({ ...input, pdf, reportId });
        return { success: true, reportId, pdfUrl };
      }),
  }),
});

export type AppRouter = typeof appRouter;
