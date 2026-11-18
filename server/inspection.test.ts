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
      overallRating: "100/100 — PASS",
      overallScore: 100,
      overallResult: "PASS",
      checklist: [{ area: "Toilets & washrooms", items: [{ label: "Toilet bowl and seat are clean", score: 5, comment: "Clean and presentable", photos: [{ name: "floor.png", dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" }] }] }],
      notes: "No additional notes.",
      correctiveActions: "None required.",
      photos: [{ name: "floor.png", dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=" }],
      staffName: "Nexus Staff",
    });

    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdf.length).toBeGreaterThan(1000);
    expect(pdf.includes(Buffer.from([0xff, 0xd8, 0xff]))).toBe(true);
  });

  it("returns a completed ad hoc work report with before and after evidence sections", async () => {
    const pdf = await createInspectionPdf({
      clientName: "Example Client",
      clientEmail: "client@example.com",
      siteName: "Example Site",
      siteAddress: "1 Example Street, Melbourne VIC",
      inspectionDate: "2026-11-18",
      serviceType: "Ad hoc works",
      overallRating: "AD HOC SERVICE REPORT — COMPLETED",
      overallScore: 100,
      overallResult: "PASS",
      checklist: [],
      notes: "Completed requested work.",
      correctiveActions: "None required.",
      photos: [],
      staffName: "Nexus Staff",
      reportMode: "ad_hoc",
      adHoc: { workDescription: "Pressure washed the entry path.", beforePhotos: [], afterPhotos: [] },
    });

    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdf.length).toBeGreaterThan(1000);
  });
});
