import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock nodemailer so no real SMTP calls are made in tests
vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: "test-id" }),
    }),
  },
}));

// Mock the notifyOwner helper
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("enquiry.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a valid contact form submission and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.enquiry.submit({
      name: "Test User",
      phone: "0400000000",
      email: "test@example.com",
      service: "Commercial Cleaning",
      message: "I need a quote for my office.",
      source: "contact_form",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a quotebot submission with suburb and property size", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.enquiry.submit({
      name: "Jane Doe",
      phone: "0411111111",
      service: "Domestic Cleaning",
      suburb: "Richmond",
      propertySize: "Medium (3–4 bedrooms / 100–200m²)",
      message: "Frequency: Weekly",
      source: "quotebot",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission when name is missing", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.enquiry.submit({
        name: "",
        phone: "0400000000",
        source: "contact_form",
      })
    ).rejects.toThrow();
  });

  it("rejects submission when phone is missing", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.enquiry.submit({
        name: "Test User",
        phone: "",
        source: "contact_form",
      })
    ).rejects.toThrow();
  });
});
