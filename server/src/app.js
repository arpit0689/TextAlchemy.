import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import textRoutes from "./routes/textRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

const localClientUrl = "http://localhost:5173";
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.NODE_ENV !== "production" ? localClientUrl : null
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow same-origin tools such as curl, Postman, health checks, and server-to-server calls.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked request from origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again shortly."
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
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
