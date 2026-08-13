import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, LoaderCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { applyPageSeo } from "@/lib/seo";
import { readCvText } from "@/lib/careerMatcher";

type Version = { headline: string; summary: string; experience: string[]; education: string[]; skills: string[]; certifications: string[]; languages: string[] };
type Result = { english: Version; arabic: Version; atsNotes: string[] };
type Order = { id: string; status: "pending_transfer" | "transfer_submitted" | "approved" | "rejected"; priceSar: number; hasExport: boolean };
type Instructions = { configured: boolean; bankName: string; accountName: string; iban: string; accountNumber: string; swiftCode: string; amountSar: number; reference: string };

const labels: Record<keyof Version, string> = { headline: "Headline", summary: "Professional Summary", experience: "Experience", education: "Education", skills: "Skills", certifications: "Certifications", languages: "Languages" };

function VersionCard({ title, version }: { title: string; version: Version }) {
  return <article className="cv-result-card"><div className="cv-result-card-top"><span>{title}</span><b>ATS READY DRAFT</b></div><h2>{version.headline}</h2>{(Object.keys(labels) as Array<keyof Version>).map((key) => key === "headline" ? null : <section key={key} className="cv-result-section"><h3>{labels[key]}</h3>{Array.isArray(version[key]) ? <ul>{version[key].map((item, index) => <li key={`${key}-${index}`}>{item}</li>)}</ul> : <p>{version[key]}</p>}</section>)}</article>;
}

