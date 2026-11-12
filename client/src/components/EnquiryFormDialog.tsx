import { useState } from "react";
import { ArrowRight, Handshake, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FormMode = "partner" | "commercial";

type FormState = {
  company: string;
  representativeName: string;
  name: string;
  phone: string;
  cleaningRequirements: string;
  offeredRates: string;
  cleaningType: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  company: "",
  representativeName: "",
  name: "",
  phone: "",
  cleaningRequirements: "",
  offeredRates: "",
  cleaningType: "",
  message: "",
};

const inputStyle = {
  background: "oklch(0.08 0.04 245)",
  border: "1px solid oklch(0.75 0.18 210 / 0.22)",
  color: "oklch(0.95 0.01 240)",
};

function Field({
  label,
  required = true,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.78 0.05 230)" }}>
        {label}{required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

export default function EnquiryFormDialog({ mode }: { mode: FormMode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const isPartner = mode === "partner";
  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setForm(EMPTY_FORM);
      setSubmitted(false);
      setSubmissionError(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(false);

    const payload = isPartner
      ? {
          company: form.company,
          representative_name: form.representativeName,
          phone: form.phone,
          cleaning_requirements: form.cleaningRequirements,
          offered_rates: form.offeredRates,
        }
      : {
          name: form.name,
          phone: form.phone,
          cleaning_type: form.cleaningType,
          comments: form.message,
        };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "60b0c703-f29a-47e4-b929-39f1a114078a",
          subject: isPartner
            ? `New Partnership Enquiry from ${form.company} — Nexus Facility Group`
            : `New Commercial Cleaning Quote from ${form.name} — Nexus Facility Group`,
          from_name: "Nexus Facility Group Website",
          ccemail: "hr.admin@nexusfacility.au",
          ...payload,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isPartner ? "Partner With Us" : "Request a Commercial Quote";
  const description = isPartner
    ? "Tell us about your company and the cleaning support you would like to offer or arrange."
    : "Send your cleaning requirements and our team will follow up with a quotation.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90"
          style={{
            background: isPartner ? "transparent" : "oklch(0.62 0.22 230)",
            color: isPartner ? "oklch(0.62 0.22 230)" : "oklch(0.10 0.05 245)",
            border: isPartner ? "1px solid oklch(0.62 0.22 230)" : "none",
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          {isPartner ? <Handshake className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          {isPartner ? "Partner With Us" : "Request a Quote"}
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-xl"
        style={{ background: "oklch(0.10 0.05 245)", borderColor: "oklch(0.62 0.22 230 / 0.38)", color: "oklch(0.95 0.01 240)" }}
      >
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="text-3xl font-black uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {title}
          </DialogTitle>
          <DialogDescription style={{ color: "oklch(0.72 0.05 230)" }}>
            {description} Submissions are sent to hr.admin@nexusfacility.au.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-5 py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "oklch(0.62 0.22 230 / 0.16)", color: "oklch(0.62 0.22 230)" }}>
              <Send className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold uppercase" style={{ color: "oklch(0.95 0.01 240)", fontFamily: "'Barlow Condensed', sans-serif" }}>Enquiry sent</h3>
            <p style={{ color: "oklch(0.72 0.05 230)" }}>
              Thank you. The Nexus Facility Group team will review your enquiry and contact you shortly.
            </p>
            <button type="button" onClick={() => setOpen(false)} className="px-5 py-2 text-xs font-bold uppercase tracking-wider" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {isPartner ? (
              <>
                <Field label="Company name">
                  <input required value={form.company} onChange={(event) => update("company", event.target.value)} className="w-full px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
                <Field label="Representative name">
                  <input required value={form.representativeName} onChange={(event) => update("representativeName", event.target.value)} className="w-full px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
                <Field label="Phone number">
                  <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} className="w-full px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
                <Field label="Cleaning requirements">
                  <textarea required rows={4} value={form.cleaningRequirements} onChange={(event) => update("cleaningRequirements", event.target.value)} className="w-full resize-y px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
                <Field label="Rates you would like to offer">
                  <textarea required rows={3} value={form.offeredRates} onChange={(event) => update("offeredRates", event.target.value)} className="w-full resize-y px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
              </>
            ) : (
              <>
                <Field label="Name">
                  <input required value={form.name} onChange={(event) => update("name", event.target.value)} className="w-full px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
                <Field label="Phone number">
                  <input required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} className="w-full px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
                <Field label="Type of cleaning">
                  <select required value={form.cleaningType} onChange={(event) => update("cleaningType", event.target.value)} className="w-full px-3 py-2.5 text-sm outline-none" style={inputStyle}>
                    <option value="" disabled>Select a service</option>
                    <option value="Commercial and office cleaning">Commercial and office cleaning</option>
                    <option value="Childcare and education cleaning">Childcare and education cleaning</option>
                    <option value="Retail and common-area cleaning">Retail and common-area cleaning</option>
                    <option value="Warehouse and industrial cleaning">Warehouse and industrial cleaning</option>
                    <option value="Builders and post-construction cleaning">Builders and post-construction cleaning</option>
                    <option value="Floor care">Floor care</option>
                    <option value="Carpet or upholstery steam cleaning">Carpet or upholstery steam cleaning</option>
                    <option value="Window cleaning">Window cleaning</option>
                    <option value="Pressure washing">Pressure washing</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
                <Field label="Comments">
                  <textarea required rows={5} value={form.message} onChange={(event) => update("message", event.target.value)} className="w-full resize-y px-3 py-2.5 text-sm outline-none" style={inputStyle} />
                </Field>
              </>
            )}

            {submissionError && (
              <p role="alert" className="text-sm" style={{ color: "oklch(0.72 0.18 25)" }}>
                We could not send the enquiry. Please call 0477 376 440 or email hr.admin@nexusfacility.au.
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-opacity disabled:opacity-60" style={{ background: "oklch(0.62 0.22 230)", color: "oklch(0.10 0.05 245)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
