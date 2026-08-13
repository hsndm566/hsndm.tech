import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Express, Request, Response } from "express";

type CvVersion = {
  headline: string;
  summary: string;
  experience: string[];
  education: string[];
  skills: string[];
  certifications: string[];
  languages: string[];
};

type CvResult = { english: CvVersion; arabic: CvVersion; atsNotes: string[] };
type OrderStatus = "pending_transfer" | "transfer_submitted" | "approved" | "rejected";
type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  customerEmail: string;
  priceSar: number;
  status: OrderStatus;
  transferReference?: string;
  payerName?: string;
  result: CvResult;
};

type PublicOrder = Omit<Order, "result"> & { hasExport: boolean };

const orderFile = process.env.CV_ORDERS_PATH || path.join(process.env.CV_STORAGE_DIR || "/tmp", "hsndm-cv-orders.json");
const orders = new Map<string, Order>();
let writeQueue = Promise.resolve();

function text(value: unknown, max: number) {
  return String(value || "").replace(/\u0000/g, "").trim().slice(0, max);
}

function publicOrder(order: Order): PublicOrder {
  const { result: _result, ...safe } = order;
  return { ...safe, hasExport: order.status === "approved" };
}

async function persist() {
  await mkdir(path.dirname(orderFile), { recursive: true });
  const payload = JSON.stringify(Array.from(orders.values()), null, 2);
  writeQueue = writeQueue.then(() => writeFile(orderFile, payload, "utf8"));
  await writeQueue;
}

async function load() {
  try {
    const raw = await readFile(orderFile, "utf8");
    const saved = JSON.parse(raw) as Order[];
    saved.forEach((order) => orders.set(order.id, order));
  } catch {
    // First run or ephemeral storage: start empty and keep the service usable.
  }
}

function instructions() {
  return {
    configured: Boolean(process.env.BANK_IBAN && process.env.BANK_ACCOUNT_NAME),
    bankName: text(process.env.BANK_NAME, 120),
    accountName: text(process.env.BANK_ACCOUNT_NAME, 160),
    iban: text(process.env.BANK_IBAN, 80),
    amountSar: Number(process.env.CV_PRICE_SAR || 29),
    reference: "Use your order ID as the transfer reference.",
  };
}

function htmlFor(version: CvVersion, direction: "ltr" | "rtl") {
  const list = (items: string[]) => items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
  const section = (title: string, content: string) => content ? `<section><h2>${title}</h2>${content}</section>` : "";
  return `<!doctype html><html lang="${direction === "rtl" ? "ar" : "en"}" dir="${direction}"><head><meta charset="utf-8"><title>${escapeHtml(version.headline)}</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;color:#111;line-height:1.45}h1{font-size:28px;border-bottom:2px solid #111;padding-bottom:10px}h2{font-size:15px;border-bottom:1px solid #aaa;padding-bottom:4px;margin-top:22px}li{margin:4px 0}@media print{body{margin:18mm}}</style></head><body><h1>${escapeHtml(version.headline)}</h1>${section(direction === "rtl" ? "الملخص المهني" : "Professional Summary", `<p>${escapeHtml(version.summary)}</p>`)}${section(direction === "rtl" ? "الخبرة المهنية" : "Professional Experience", list(version.experience))}${section(direction === "rtl" ? "التعليم" : "Education", list(version.education))}${section(direction === "rtl" ? "المهارات" : "Skills", list(version.skills))}${section(direction === "rtl" ? "الشهادات والدورات" : "Certifications", list(version.certifications))}${section(direction === "rtl" ? "اللغات" : "Languages", list(version.languages))}</body></html>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);
}

function authorizeAdmin(req: Request) {
  const expected = process.env.ADMIN_API_TOKEN;
  return Boolean(expected && req.header("x-admin-token") === expected);
}

export async function registerManualPaymentRoutes(app: Express) {
  await load();

  app.post("/api/orders", async (req: Request, res: Response) => {
    const { result } = req.body || {};
    if (!result?.english || !result?.arabic) return res.status(400).json({ error: "A generated CV is required before creating an order." });
    const order: Order = {
      id: `CV-${randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerName: text(req.body.customerName, 120),
      customerEmail: text(req.body.customerEmail, 200),
      priceSar: instructions().amountSar,
      status: "pending_transfer",
      result,
    };
    orders.set(order.id, order);
    await persist();
    return res.status(201).json({ order: publicOrder(order), instructions: instructions() });
  });

  app.post("/api/orders/:id/transfer", async (req: Request, res: Response) => {
    const order = orders.get(text(req.params.id, 80));
    if (!order) return res.status(404).json({ error: "Order not found." });
    if (order.status !== "pending_transfer") return res.status(409).json({ error: "This order is no longer waiting for transfer confirmation." });
    order.status = "transfer_submitted";
    order.transferReference = text(req.body?.transferReference, 160);
    order.payerName = text(req.body?.payerName, 160);
    order.updatedAt = new Date().toISOString();
    await persist();
    return res.json({ order: publicOrder(order), message: "Transfer details submitted for manual review." });
  });

  app.get("/api/orders/:id", (req: Request, res: Response) => {
    const order = orders.get(text(req.params.id, 80));
    if (!order) return res.status(404).json({ error: "Order not found." });
    return res.json({ order: publicOrder(order) });
  });

  app.post("/api/admin/orders/:id/approve", async (req: Request, res: Response) => {
    if (!authorizeAdmin(req)) return res.status(401).json({ error: "Unauthorized." });
    const order = orders.get(text(req.params.id, 80));
    if (!order) return res.status(404).json({ error: "Order not found." });
    order.status = "approved";
    order.updatedAt = new Date().toISOString();
    await persist();
    return res.json({ order: publicOrder(order) });
  });

  app.post("/api/admin/orders/:id/reject", async (req: Request, res: Response) => {
    if (!authorizeAdmin(req)) return res.status(401).json({ error: "Unauthorized." });
    const order = orders.get(text(req.params.id, 80));
    if (!order) return res.status(404).json({ error: "Order not found." });
    order.status = "rejected";
    order.updatedAt = new Date().toISOString();
    await persist();
    return res.json({ order: publicOrder(order) });
  });

  app.get("/api/orders/:id/export", (req: Request, res: Response) => {
    const order = orders.get(text(req.params.id, 80));
    if (!order) return res.status(404).json({ error: "Order not found." });
    if (order.status !== "approved") return res.status(402).json({ error: "Payment has not been approved yet." });
    const language = req.query.language === "ar" ? "arabic" : "english";
    const direction = language === "arabic" ? "rtl" : "ltr";
    const html = htmlFor(order.result[language], direction);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    if (req.query.format !== "print") res.setHeader("Content-Disposition", `attachment; filename="${order.id}-${language}.html"`);
    return res.send(html);
  });
}

export function manualPaymentHealth() {
  return { bankConfigured: Boolean(process.env.BANK_IBAN && process.env.BANK_ACCOUNT_NAME), priceSar: Number(process.env.CV_PRICE_SAR || 29), storagePathConfigured: Boolean(process.env.CV_ORDERS_PATH || process.env.CV_STORAGE_DIR) };
}
