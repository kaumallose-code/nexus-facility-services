import { useMemo, useState } from "react";
import { ClipboardCheck, FileText, LogIn, Mail, Send, ShieldCheck, Upload, X } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type Status = "pass" | "attention" | "not_applicable";
type ChecklistItem = { area: string; status: Status; comment: string };
type PhotoItem = { name: string; dataUrl: string };

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { area: "Entry, reception and presentation areas", status: "pass", comment: "" },
  { area: "Floors, carpets and mats", status: "pass", comment: "" },
  { area: "Bathrooms and hygiene points", status: "pass", comment: "" },
  { area: "Kitchen, breakroom and staff areas", status: "pass", comment: "" },
  { area: "High-touch points and shared surfaces", status: "pass", comment: "" },
  { area: "Bins, waste and consumables", status: "pass", comment: "" },
  { area: "Windows, glass and external presentation", status: "pass", comment: "" },
  { area: "Safety, access and site issues", status: "pass", comment: "" },
];

const inputClass = "w-full border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50";
const inputStyle = { background: "oklch(0.14 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.28)", color: "oklch(0.92 0.02 240)" };

function today() {
  return new Date().toISOString().slice(0, 10);
}

async function preparePhoto(file: File): Promise<PhotoItem> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
  const scale = Math.min(1, 1500 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return { name: file.name, dataUrl: canvas.toDataURL("image/jpeg", 0.78) };
}