function OrderPanel({ result }: { result: Result }) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [payerName, setPayerName] = useState("");
  const [transferReference, setTransferReference] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [instructions, setInstructions] = useState<Instructions | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!order || order.status === "approved" || order.status === "rejected" || order.status === "pending_transfer") return;
    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/orders/${order.id}`);
      if (!response.ok) return;
      const payload = await response.json();
      setOrder(payload.order as Order);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [order]);

  const createOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName, customerEmail, result }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not create the order.");
      setOrder(payload.order); setInstructions(payload.instructions);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not create the order."); }
    finally { setBusy(false); }
  };

  const submitTransfer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!order) return; setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch(`/api/orders/${order.id}/transfer`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payerName, transferReference }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Could not submit the transfer reference.");
      setOrder(payload.order); setMessage("Your transfer reference was submitted. We will unlock the exports after manual approval.");
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Could not submit the transfer reference."); }
    finally { setBusy(false); }
  };

  return <section className="cv-payment-panel"><div className="cv-payment-heading"><span>EXPORT CHECKOUT</span><b>{order?.status === "approved" ? "UNLOCKED" : `${instructions?.amountSar || 29} SAR`}</b></div>
    {!order && <form onSubmit={createOrder} className="cv-payment-form"><p>Generation is free to preview. To test validation without payment fees, create an order and receive the bank-transfer instructions.</p><label><span>Name</span><input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Your name" /></label><label><span>Email</span><input required type="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} placeholder="name@example.com" /></label><button className="button button-accent" disabled={busy}>{busy ? "Creating order…" : "Create transfer order"} <ArrowRight size={17} /></button></form>}
    {order && order.status !== "approved" && order.status !== "rejected" && <div className="cv-transfer-flow"><div className={`cv-order-status status-${order.status}`}><b>Order {order.id}</b><span>{order.status === "pending_transfer" ? "Waiting for transfer" : "Transfer submitted — awaiting approval"}</span></div>{instructions?.configured ? <div className="cv-bank-details"><b>Transfer to</b><span>{instructions.bankName}</span><span>Account name: {instructions.accountName}</span><span>Account number: {instructions.accountNumber}</span><code>{instructions.iban}</code><span>SWIFT: {instructions.swiftCode}</span><small>Amount: {instructions.amountSar} SAR · {instructions.reference}</small></div> : <div className="cv-bank-details cv-bank-missing"><b>Bank details are not configured yet.</b><span>The admin must complete the protected bank configuration before customers can transfer.</span></div>}<form onSubmit={submitTransfer} className="cv-payment-form"><label><span>Payer name</span><input required value={payerName} onChange={(event) => setPayerName(event.target.value)} placeholder="Name used for the transfer" /></label><label><span>Transfer reference</span><input required value={transferReference} onChange={(event) => setTransferReference(event.target.value)} placeholder={order.id} /></label><button className="button button-accent" disabled={busy || !instructions?.configured}>{busy ? "Submitting…" : "Submit transfer details"} <ArrowRight size={17} /></button></form></div>}
    {order?.status === "rejected" && <div className="cv-bank-details cv-bank-missing"><b>Transfer not approved.</b><span>Contact support with order {order.id} if you believe this was a mistake.</span></div>}
    {order?.status === "approved" && <div className="cv-export-unlocked"><Check size={18} /><div><b>Exports unlocked</b><span>Download the files or open a print-ready version and save it as PDF.</span></div><div className="cv-export-actions"><a className="button button-paper" href={`/api/orders/${order.id}/export?language=english`}>English HTML</a><a className="button button-paper" href={`/api/orders/${order.id}/export?language=ar`}>Arabic HTML</a><a className="text-button light-text" target="_blank" rel="noreferrer" href={`/api/orders/${order.id}/export?language=english&format=print`}>Print / Save PDF</a></div></div>}
    {message && <div className="cv-payment-message">{message}</div>}{error && <div className="cv-error" role="alert">{error}</div>}
  </section>;
}

export default function CvMaker() {
  const [fileName, setFileName] = useState(""); const [sourceText, setSourceText] = useState(""); const [targetRole, setTargetRole] = useState(""); const [jobDescription, setJobDescription] = useState(""); const [status, setStatus] = useState<"idle" | "reading" | "generating" | "done" | "error">("idle"); const [error, setError] = useState(""); const [result, setResult] = useState<Result | null>(null);
  useEffect(() => { applyPageSeo({ title: "ATS CV Maker | AutoApply SA", description: "Create an ATS-friendly CV in English and Arabic from your existing CV.", path: "/cv-maker" }); }, []);
  const chooseFile = async (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; setFileName(file.name); setError(""); setStatus("reading"); const text = await readCvText(file); if (!text) { setStatus("error"); setError("This file could not be read. Try a text-based PDF, DOCX, or TXT file."); return; } setSourceText(text); setStatus("idle"); };
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError(""); setResult(null); if (sourceText.trim().length < 80) { setError("Upload a readable CV before generating the ATS version."); setStatus("error"); return; } setStatus("generating"); try { const response = await fetch("/api/cv/optimize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sourceText, targetRole, jobDescription }) }); const payload = await response.json().catch(() => ({})); if (!response.ok) throw new Error(payload.error || "The generator could not complete this request."); setResult(payload.result as Result); setStatus("done"); } catch (requestError) { setStatus("error"); setError(requestError instanceof Error ? requestError.message : "The generator is unavailable. Please try again."); } };
  return <main className="journey-page cv-maker-page"><header className="journey-header page-frame"><Link href="/" className="brand journey-brand" aria-label="AutoApply SA home"><img src="/manus-storage/autoapply-symbol_80d77010.png" alt="" className="brand-mark" /><span>AutoApply <em>SA</em></span></Link><span className="journey-status"><i /> ATS CV MAKER / STAGE 02</span></header><section className="cv-maker-wrap page-frame"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>ATS CV Maker</b></nav><div className="cv-maker-grid"><aside className="enquiry-aside"><span className="rail-label">01 / CV signal</span><span className="rail-rule" /><h1>Make your CV <i>read clearly.</i></h1><p>Upload an existing CV and generate a clean English and Arabic ATS-ready draft. Preview is available before any transfer order is created.</p><div className="response-guard"><ShieldCheck size={17} /><div><b>Source-first editing</b><span>The generator uses only the facts present in the uploaded CV and omits missing details instead of inventing them.</span></div></div></aside><form className="campaign-form cv-maker-form" onSubmit={submit}><div className="form-heading"><span>ATS CV GENERATOR</span><b>Stage 02 / Export</b></div><label className="campaign-upload cv-upload"><input type="file" accept=".pdf,.docx,.txt" onChange={chooseFile} /><span className="upload-icon"><FileText size={19} /></span><span><b>{fileName || "Select your CV"}</b><small>PDF, DOCX or TXT · text is extracted in your browser</small></span><ArrowRight size={18} /></label><label><span>Target role <em>optional</em></span><input value={targetRole} onChange={(event) => setTargetRole(event.target.value)} placeholder="e.g. Customer Service Representative" /></label><label><span>Job description <em>optional</em></span><textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the job description for stronger keyword matching." rows={5} /></label><div className="form-protection"><Check size={15} /> English and Arabic output · ATS-focused structure · review the draft before ordering exports.</div>{status === "reading" && <div className="cv-status"><LoaderCircle size={16} className="spin" /> Reading the CV on this device…</div>}{status === "generating" && <div className="cv-status"><LoaderCircle size={16} className="spin" /> Generating the bilingual ATS draft…</div>}{error && <div className="cv-error" role="alert">{error}</div>}<button className="button button-accent" type="submit" disabled={status === "reading" || status === "generating"}>{status === "generating" ? "Generating…" : "Generate ATS CV"} <ArrowRight size={18} /></button><Link href="/" className="form-back"><ArrowLeft size={15} /> Return to the engine overview</Link></form></div>{result && <div className="cv-results"><div className="cv-results-heading"><span>GENERATION COMPLETE</span><b>Review before export</b></div><div className="cv-result-grid"><VersionCard title="ENGLISH" version={result.english} /><VersionCard title="العربية" version={result.arabic} /></div>{result.atsNotes.length > 0 && <div className="cv-notes"><b>ATS notes</b>{result.atsNotes.map((note, index) => <span key={index}>{note}</span>)}</div>}<OrderPanel result={result} /></div>}</section></main>;
}
