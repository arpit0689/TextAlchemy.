import "dotenv/config";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import History from "../models/History.js";
import { processTextByType } from "./aiProcessor.js";

const sampleText =
  "TextAlchemy helps writers transform rough drafts into clear, polished content. It can summarize long passages, rewrite awkward sentences, and make technical language easier to read.";

const seed = async () => {
  await connectDB();
  await User.deleteMany({ email: "demo@textalchemy.dev" });

  const user = await User.create({
    name: "Demo Alchemist",
    email: "demo@textalchemy.dev",
    password: "password123"
  });

  const processTypes = ["summarize", "humanize", "rewrite", "grammar"];
  const records = await Promise.all(
    processTypes.map(async (processType) => ({
      userId: user._id,
      originalText: sampleText,
      processedText: await processTextByType(processType, sampleText),
      processType
    }))
  );

  await History.insertMany(records);
  console.log("Seed complete. Demo login: demo@textalchemy.dev / password123");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
