import { useMemo, useState } from "react";
import { ClipboardCheck, FileText, KeyRound, LogIn, LogOut, Mail, Send, ShieldCheck, Star, Upload, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type PhotoItem = { name: string; dataUrl: string };
type ChecklistItem = { label: string; score: number; comment: string; photos: PhotoItem[] };
type ChecklistSection = { area: string; items: ChecklistItem[] };
type AuthMode = "login" | "setup";

const ALLOWED_EMAILS = "rayan@nexusfacility.au · vinu@nexusfacility.au";

const makeItem = (label: string): ChecklistItem => ({ label, score: 3, comment: "", photos: [] });
const INITIAL_SECTIONS: ChecklistSection[] = [
  {
    area: "Toilets & washrooms",
    items: [
      makeItem("Toilet bowl and seat clean"),
      makeItem("Sink cleaned, including tap edges"),
      makeItem("Mirror cleaned"),
      makeItem("Floor mopped"),
      makeItem("Walls and partitions wiped"),
      makeItem("Air vents clean"),
    ],
  },
  {
    area: "Reception & common areas",
    items: [makeItem("Entry and reception surfaces clean"), makeItem("Doors, handles and glass clean"), makeItem("High-touch points disinfected"), makeItem("Furniture and presentation areas clean")],
  },
  {
    area: "Floors & carpets",
    items: [makeItem("Hard floors swept and mopped"), makeItem("Carpets and mats vacuumed"), makeItem("Edges, corners and skirting detailed")],
  },
  {
    area: "Kitchen & amenities",
    items: [makeItem("Benches, splashbacks and sinks clean"), makeItem("Appliances and touchpoints clean"), makeItem("Kitchen floor clean"), makeItem("Bins emptied and consumables replenished")],
  },
  {
    area: "Offices & staff areas",
    items: [makeItem("Workstations and shared surfaces clean"), makeItem("High-touch points wiped"), makeItem("Bins and waste points managed"), makeItem("Internal glass and ledges clean")],
  },
  {
    area: "External presentation & safety",
    items: [makeItem("External entry and paths presentable"), makeItem("External glass and windows checked"), makeItem("Waste area clean and orderly"), makeItem("Hazards or maintenance issues recorded")],
  },
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
  const scale = Math.min(1, 1100 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return { name: file.name, dataUrl: canvas.toDataURL("image/jpeg", 0.72) };
}

function sectionTotals(section: ChecklistSection) {
  const total = section.items.reduce((sum, item) => sum + item.score, 0);
  return { total, max: section.items.length * 5, percentage: Math.round((total / (section.items.length * 5)) * 100) };
}

function overallTotals(sections: ChecklistSection[]) {
  const total = sections.reduce((sum, section) => sum + sectionTotals(section).total, 0);
  const max = sections.reduce((sum, section) => sum + sectionTotals(section).max, 0);
  return { total, max, percentage: max ? Math.round((total / max) * 100) : 0 };
}

export default function StaffInspectionPage() {
  const staffMe = trpc.staffAuth.me.useQuery();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authStep, setAuthStep] = useState<"credentials" | "code">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const requestLogin = trpc.staffAuth.requestLogin.useMutation({ onSuccess: () => { setAuthStep("code"); toast.success("A verification code was sent to your email."); }, onError: (error) => toast.error(error.message) });
  const requestSetup = trpc.staffAuth.requestSetup.useMutation({ onSuccess: () => { setAuthStep("code"); toast.success("A password setup code was sent to your email."); }, onError: (error) => toast.error(error.message) });
  const verifyLogin = trpc.staffAuth.verifyLogin.useMutation({ onSuccess: async () => { await staffMe.refetch(); toast.success("Staff portal access verified."); }, onError: (error) => toast.error(error.message) });
  const verifySetup = trpc.staffAuth.verifySetup.useMutation({ onSuccess: async () => { await staffMe.refetch(); toast.success("Account created and staff portal access verified."); }, onError: (error) => toast.error(error.message) });
  const logout = trpc.staffAuth.logout.useMutation({ onSuccess: async () => { await staffMe.refetch(); setAuthStep("credentials"); setPassword(""); setCode(""); } });

  const [form, setForm] = useState({ clientName: "", clientEmail: "", siteName: "", siteAddress: "", inspectionDate: today(), serviceType: "Commercial cleaning inspection", notes: "", correctiveActions: "" });
  const [sections, setSections] = useState<ChecklistSection[]>(INITIAL_SECTIONS);
  const submit = trpc.staffInspections.submit.useMutation({ onSuccess: async () => { toast.success("Inspection report emailed to the client and saved."); await staffMe.refetch(); setForm((current) => ({ ...current, clientName: "", clientEmail: "", siteName: "", siteAddress: "", notes: "", correctiveActions: "" })); setSections(INITIAL_SECTIONS); }, onError: (error) => toast.error(error.message || "The inspection could not be sent.") });
  const recentQuery = trpc.staffInspections.recent.useQuery(undefined, { enabled: Boolean(staffMe.data) });

  const overall = useMemo(() => overallTotals(sections), [sections]);

  function updateForm(key: keyof typeof form, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  function updateItem(sectionIndex: number, itemIndex: number, changes: Partial<ChecklistItem>) { setSections((current) => current.map((section, currentSectionIndex) => currentSectionIndex === sectionIndex ? { ...section, items: section.items.map((item, currentItemIndex) => currentItemIndex === itemIndex ? { ...item, ...changes } : item) } : section)); }

  async function addItemPhotos(sectionIndex: number, itemIndex: number, event: React.ChangeEvent<HTMLInputElement>) {
    const existing = sections[sectionIndex]?.items[itemIndex]?.photos || [];
    const files = Array.from(event.target.files || []).slice(0, 2 - existing.length);
    if (!files.length) return;
    try {
      const prepared = await Promise.all(files.map(preparePhoto));
      updateItem(sectionIndex, itemIndex, { photos: [...existing, ...prepared].slice(0, 2) });
    } catch { toast.error("One or more photos could not be prepared."); }
    finally { event.target.value = ""; }
  }

  function removeItemPhoto(sectionIndex: number, itemIndex: number, photoIndex: number) {
    const photos = sections[sectionIndex]?.items[itemIndex]?.photos || [];
    updateItem(sectionIndex, itemIndex, { photos: photos.filter((_, index) => index !== photoIndex) });
  }

  function submitReport(event: React.FormEvent) {
    event.preventDefault();
    submit.mutate({ ...form, overallRating: `${overall.total}/${overall.max} (${overall.percentage}%)`, checklist: sections, photos: [] });
  }

  if (staffMe.isLoading) return <div className="min-h-screen bg-slate-950 px-6 py-24 text-center text-slate-300">Checking staff access…</div>;

  if (!staffMe.data) {
    const pending = requestLogin.isPending || requestSetup.isPending || verifyLogin.isPending || verifySetup.isPending;
    return <div className="min-h-screen bg-slate-950 px-6 py-16 text-white"><div className="mx-auto max-w-md border border-cyan-300/20 bg-slate-900 p-7 sm:p-10"><ShieldCheck className="mx-auto mb-5 h-12 w-12 text-cyan-300" /><h1 className="mb-3 text-center text-4xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nexus Staff Portal</h1><p className="mb-7 text-center text-sm leading-relaxed text-slate-400">Access is restricted to authorised Nexus Facility Group staff.</p><div className="mb-6 grid grid-cols-2 border border-slate-700"><button type="button" onClick={() => { setAuthMode("login"); setAuthStep("credentials"); }} className={`px-3 py-3 text-xs font-bold uppercase ${authMode === "login" ? "bg-cyan-400 text-slate-950" : "text-slate-400"}`}>Staff login</button><button type="button" onClick={() => { setAuthMode("setup"); setAuthStep("credentials"); }} className={`px-3 py-3 text-xs font-bold uppercase ${authMode === "setup" ? "bg-cyan-400 text-slate-950" : "text-slate-400"}`}>Create password</button></div>{authStep === "credentials" ? <form onSubmit={(event) => { event.preventDefault(); if (authMode === "login") requestLogin.mutate({ email, password }); else requestSetup.mutate({ email, password }); }} className="space-y-4"><label className="block text-sm text-slate-300">Authorised work email<input required type="email" className={`${inputClass} mt-2`} style={inputStyle} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="rayan@nexusfacility.au" /></label><p className="-mt-2 text-xs text-slate-500">Allowed accounts: {ALLOWED_EMAILS}</p><label className="block text-sm text-slate-300">{authMode === "setup" ? "Create password" : "Password"}<input required minLength={8} type="password" className={`${inputClass} mt-2`} style={inputStyle} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label><button disabled={pending} className="flex w-full items-center justify-center gap-2 bg-cyan-400 px-5 py-3 text-sm font-black uppercase text-slate-950 disabled:opacity-60">{authMode === "setup" ? <KeyRound className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}{pending ? "Please wait…" : authMode === "setup" ? "Create password" : "Continue to verification"}</button></form> : <form onSubmit={(event) => { event.preventDefault(); if (authMode === "login") verifyLogin.mutate({ email, code }); else verifySetup.mutate({ email, code }); }} className="space-y-4"><div className="border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm text-slate-300">We sent a 6-digit verification code to <strong className="text-white">{email}</strong>. Check the inbox for this address.</div><label className="block text-sm text-slate-300">Email verification code<input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} className={`${inputClass} mt-2 text-center text-xl tracking-[0.5em]`} style={inputStyle} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" /></label><button disabled={pending} className="flex w-full items-center justify-center gap-2 bg-cyan-400 px-5 py-3 text-sm font-black uppercase text-slate-950 disabled:opacity-60"><Mail className="h-4 w-4" />{pending ? "Verifying…" : "Verify and enter portal"}</button><button type="button" onClick={() => setAuthStep("credentials")} className="w-full text-xs text-slate-500 underline">Use a different email</button></form>}<p className="mt-7 text-center text-xs leading-relaxed text-slate-500">After the first password setup, future logins require your password and a new code sent to your email.</p></div></div>;
  }

  return <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-5 border-b border-cyan-300/20 pb-7 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Nexus Facility Group · Internal</p><h1 className="text-5xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Cleaning inspection portal</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">Score every inspection area from 1 to 5, attach evidence to each subcategory and send a branded PDF report to the client.</p></div><div className="flex items-center gap-3"><div className="border border-cyan-300/20 bg-slate-900 px-4 py-3 text-sm text-slate-300"><span className="block text-xs uppercase tracking-wider text-cyan-300">Signed in as</span>{staffMe.data.email}</div><button type="button" onClick={() => logout.mutate()} className="border border-slate-700 p-3 text-slate-400 hover:text-white" title="Sign out"><LogOut className="h-4 w-4" /></button></div></div>

    <form onSubmit={submitReport} className="space-y-8"><section className="border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><div className="mb-6 flex items-center gap-3"><ClipboardCheck className="h-6 w-6 text-cyan-300" /><div><h2 className="text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Inspection details</h2><p className="text-xs text-slate-400">These details appear on the client PDF.</p></div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><label className="text-sm text-slate-300">Client name<input required className={`${inputClass} mt-2`} style={inputStyle} value={form.clientName} onChange={(event) => updateForm("clientName", event.target.value)} /></label><label className="text-sm text-slate-300">Client email<input required type="email" className={`${inputClass} mt-2`} style={inputStyle} value={form.clientEmail} onChange={(event) => updateForm("clientEmail", event.target.value)} /></label><label className="text-sm text-slate-300">Site name<input required className={`${inputClass} mt-2`} style={inputStyle} value={form.siteName} onChange={(event) => updateForm("siteName", event.target.value)} /></label><label className="text-sm text-slate-300">Inspection date<input required type="date" className={`${inputClass} mt-2`} style={inputStyle} value={form.inspectionDate} onChange={(event) => updateForm("inspectionDate", event.target.value)} /></label><label className="text-sm text-slate-300 sm:col-span-2 lg:col-span-4">Site address<input required className={`${inputClass} mt-2`} style={inputStyle} value={form.siteAddress} onChange={(event) => updateForm("siteAddress", event.target.value)} /></label><label className="text-sm text-slate-300 lg:col-span-2">Service type<select className={`${inputClass} mt-2`} style={inputStyle} value={form.serviceType} onChange={(event) => updateForm("serviceType", event.target.value)}><option>Commercial cleaning inspection</option><option>Childcare and education inspection</option><option>Medical and healthcare inspection</option><option>Industrial and warehouse inspection</option><option>Restoration / specialist cleaning inspection</option><option>Other site inspection</option></select></label><div className="flex items-end border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 lg:col-span-2"><div><span className="block text-xs uppercase tracking-wider text-cyan-300">Overall score</span><strong className="text-3xl text-white">{overall.total}/{overall.max}</strong><span className="ml-2 text-sm text-slate-400">({overall.percentage}%)</span></div></div></div></section>

      <section className="space-y-6">{sections.map((section, sectionIndex) => { const totals = sectionTotals(section); return <div key={section.area} className="border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-700 pb-4 sm:flex-row sm:items-center"><div><h2 className="text-3xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{section.area}</h2><p className="text-xs text-slate-400">Score each subcategory from 1 (poor) to 5 (excellent). Add photos to support the score.</p></div><div className="border border-cyan-300/30 px-4 py-2 text-right"><span className="block text-[10px] uppercase tracking-wider text-cyan-300">Section total</span><strong className="text-xl text-white">{totals.total}/{totals.max}</strong><span className="ml-2 text-xs text-slate-400">{totals.percentage}%</span></div></div><div className="space-y-4">{section.items.map((item, itemIndex) => <div key={item.label} className="border border-slate-700/80 p-4"><div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center"><div className="flex items-start gap-3"><span className="mt-1 text-xs font-bold text-cyan-300">{itemIndex + 1}.</span><div><p className="text-sm font-semibold text-slate-100">{item.label}</p><input aria-label={`${item.label} comment`} placeholder="Optional comment" className={`${inputClass} mt-2 lg:w-[420px]`} style={inputStyle} value={item.comment} onChange={(event) => updateItem(sectionIndex, itemIndex, { comment: event.target.value })} /></div></div><div className="flex items-center gap-1 pl-6 lg:pl-0"><span className="mr-2 text-[10px] uppercase tracking-wider text-slate-500">Score</span>{[1, 2, 3, 4, 5].map((score) => <button type="button" key={score} aria-label={`${item.label} score ${score}`} onClick={() => updateItem(sectionIndex, itemIndex, { score })} className={`flex h-9 w-9 items-center justify-center border text-sm font-bold transition-colors ${item.score === score ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-slate-600 text-slate-400 hover:border-cyan-300 hover:text-cyan-300"}`}>{score}</button>)}</div></div><div className="mt-4 flex flex-col gap-3 border-t border-slate-800 pt-3 sm:flex-row sm:items-center sm:justify-between"><label className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300"><Upload className="h-4 w-4" /> Upload item photos ({item.photos.length}/2)<input type="file" accept="image/jpeg,image/png" multiple className="sr-only" disabled={item.photos.length >= 2} onChange={(event) => addItemPhotos(sectionIndex, itemIndex, event)} /></label><div className="flex gap-2">{item.photos.map((photo, photoIndex) => <div key={`${photo.name}-${photoIndex}`} className="relative h-12 w-12 overflow-hidden border border-slate-600"><img src={photo.dataUrl} alt={photo.name} className="h-full w-full object-cover" /><button type="button" aria-label={`Remove ${photo.name}`} onClick={() => removeItemPhoto(sectionIndex, itemIndex, photoIndex)} className="absolute right-0 top-0 bg-slate-950/90 p-0.5 text-white"><X className="h-3 w-3" /></button></div>)}</div></div></div>)}</div></div>; })}</section>

      <section className="grid gap-6 lg:grid-cols-2"><label className="border border-cyan-300/20 bg-slate-900 p-5 text-sm text-slate-300 sm:p-7">General notes<textarea rows={6} className={`${inputClass} mt-2`} style={inputStyle} value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} /></label><label className="border border-cyan-300/20 bg-slate-900 p-5 text-sm text-slate-300 sm:p-7">Corrective actions<textarea rows={6} className={`${inputClass} mt-2`} style={inputStyle} value={form.correctiveActions} onChange={(event) => updateForm("correctiveActions", event.target.value)} /></label></section><button type="submit" disabled={submit.isPending} className="flex w-full items-center justify-center gap-2 bg-cyan-400 px-5 py-4 text-sm font-black uppercase tracking-wider text-slate-950 transition-opacity disabled:opacity-60"><Send className="h-4 w-4" />{submit.isPending ? "Generating and sending PDF…" : "Generate PDF and email client"}</button><div className="flex items-start gap-2 text-xs leading-relaxed text-slate-500"><Mail className="mt-0.5 h-4 w-4 shrink-0" />The scored report with section totals and item photos is emailed to the client and copied to admin.hr@nexusfacility.au.</div></form>

    <section className="mt-12 border border-cyan-300/20 bg-slate-900 p-5 sm:p-7"><h2 className="mb-5 text-2xl font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Recent reports</h2>{recentQuery.isLoading ? <p className="text-sm text-slate-400">Loading report history…</p> : recentQuery.data?.length ? <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-slate-700 text-xs uppercase tracking-wider text-cyan-300"><tr><th className="pb-3">Date</th><th className="pb-3">Client</th><th className="pb-3">Site</th><th className="pb-3">Result</th><th className="pb-3">Sent by</th></tr></thead><tbody>{recentQuery.data.map((report) => <tr key={report.id} className="border-b border-slate-800 text-slate-300"><td className="py-3">{report.inspectionDate}</td><td className="py-3">{report.clientName}</td><td className="py-3">{report.siteName}</td><td className="py-3">{report.overallRating}</td><td className="py-3">{report.staffName}</td></tr>)}</tbody></table></div> : <p className="text-sm text-slate-400">No reports have been sent yet.</p>}</section></div></div>;
}