export default function StaffInspectionPage() {
  const { user, loading } = useAuth();
  const canUsePortal = user?.role === "staff" || user?.role === "admin";
  const recentQuery = trpc.staffInspections.recent.useQuery(undefined, { enabled: canUsePortal });
  const submit = trpc.staffInspections.submit.useMutation({
    onSuccess: async () => {
      toast.success("Inspection report emailed to the client and saved.");
      await recentQuery.refetch();
      setForm((current) => ({ ...current, clientName: "", clientEmail: "", siteName: "", siteAddress: "", notes: "", correctiveActions: "" }));
      setPhotos([]);
    },
    onError: (error) => toast.error(error.message || "The inspection could not be sent."),
  });

  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    siteName: "",
    siteAddress: "",
    inspectionDate: today(),
    serviceType: "Commercial cleaning inspection",
    overallRating: "Satisfactory",
    notes: "",
    correctiveActions: "",
  });
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  const completion = useMemo(() => checklist.filter((item) => item.status === "pass").length, [checklist]);

  function updateForm(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateChecklist(index: number, key: keyof ChecklistItem, value: string) {
    setChecklist((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } as ChecklistItem : item));
  }

  async function addPhotos(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []).slice(0, 6 - photos.length);
    if (!files.length) return;
    try {
      const prepared = await Promise.all(files.map(preparePhoto));
      setPhotos((current) => [...current, ...prepared].slice(0, 6));
    } catch {
      toast.error("One or more photos could not be prepared.");
    } finally {
      event.target.value = "";
    }
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index));
  }

  function submitReport(event: React.FormEvent) {
    event.preventDefault();
    submit.mutate({ ...form, checklist, photos });
  }

  if (loading) {
    return <div className="min-h-screen bg-slate-950 px-6 py-24 text-center text-slate-300">Checking staff access…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-24 text-center text-white">
        <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-cyan-300" />
        <h1 className="mb-4 text-4xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nexus Staff Portal</h1>
        <p className="mx-auto mb-8 max-w-md text-slate-300">Sign in with your authorised Nexus Facility Group account to complete and send inspection reports.</p>
        <button onClick={() => { window.location.href = getLoginUrl(); }} className="inline-flex items-center gap-2 bg-cyan-400 px-6 py-3 font-bold uppercase text-slate-950"><LogIn className="h-4 w-4" /> Staff sign in</button>
      </div>
    );
  }

  if (!canUsePortal) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-24 text-center text-white">
        <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-amber-300" />
        <h1 className="mb-4 text-4xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Staff access required</h1>
        <p className="mx-auto max-w-lg text-slate-300">This account is signed in but is not assigned a Nexus staff role. Ask the site administrator to update your portal access.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-cyan-300/20 pb-7 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Nexus Facility Group · Internal</p><h1 className="text-5xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Cleaning inspection portal</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">Complete a site inspection, attach supporting photos and send a branded PDF report directly to the client.</p></div>
          <div className="border border-cyan-300/20 bg-slate-900 px-4 py-3 text-sm text-slate-300"><span className="block text-xs uppercase tracking-wider text-cyan-300">Signed in as</span>{user.name || user.email}</div>
        </div>

        <form onSubmit={submitReport} className="grid gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div className="space-y-8">
            <section className="border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><div className="mb-6 flex items-center gap-3"><ClipboardCheck className="h-6 w-6 text-cyan-300" /><div><h2 className="text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Report details</h2><p className="text-xs text-slate-400">Client and site information shown on the PDF.</p></div></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm text-slate-300">Client name<input required className={inputClass} style={inputStyle} value={form.clientName} onChange={(e) => updateForm("clientName", e.target.value)} /></label><label className="text-sm text-slate-300">Client email<input required type="email" className={inputClass} style={inputStyle} value={form.clientEmail} onChange={(e) => updateForm("clientEmail", e.target.value)} /></label><label className="text-sm text-slate-300">Site / facility name<input required className={inputClass} style={inputStyle} value={form.siteName} onChange={(e) => updateForm("siteName", e.target.value)} /></label><label className="text-sm text-slate-300">Inspection date<input required type="date" className={inputClass} style={inputStyle} value={form.inspectionDate} onChange={(e) => updateForm("inspectionDate", e.target.value)} /></label><label className="text-sm text-slate-300 sm:col-span-2">Site address<input required className={inputClass} style={inputStyle} value={form.siteAddress} onChange={(e) => updateForm("siteAddress", e.target.value)} /></label><label className="text-sm text-slate-300">Service type<select className={inputClass} style={inputStyle} value={form.serviceType} onChange={(e) => updateForm("serviceType", e.target.value)}><option>Commercial cleaning inspection</option><option>Childcare and education inspection</option><option>Medical and healthcare inspection</option><option>Industrial and warehouse inspection</option><option>Restoration / specialist cleaning inspection</option><option>Other site inspection</option></select></label><label className="text-sm text-slate-300">Overall result<select className={inputClass} style={inputStyle} value={form.overallRating} onChange={(e) => updateForm("overallRating", e.target.value)}><option>Satisfactory</option><option>Satisfactory with attention items</option><option>Requires corrective action</option></select></label></div></section>

            <section className="border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><div className="mb-6 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Inspection checklist</h2><p className="text-xs text-slate-400">{completion} of {checklist.length} areas marked pass.</p></div><FileText className="h-6 w-6 text-cyan-300" /></div><div className="space-y-3">{checklist.map((item, index) => <div key={item.area} className="grid gap-3 border border-slate-700/70 p-4 sm:grid-cols-[1fr_150px]"><div><p className="text-sm font-semibold text-slate-200">{item.area}</p><input aria-label={`${item.area} comment`} placeholder="Optional comment" className={`${inputClass} mt-2`} style={inputStyle} value={item.comment} onChange={(e) => updateChecklist(index, "comment", e.target.value)} /></div><select aria-label={`${item.area} status`} className={inputClass} style={inputStyle} value={item.status} onChange={(e) => updateChecklist(index, "status", e.target.value)}><option value="pass">Pass</option><option value="attention">Attention</option><option value="not_applicable">N/A</option></select></div>)}</div></section>
          </div>

          <div className="space-y-8"><section className="border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><h2 className="mb-2 text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Photos</h2><p className="mb-5 text-xs leading-relaxed text-slate-400">Add up to six site photos. Images are compressed for secure report delivery and embedded in the PDF.</p><label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-cyan-300/40 px-4 py-5 text-sm font-bold uppercase text-cyan-300 hover:bg-cyan-300/5"><Upload className="h-4 w-4" /> Add photos<input type="file" accept="image/jpeg,image/png" multiple className="sr-only" onChange={addPhotos} disabled={photos.length >= 6} /></label><div className="mt-4 grid grid-cols-2 gap-3">{photos.map((photo, index) => <div key={`${photo.name}-${index}`} className="relative overflow-hidden border border-slate-700"><img src={photo.dataUrl} alt={photo.name} className="aspect-square w-full object-cover" /><button type="button" aria-label={`Remove ${photo.name}`} onClick={() => removePhoto(index)} className="absolute right-1 top-1 rounded-full bg-slate-950/85 p-1 text-white"><X className="h-3 w-3" /></button><p className="truncate px-2 py-1 text-[10px] text-slate-400">{photo.name}</p></div>)}</div></section><section className="border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><h2 className="mb-4 text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Notes</h2><label className="mb-4 block text-sm text-slate-300">General notes<textarea rows={5} className={`${inputClass} mt-2`} style={inputStyle} value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} /></label><label className="block text-sm text-slate-300">Corrective actions<textarea rows={5} className={`${inputClass} mt-2`} style={inputStyle} value={form.correctiveActions} onChange={(e) => updateForm("correctiveActions", e.target.value)} /></label></section><button type="submit" disabled={submit.isPending} className="flex w-full items-center justify-center gap-2 bg-cyan-400 px-5 py-4 text-sm font-black uppercase tracking-wider text-slate-950 transition-opacity disabled:opacity-60"><Send className="h-4 w-4" />{submit.isPending ? "Generating and sending PDF…" : "Generate PDF and email client"}</button><div className="flex items-start gap-2 text-xs leading-relaxed text-slate-500"><Mail className="mt-0.5 h-4 w-4 shrink-0" />The report is emailed to the client and copied to admin.hr@nexusfacility.au.</div></div>
        </form>

        <section className="mt-12 border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><h2 className="mb-5 text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Recent reports</h2>{recentQuery.isLoading ? <p className="text-sm text-slate-400">Loading report history…</p> : recentQuery.data?.length ? <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-slate-700 text-xs uppercase tracking-wider text-cyan-300"><tr><th className="pb-3">Date</th><th className="pb-3">Client</th><th className="pb-3">Site</th><th className="pb-3">Result</th><th className="pb-3">Sent by</th></tr></thead><tbody>{recentQuery.data.map((report) => <tr key={report.id} className="border-b border-slate-800 text-slate-300"><td className="py-3">{report.inspectionDate}</td><td className="py-3">{report.clientName}</td><td className="py-3">{report.siteName}</td><td className="py-3">{report.overallRating}</td><td className="py-3">{report.staffName}</td></tr>)}</tbody></table></div> : <p className="text-sm text-slate-400">No reports have been sent yet.</p>}</section>
      </div>
    </div>
  );
}
