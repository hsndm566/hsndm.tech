import express from "express";
import { createServer } from "http";
import path from "path";
import { registerCvGeneratorRoutes } from "./cv-generator.js";
import { manualPaymentHealth, registerManualPaymentRoutes } from "./manual-payments.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: process.env.MAX_CV_REQUEST_BYTES || "1mb" }));
  app.get("/api/health", (_req, res) => res.json({
    ok: true,
    service: "hsndm-cv-maker",
    cvGenerator: {
      configured: Boolean(process.env.GROQ_API_KEY),
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    },
    manualPayments: manualPaymentHealth(),
  }));
  registerCvGeneratorRoutes(app);
  await registerManualPaymentRoutes(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
