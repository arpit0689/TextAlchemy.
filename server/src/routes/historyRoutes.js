import express from "express";
import {
  createHistory,
  deleteHistory,
  getAnalytics,
  getHistory
} from "../controllers/historyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getHistory);
router.post("/", createHistory);
router.get("/analytics", getAnalytics);
router.delete("/:id", deleteHistory);

export default router;
