import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import textRoutes from "./routes/textRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again shortly."
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "TextAlchemy API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/text", textRoutes);
app.use("/api/history", historyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
