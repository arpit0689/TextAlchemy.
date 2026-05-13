import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    originalText: {
      type: String,
      required: true,
      trim: true
    },
    processedText: {
      type: String,
      required: true,
      trim: true
    },
    processType: {
      type: String,
      required: true,
      enum: ["summarize", "humanize", "rewrite", "grammar"]
    }
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

export default History;
