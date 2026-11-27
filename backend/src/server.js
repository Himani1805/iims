import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "HS Academic Portal API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI missing in backend/.env");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing in backend/.env");
  }

  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`API running on http://127.0.0.1:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
