import PDFDocument from "pdfkit";
import { NEXUS_LOGO_JPEG } from "./logoAsset";

type ChecklistItem = { label: string; score: number; comment?: string; photos: Array<{ name: string; dataUrl: string }> };
type ChecklistSection = { area: string; items: ChecklistItem[] };
type AdHocPhoto = { name: string; dataUrl: string };
type InspectionPdfInput = {
  clientName: string;
  clientEmail: string;
  siteName: string;
  siteAddress: string;
  inspectionDate: string;
  serviceType: string;
  overallRating: string;
  overallScore: number;
  overallResult: "PASS" | "FAIL";
  checklist: ChecklistSection[];
  notes?: string;
  correctiveActions?: string;
  photos: Array<{ name: string; dataUrl: string }>;
  staffName: string;
  reportMode?: "inspection" | "ad_hoc";
  adHoc?: { workDescription: string; beforePhotos: AdHocPhoto[]; afterPhotos: AdHocPhoto[] };
};

const LOGO_URL = "https://www.nexusfacility.au/nexus-logo.jpg";
const NAVY = "#09254b";
const BLUE = "#1765a8";
const PALE = "#eef5fb";
const GREEN = "#138a4b";
const RED = "#c62828";

function clean(value: string | undefined) { return value?.trim() || "—"; }
function dataUrlToBuffer(dataUrl: string) { const match = dataUrl.match(/^data:image\/(png|jpe?g);base64,(.+)$/i); return match ? Buffer.from(match[2], "base64") : null; }
function sectionScore(section: ChecklistSection) { const max = section.items.length * 5; const points = section.items.reduce((sum, item) => sum + item.score, 0); return max ? Math.round((points / max) * 100) : 0; }
async function loadLogo() {
  if (NEXUS_LOGO_JPEG.length) return NEXUS_LOGO_JPEG;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 900);
  try {
    const response = await fetch(LOGO_URL, { signal: controller.signal });
    if (!response.ok) return null;
    return Buffer.from(await response.arrayBuffer());
  } catch { return null; }
  finally { clearTimeout(timeout); }
}
function resultColour(result: "PASS" | "FAIL") { return result === "PASS" ? GREEN : RED; }

function addFooter(doc: PDFKit.PDFDocument) {
  const y = 806;
  doc.save().strokeColor("#d7e4ef").lineWidth(0.6).moveTo(45, y - 12).lineTo(550, y - 12).stroke();
  doc.font("Helvetica").fontSize(7.5).fillColor("#617286").text("Nexus Facility Group · admin.hr@nexusfacility.au · 0477 376 440 · 0404 934 544", 45, y, { width: 505, align: "center" });
  doc.restore();
}

function ensureRoom(doc: PDFKit.PDFDocument, required = 90) { if (doc.y > 760 - required) { addFooter(doc); doc.addPage(); doc.y = 48; } }

