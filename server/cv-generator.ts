import { randomUUID } from "node:crypto";
import type { Express, Request, Response } from "express";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

const cvSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    english: { $ref: "#/$defs/version" },
    arabic: { $ref: "#/$defs/version" },
    atsNotes: { type: "array", items: { type: "string" } },
  },
  required: ["english", "arabic", "atsNotes"],
  $defs: {
    version: {
      type: "object",
      additionalProperties: false,
      properties: {
        headline: { type: "string" },
        summary: { type: "string" },
        experience: { type: "array", items: { type: "string" } },
        education: { type: "array", items: { type: "string" } },
        skills: { type: "array", items: { type: "string" } },
        certifications: { type: "array", items: { type: "string" } },
        languages: { type: "array", items: { type: "string" } },
      },
      required: ["headline", "summary", "experience", "education", "skills", "certifications", "languages"],
    },
  },
} as const;

type CvRequest = {
  sourceText?: string;
  targetRole?: string;
  jobDescription?: string;
};

function cleanText(value: unknown, maxLength: number): string {
  return String(value || "").replace(/\u0000/g, "").trim().slice(0, maxLength);
}

function promptFor(input: Required<Pick<CvRequest, "sourceText">> & Omit<CvRequest, "sourceText">): string {
  return `Create an ATS-friendly bilingual CV rewrite from the source CV below.

Rules:
- Return both English and Arabic versions.
- Use only facts present in the source CV. Never invent employers, dates, degrees, achievements, certifications, phone numbers, emails, or metrics.
- If a fact is missing, omit it rather than using brackets, placeholders, or fabricated details.
- Keep the content suitable for Workday, Indeed, LinkedIn, Greenhouse, Lever, Ashby, and similar ATS platforms.
- Use standard section-ready text, strong but truthful action verbs, and keywords from the target role or job description only when supported by the source CV.
- Keep experience as concise bullets. Preserve uncertainty instead of guessing.
- The output will be reviewed before any paid download.

Target role: ${cleanText(input.targetRole, 180) || "Choose the strongest role supported by the source CV"}
Job description: ${cleanText(input.jobDescription, 5000) || "No job description provided; optimize broadly for the candidate's background."}

SOURCE CV:
${input.sourceText}`;
}

function isValidOutput(value: unknown): value is { english: Record<string, unknown>; arabic: Record<string, unknown>; atsNotes: string[] } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return !!record.english && !!record.arabic && Array.isArray(record.atsNotes);
}

export function registerCvGeneratorRoutes(app: Express) {
  app.post("/api/cv/optimize", async (req: Request, res: Response) => {
    const requestId = randomUUID();
    res.setHeader("X-Request-Id", requestId);
    const body = (req.body || {}) as CvRequest;
    const sourceText = cleanText(body.sourceText, 30000);
    if (sourceText.length < 80) {
      return res.status(400).json({ error: "Please upload a readable CV or provide more CV text." });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("CV generator is not configured", { requestId });
      return res.status(503).json({ requestId, error: "The CV generator is not configured yet. Add GROQ_API_KEY to the backend environment." });
    }

    const model = process.env.GROQ_MODEL || DEFAULT_MODEL;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      let response: globalThis.Response | undefined;
      let payload: any = {};
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        response = await fetch(GROQ_URL, {
        method: "POST",
        signal: controller.signal,
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          max_completion_tokens: 6000,
          messages: [
            { role: "system", content: "You are a precise ATS CV editor. Output only valid JSON matching the supplied schema." },
            { role: "user", content: promptFor({ sourceText, targetRole: cleanText(body.targetRole, 180), jobDescription: cleanText(body.jobDescription, 5000) }) },
          ],
          response_format: { type: "json_schema", json_schema: { name: "ats_cv", strict: true, schema: cvSchema } },
        }),
        });
        payload = await response.json().catch(() => ({}));
        if (response.ok || ![429, 500, 502, 503, 504].includes(response.status) || attempt === 3) break;
        await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
      }
      if (!response?.ok) {
        console.error("Groq CV generation failed", { requestId, status: response?.status, message: payload?.error?.message || "unknown error" });
        return res.status(502).json({ requestId, error: "The CV generator could not complete this request. Please try again." });
      }
      const content = payload?.choices?.[0]?.message?.content;
      let parsed: unknown;
      try { parsed = JSON.parse(content); } catch { parsed = null; }
      if (!isValidOutput(parsed)) {
        console.error("Groq returned invalid CV structure", { requestId });
        return res.status(502).json({ requestId, error: "The CV generator returned an invalid result. Please try again." });
      }
      console.info("CV generated", { requestId, model });
      return res.json({ requestId, model, result: parsed });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      console.error("CV generation request failed", { requestId, message });
      return res.status(504).json({ requestId, error: "The CV generator timed out or became unavailable. Please try again." });
    } finally {
      clearTimeout(timeout);
    }
  });
}
