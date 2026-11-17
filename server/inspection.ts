import PDFDocument from "pdfkit";

type ChecklistItem = {
  area: string;
  status: "pass" | "attention" | "not_applicable";
  comment?: string;
};

type InspectionPdfInput = {
  clientName: string;
  clientEmail: string;
  siteName: string;
  siteAddress: string;
  inspectionDate: string;
  serviceType: string;
  overallRating: string;
  checklist: ChecklistItem[];
  notes?: string;
  correctiveActions?: string;
  photos: Array<{ name: string; dataUrl: string }>;
  staffName: string;
};

function clean(value: string | undefined) {
  return value?.trim() || "—";
}

function addSectionTitle(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown(0.7).fontSize(12).fillColor("#174a8b").font("Helvetica-Bold").text(title);
  doc.moveDown(0.2).strokeColor("#d8e5f4").lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.4).fillColor("#1c2633").font("Helvetica");
}

function addLabelValue(doc: PDFKit.PDFDocument, label: string, value: string) {
  doc.fontSize(9).font("Helvetica-Bold").fillColor("#174a8b").text(`${label}: `, { continued: true });
  doc.font("Helvetica").fillColor("#1c2633").text(clean(value));
}

function dataUrlToBuffer(dataUrl: string) {
  const match = dataUrl.match(/^data:image\/(png|jpe?g);base64,(.+)$/i);
  if (!match) return null;
  return { format: match[1].toLowerCase() === "png" ? "png" : "jpg", buffer: Buffer.from(match[2], "base64") };
}

export function createInspectionPdf(input: InspectionPdfInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50, info: { Title: `Cleaning Inspection — ${input.siteName}`, Author: "Nexus Facility Group" } });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(0, 0, 595, 86).fill("#09254b");
    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(22).text("NEXUS FACILITY GROUP", 50, 28);
    doc.fillColor("#76d7ff").font("Helvetica").fontSize(9).text("CLEANING INSPECTION REPORT", 51, 57);
    doc.fillColor("#1c2633").font("Helvetica").fontSize(10).text(`Report date: ${new Date().toLocaleDateString("en-AU")}`, 400, 35, { width: 145, align: "right" });

    doc.y = 110;
    addSectionTitle(doc, "Inspection details");
    addLabelValue(doc, "Client", input.clientName);
    addLabelValue(doc, "Client email", input.clientEmail);
    addLabelValue(doc, "Site", input.siteName);
    addLabelValue(doc, "Site address", input.siteAddress);
    addLabelValue(doc, "Inspection date", input.inspectionDate);
    addLabelValue(doc, "Service type", input.serviceType);
    addLabelValue(doc, "Overall result", input.overallRating);
    addLabelValue(doc, "Completed by", input.staffName);

    addSectionTitle(doc, "Inspection checklist");
    input.checklist.forEach((item, index) => {
      const statusLabel = item.status === "pass" ? "PASS" : item.status === "attention" ? "ATTENTION" : "N/A";
      const statusColor = item.status === "pass" ? "#16734b" : item.status === "attention" ? "#b05a00" : "#637083";
      doc.fontSize(9).font("Helvetica-Bold").fillColor("#1c2633").text(`${index + 1}. ${item.area}`, { continued: true });
      doc.fillColor(statusColor).text(`  ${statusLabel}`);
      if (item.comment) doc.font("Helvetica").fillColor("#4b5968").fontSize(8.5).text(`   ${item.comment}`);
      doc.moveDown(0.2);
    });

    addSectionTitle(doc, "Notes and corrective actions");
    doc.fontSize(9).font("Helvetica-Bold").fillColor("#174a8b").text("General notes");
    doc.font("Helvetica").fillColor("#1c2633").text(clean(input.notes), { width: 495 });
    doc.moveDown(0.35).font("Helvetica-Bold").fillColor("#174a8b").text("Corrective actions");
    doc.font("Helvetica").fillColor("#1c2633").text(clean(input.correctiveActions), { width: 495 });

    if (input.photos.length > 0) {
      addSectionTitle(doc, "Inspection photos");
      input.photos.forEach((photo, index) => {
        const parsed = dataUrlToBuffer(photo.dataUrl);
        if (!parsed) return;
        if (doc.y > 650) doc.addPage();
        doc.font("Helvetica-Bold").fontSize(8.5).fillColor("#174a8b").text(`${index + 1}. ${photo.name || "Inspection photo"}`);
        doc.image(parsed.buffer, { fit: [235, 145] as [number, number] });
        doc.moveDown(0.4);
      });
    }

    doc.moveDown(1);
    doc.fontSize(8).fillColor("#637083").text("Prepared by Nexus Facility Group · admin.hr@nexusfacility.au · 0477 376 440 · 0404 934 544", { align: "center" });
    doc.end();
  });
}