export async function createInspectionPdf(input: InspectionPdfInput): Promise<Buffer> {
  const logo = await loadLogo();
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 45, info: { Title: `Cleaning Inspection — ${input.siteName}`, Author: "Nexus Facility Group" } });
    const chunks: Buffer[] = [];
    doc.on("data", chunk => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Premium branded header.
    doc.rect(0, 0, 595, 104).fill(NAVY);
    doc.rect(45, 16, 205, 72).fill("#ffffff");
    if (logo) doc.image(logo, 55, 23, { fit: [185, 58] as [number, number] });
    else doc.font("Helvetica-Bold").fontSize(17).fillColor(NAVY).text("NEXUS FACILITY GROUP", 58, 42);
    const isAdHoc = input.reportMode === "ad_hoc";
    doc.font("Helvetica-Bold").fontSize(17).fillColor("#ffffff").text(isAdHoc ? "AD HOC WORK REPORT" : "CLEANING INSPECTION REPORT", 275, 33, { width: 275, align: "right" });
    doc.font("Helvetica").fontSize(9).fillColor("#b9ddf6").text(isAdHoc ? "Completed works · before and after evidence" : "Quality assurance · evidence-based site review", 275, 58, { width: 275, align: "right" });
    doc.font("Helvetica").fontSize(8.5).fillColor("#ffffff").text(`Issued ${new Date().toLocaleDateString("en-AU")}`, 275, 78, { width: 275, align: "right" });
    doc.y = 124;

    if (isAdHoc) {
      const adHoc = input.adHoc || { workDescription: input.notes || "", beforePhotos: [], afterPhotos: [] };
      doc.roundedRect(45, doc.y, 505, 72, 5).fill(PALE).strokeColor("#d5e5f2").stroke();
      doc.font("Helvetica-Bold").fontSize(10).fillColor(BLUE).text("WORK COMPLETION REPORT", 62, doc.y + 14);
      doc.font("Helvetica-Bold").fontSize(19).fillColor(NAVY).text("AD HOC WORKS COMPLETED", 62, doc.y + 34);
      doc.y += 94;
      doc.font("Helvetica-Bold").fontSize(14).fillColor(NAVY).text("Work details");
      doc.moveDown(0.35);
      const adHocDetails = [["Client", input.clientName, "Client email", input.clientEmail], ["Site", input.siteName, "Work date", input.inspectionDate], ["Address", input.siteAddress, "Completed by", input.staffName]];
      adHocDetails.forEach(row => {
        const y = doc.y;
        doc.rect(45, y, 105, 22).fill("#e5f0f8"); doc.rect(150, y, 147, 22).fill("#ffffff"); doc.rect(297, y, 105, 22).fill("#e5f0f8"); doc.rect(402, y, 148, 22).fill("#ffffff");
        doc.font("Helvetica-Bold").fontSize(8.5).fillColor(BLUE).text(row[0], 53, y + 7, { width: 90 }); doc.font("Helvetica").fillColor("#1d2d3d").text(row[1], 158, y + 7, { width: 132, ellipsis: true });
        doc.font("Helvetica-Bold").fillColor(BLUE).text(row[2], 305, y + 7, { width: 90 }); doc.font("Helvetica").fillColor("#1d2d3d").text(row[3], 410, y + 7, { width: 132, ellipsis: true }); doc.y += 22;
      });
      doc.moveDown(1);
      doc.font("Helvetica-Bold").fontSize(14).fillColor(NAVY).text("Description of work completed"); doc.moveDown(0.35);
      doc.roundedRect(45, doc.y, 505, 78, 4).fill("#f5f8fb").strokeColor("#dce7f0").stroke();
      doc.font("Helvetica").fontSize(10).fillColor("#243647").text(clean(adHoc.workDescription), 60, doc.y + 17, { width: 475, height: 48 }); doc.y += 102;
      const drawPhotoGroup = (title: string, photos: AdHocPhoto[]) => {
        ensureRoom(doc, 150);
        doc.font("Helvetica-Bold").fontSize(15).fillColor(NAVY).text(title, 45, doc.y, { width: 505, align: "center" });
        doc.moveDown(0.55);
        if (!photos.length) { doc.font("Helvetica").fontSize(9).fillColor("#617286").text("No photos uploaded", 45, doc.y, { width: 505, align: "center" }); doc.y += 34; return; }
        const selected = photos.slice(0, 10);
        for (let index = 0; index < selected.length; index += 1) {
          if (index % 3 === 0) { ensureRoom(doc, 130); }
          const photo = selected[index]; const buffer = dataUrlToBuffer(photo.dataUrl); const x = 45 + (index % 3) * 170; const y = doc.y;
          if (buffer) { doc.image(buffer, x, y, { fit: [150, 88] as [number, number] }); doc.font("Helvetica").fontSize(7).fillColor("#617286").text(photo.name, x, y + 92, { width: 150, ellipsis: true }); }
          if (index % 3 === 2 || index === selected.length - 1) doc.y = y + 118;
        }
      };
      drawPhotoGroup("Before work", adHoc.beforePhotos); doc.moveDown(0.5); drawPhotoGroup("After work", adHoc.afterPhotos);
      ensureRoom(doc, 100); const resultY = doc.y; doc.roundedRect(45, resultY, 505, 70, 5).fill(BLUE); doc.font("Helvetica-Bold").fontSize(11).fillColor("#ffffff").text("AD HOC WORK REPORT STATUS", 62, resultY + 14); doc.font("Helvetica-Bold").fontSize(22).fillColor("#ffffff").text("COMPLETED", 62, resultY + 35); doc.y = resultY + 92;
      addFooter(doc); doc.end(); return;
    }

    // Summary banner.
    const colour = resultColour(input.overallResult);
    doc.roundedRect(45, doc.y, 505, 82, 5).fill(PALE).strokeColor("#d5e5f2").stroke();
    doc.font("Helvetica-Bold").fontSize(10).fillColor(BLUE).text("INSPECTION OUTCOME", 62, doc.y + 15);
    doc.font("Helvetica-Bold").fontSize(30).fillColor(NAVY).text(`${input.overallScore}/100`, 62, doc.y + 32);
    doc.font("Helvetica").fontSize(9).fillColor("#536477").text("Overall quality score", 160, doc.y + 51);
    doc.roundedRect(409, doc.y + 20, 116, 40, 5).fill(colour);
    doc.font("Helvetica-Bold").fontSize(18).fillColor("#ffffff").text(input.overallResult, 409, doc.y + 31, { width: 116, align: "center" });
    doc.y += 103;

    doc.font("Helvetica-Bold").fontSize(14).fillColor(NAVY).text("Inspection details");
    doc.moveDown(0.35);
    const details = [["Client", input.clientName, "Client email", input.clientEmail], ["Site", input.siteName, "Inspection date", input.inspectionDate], ["Address", input.siteAddress, "Service type", input.serviceType], ["Completed by", input.staffName, "Report result", `${input.overallResult} · ${input.overallScore}/100`]];
    details.forEach(row => {
      const y = doc.y;
      doc.rect(45, y, 105, 22).fill("#e5f0f8"); doc.rect(150, y, 147, 22).fill("#ffffff"); doc.rect(297, y, 105, 22).fill("#e5f0f8"); doc.rect(402, y, 148, 22).fill("#ffffff");
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(BLUE).text(row[0], 53, y + 7, { width: 90 });
      doc.font("Helvetica").fillColor("#1d2d3d").text(row[1], 158, y + 7, { width: 132, ellipsis: true });
      doc.font("Helvetica-Bold").fillColor(BLUE).text(row[2], 305, y + 7, { width: 90 });
      doc.font("Helvetica").fillColor(row[2] === "Report result" ? colour : "#1d2d3d").text(row[3], 410, y + 7, { width: 132, ellipsis: true });
      doc.y += 22;
    });
    doc.moveDown(1);

    doc.font("Helvetica-Bold").fontSize(14).fillColor(NAVY).text("Category results");
    doc.moveDown(0.35);
    input.checklist.forEach(section => {
      const score = sectionScore(section); const result = score >= 70 ? "PASS" as const : "FAIL" as const; const c = resultColour(result);
      ensureRoom(doc, 70);
      const y = doc.y;
      doc.roundedRect(45, y, 505, 30, 4).fill(score >= 70 ? "#e9f7ef" : "#fff0f0");
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(NAVY).text(section.area, 56, y + 9, { width: 300 });
      doc.font("Helvetica-Bold").fontSize(10).fillColor(c).text(`${score}/100 · ${result}`, 410, y + 9, { width: 125, align: "right" });
      doc.y += 38;
      section.items.forEach((item, index) => {
        ensureRoom(doc, item.photos.length ? 105 : 35);
        const itemY = doc.y;
        doc.font("Helvetica-Bold").fontSize(8.8).fillColor("#243647").text(`${index + 1}. ${item.label}`, 59, itemY, { width: 350 });
        doc.font("Helvetica-Bold").fontSize(8.8).fillColor(item.score >= 4 ? GREEN : item.score >= 3 ? "#ae6500" : RED).text(`${item.score}/5`, 470, itemY, { width: 60, align: "right" });
        doc.y = itemY + 13;
        if (item.comment) { doc.font("Helvetica").fontSize(7.8).fillColor("#617286").text(item.comment, 72, doc.y, { width: 390 }); doc.y += 12; }
        if (item.photos.length) {
          doc.font("Helvetica").fontSize(7.2).fillColor("#718295").text(`Evidence photos: ${item.photos.map(photo => photo.name).join(", ")}`, 72, doc.y);
          doc.y += 10;
          item.photos.forEach(photo => { const buffer = dataUrlToBuffer(photo.dataUrl); if (buffer) { doc.image(buffer, 72, doc.y, { fit: [92, 62] as [number, number] }); doc.x = 170; doc.y += 66; } });
        }
        doc.moveDown(0.25);
      });
      doc.moveDown(0.5);
    });

    ensureRoom(doc, 115);
    doc.font("Helvetica-Bold").fontSize(14).fillColor(NAVY).text("Notes and corrective actions");
    doc.moveDown(0.35);
    doc.roundedRect(45, doc.y, 245, 72, 4).fill("#f5f8fb").strokeColor("#dce7f0").stroke();
    doc.font("Helvetica-Bold").fontSize(9).fillColor(BLUE).text("General notes", 57, doc.y + 10);
    doc.font("Helvetica").fontSize(8.5).fillColor("#243647").text(clean(input.notes), 57, doc.y + 27, { width: 220, height: 38 });
    doc.roundedRect(305, doc.y, 245, 72, 4).fill("#f5f8fb").strokeColor("#dce7f0").stroke();
    doc.font("Helvetica-Bold").fontSize(9).fillColor(BLUE).text("Corrective actions", 317, doc.y + 10);
    doc.font("Helvetica").fontSize(8.5).fillColor("#243647").text(clean(input.correctiveActions), 317, doc.y + 27, { width: 220, height: 38 });
    doc.y += 95;
    ensureRoom(doc, 105);
    const finalY = doc.y;
    doc.roundedRect(45, finalY, 505, 78, 5).fill(resultColour(input.overallResult));
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#ffffff").text("FINAL INSPECTION RESULT", 62, finalY + 13, { width: 210 });
    doc.font("Helvetica-Bold").fontSize(22).fillColor("#ffffff").text(input.overallResult, 62, finalY + 34, { width: 180 });
    doc.font("Helvetica-Bold").fontSize(20).fillColor("#ffffff").text(`${input.overallScore}/100`, 330, finalY + 32, { width: 195, align: "right" });
    doc.y = finalY + 98;
    addFooter(doc);
    doc.end();
  });
}
