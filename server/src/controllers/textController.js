import History from "../models/History.js";
import { processTextByType } from "../utils/aiProcessor.js";
import { validateRequiredText } from "../utils/validators.js";

const processAndStore = (processType) => async (req, res, next) => {
  try {
    const { text } = req.body;
    const validationError = validateRequiredText(text);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const processedText = await processTextByType(processType, text);
    const history = await History.create({
      userId: req.user._id,
      originalText: text.trim(),
      processedText,
      processType
    });

    res.status(201).json({
      id: history._id,
      originalText: history.originalText,
      processedText: history.processedText,
      processType: history.processType,
      createdAt: history.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const summarize = processAndStore("summarize");
export const humanize = processAndStore("humanize");
export const rewrite = processAndStore("rewrite");
export const grammar = processAndStore("grammar");
