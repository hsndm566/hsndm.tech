import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, LoaderCircle, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { applyPageSeo } from "@/lib/seo";
import { readCvText } from "@/lib/careerMatcher";

type Version = {
  headline: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
  certifications: string[];
  languages: string[];
};

type Result = { english: Version; arabic: Version; atsNotes: string[] };

const labels: Record<keyof Version, string> = {
  headline: "Headline",
  summary: "Professional Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications",
  languages: "Languages",
};

function VersionCard({ title, version }: { title: string; version: Version }) {
  return <article className="cv-result-card">
    <div className="cv-result-card-top"><span>{title}</span><b>ATS READY DRAFT</b></div>
    <h2>{version.headline}</h2>
    {(Object.keys(labels) as Array<keyof Version>).map((key) => key === "headline" ? null : (
      <section key={key} className="cv-result-section">
        <h3>{labels[key]}</h3>
        {Array.isArray(version[key]) ? <ul>{version[key].map((item, index) => <li key={`${key}-${index}`}>{item}</li>)}</ul> : <p>{version[key]}</p>}
      </section>
    ))}
  </article>;
}

export default function CvMaker() {
  const [fileName, setFileName] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "reading" | "generating" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    applyPageSeo({ title: "ATS CV Maker | AutoApply SA", description: "Create an ATS-friendly CV in English and Arabic from your existing CV.", path: "/cv-maker" });
  }, []);

  const chooseFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setStatus("reading");
    const text = await readCvText(file);
    if (!text) {
      setStatus("error");
      setError("This file could not be read. Try a text-based PDF, DOCX, or TXT file.");
      return;
    }
    setSourceText(text);
    setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult(null);
    if (sourceText.trim().length < 80) {
      setError("Upload a readable CV before generating the ATS version.");
      setStatus("error");
      return;
    }
    setStatus("generating");
    try {
      const response = await fetch("/api/cv/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceText, targetRole, jobDescription }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "The generator could not complete this request.");
      setResult(payload.result as Result);
      setStatus("done");
    } catch (requestError) {
      setStatus("error");
      setError(requestError instanceof Error ? requestError.message : "The generator is unavailable. Please try again.");
    }
  };

  return <main className="journey-page cv-maker-page">
    <header className="journey-header page-frame">
      <Link href="/" className="brand journey-brand" aria-label="AutoApply SA home"><img src="/manus-storage/autoapply-symbol_80d77010.png" alt="" className="brand-mark" /><span>AutoApply <em>SA</em></span></Link>
      <span className="journey-status"><i /> ATS CV MAKER / STAGE 01</span>
    </header>
    <section className="cv-maker-wrap page-frame">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><b>ATS CV Maker</b></nav>
      <div className="cv-maker-grid">
        <aside className="enquiry-aside">
          <span className="rail-label">01 / CV signal</span><span className="rail-rule" />
          <h1>Make your CV <i>read clearly.</i></h1>
          <p>Upload an existing CV and generate a clean English and Arabic ATS-ready draft. The first stage creates a reviewable draft; payment and downloads come after the generation path is proven.</p>
          <div className="response-guard"><ShieldCheck size={17} /><div><b>Source-first editing</b><span>The generator is instructed to use only the facts present in the uploaded CV and to omit missing details instead of inventing them.</span></div></div>
        </aside>
        <form className="campaign-form cv-maker-form" onSubmit={submit}>
          <div className="form-heading"><span>ATS CV GENERATOR</span><b>Stage 01 / Generation</b></div>
          <label className="campaign-upload cv-upload">
            <input type="file" accept=".pdf,.docx,.txt" onChange={chooseFile} />
            <span className="upload-icon"><FileText size={19} /></span>
            <span><b>{fileName || "Select your CV"}</b><small>PDF, DOCX or TXT · text is extracted in your browser</small></span>
            <ArrowRight size={18} />
          </label>
          <label><span>Target role <em>optional</em></span><input value={targetRole} onChange={(event) => setTargetRole(event.target.value)} placeholder="e.g. Customer Service Representative" /></label>
          <label><span>Job description <em>optional</em></span><textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the job description for stronger keyword matching." rows={5} /></label>
          <div className="form-protection"><Check size={15} /> English and Arabic output · ATS-focused structure · no file is sent until generation is requested.</div>
          {status === "reading" && <div className="cv-status"><LoaderCircle size={16} className="spin" /> Reading the CV on this device…</div>}
          {status === "generating" && <div className="cv-status"><LoaderCircle size={16} className="spin" /> Generating the bilingual ATS draft…</div>}
          {error && <div className="cv-error" role="alert">{error}</div>}
          <button className="button button-accent" type="submit" disabled={status === "reading" || status === "generating"}>{status === "generating" ? "Generating…" : "Generate ATS CV"} <ArrowRight size={18} /></button>
          <Link href="/" className="form-back"><ArrowLeft size={15} /> Return to the engine overview</Link>
        </form>
      </div>
      {result && <div className="cv-results"><div className="cv-results-heading"><span>GENERATION COMPLETE</span><b>Review before export</b></div><div className="cv-result-grid"><VersionCard title="ENGLISH" version={result.english} /><VersionCard title="العربية" version={result.arabic} /></div>{result.atsNotes.length > 0 && <div className="cv-notes"><b>ATS notes</b>{result.atsNotes.map((note, index) => <span key={index}>{note}</span>)}</div>}</div>}
    </section>
  </main>;
}
