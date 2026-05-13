import express from "express";
import { grammar, humanize, rewrite, summarize } from "../controllers/textController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/summarize", summarize);
router.post("/humanize", humanize);
router.post("/rewrite", rewrite);
router.post("/grammar", grammar);

export default router;
