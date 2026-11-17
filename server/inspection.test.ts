import { describe, expect, it } from "vitest";
import { createInspectionPdf } from "./inspection";

describe("createInspectionPdf", () => {
  it("returns a readable PDF containing the inspection report", async () => {
    const pdf = await createInspectionPdf({
      clientName: "Example Client",
      clientEmail: "client@example.com",
      siteName: "Example Site",
      siteAddress: "1 Example Street, Melbourne VIC",
      inspectionDate: "2026-11-18",
      serviceType: "Commercial cleaning inspection",
      overallRating: "Satisfactory",
      checklist: [{ area: "Floors", status: "pass", comment: "Clean and presentable" }],
      notes: "No additional notes.",
      correctiveActions: "None required.",
      photos: [{ name: "floor.png", dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" }],
      staffName: "Nexus Staff",
    });

    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdf.length).toBeGreaterThan(1000);
  });
});
