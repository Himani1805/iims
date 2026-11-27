import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import authRoutes from "./routes/authRoutes.js";
import masterDataRoutes from "./routes/masterDataRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5050;

// Required behind Render / reverse proxies (rate-limit + correct client IP)
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use("/api", apiLimiter);

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "HS Academic Portal API" });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "HS Academic Portal API", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/master-data", masterDataRoutes);
app.use("/api/records", recordRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Set it in Render Environment / backend/.env");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Set it in Render Environment / backend/.env");
  }

  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on 0.0.0.0:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
