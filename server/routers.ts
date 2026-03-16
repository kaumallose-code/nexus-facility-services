import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";
import { notifyOwner } from "./_core/notification";

// ─── Email helper ──────────────────────────────────────────────────────────────
async function sendEnquiryEmail(data: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  suburb?: string;
  propertySize?: string;
  source: "contact_form" | "quotebot";
}) {
  const RECIPIENT = "admin.hr@nexusfacility.au";

  // Build a plain-text and HTML body
  const subject =
    data.source === "quotebot"
      ? `New Quote Request from ${data.name} — Nexus Facility Services`
      : `New Enquiry from ${data.name} — Nexus Facility Services`;

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Service", data.service || "—"],
    ["Suburb", data.suburb || "—"],
    ["Property Size", data.propertySize || "—"],
    ["Message", data.message || "—"],
    ["Source", data.source === "quotebot" ? "QuoteBot" : "Contact Form"],
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
        <h1 style="color:white;margin:0;font-size:22px">Nexus Facility Services</h1>
        <p style="color:#a8c8ff;margin:4px 0 0">New ${data.source === "quotebot" ? "Quote Request" : "Enquiry"}</p>
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
        © ${new Date().getFullYear()} Nexus Facility Services · admin.hr@nexusfacility.au · 0404 934 544
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
          email: z.string().optional(),
          service: z.string().optional(),
          message: z.string().optional(),
          suburb: z.string().optional(),
          propertySize: z.string().optional(),
          source: z.enum(["contact_form", "quotebot"]).default("contact_form"),
        })
      )
      .mutation(async ({ input }) => {
        return await sendEnquiryEmail(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
