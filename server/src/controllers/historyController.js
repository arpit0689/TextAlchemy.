import History from "../models/History.js";
import { processTextByType } from "../utils/aiProcessor.js";
import { validateRequiredText } from "../utils/validators.js";

export const getHistory = async (req, res, next) => {
  try {
    const { search = "", type = "all" } = req.query;
    const query = { userId: req.user._id };

    if (type !== "all") {
      query.processType = type;
    }

    if (search.trim()) {
      query.$or = [
        { originalText: { $regex: search.trim(), $options: "i" } },
        { processedText: { $regex: search.trim(), $options: "i" } }
      ];
    }

    const history = await History.find(query).sort({ createdAt: -1 });
    const stats = await History.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: "$processType", count: { $sum: 1 } } }
    ]);

    const counts = stats.reduce(
      (acc, item) => ({ ...acc, [item._id]: item.count, total: acc.total + item.count }),
      { total: 0, summarize: 0, humanize: 0, rewrite: 0, grammar: 0 }
    );

    res.json({ history, stats: counts });
  } catch (error) {
    next(error);
  }
};

export const createHistory = async (req, res, next) => {
  try {
    const { originalText, processedText, processType } = req.body;
    const originalError = validateRequiredText(originalText);
    const processedError = validateRequiredText(processedText);

    if (originalError || processedError) {
      return res.status(400).json({ message: originalError || processedError });
    }

    const allowedTypes = ["summarize", "humanize", "rewrite", "grammar"];
    if (!allowedTypes.includes(processType)) {
      return res.status(400).json({ message: "Invalid process type." });
    }

    const history = await History.create({
      userId: req.user._id,
      originalText,
      processedText,
      processType
    });

    res.status(201).json(history);
  } catch (error) {
    next(error);
  }
};

export const deleteHistory = async (req, res, next) => {
  try {
    const history = await History.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!history) {
      return res.status(404).json({ message: "History item not found." });
    }

    res.json({ message: "History item deleted." });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const byType = await History.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: "$processType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const dailyActivity = await History.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 14 }
    ]);

    res.json({
      byType,
      dailyActivity,
      totalUsage: byType.reduce((sum, item) => sum + item.count, 0),
      mostUsedTool: byType[0]?._id || "none"
    });
  } catch (error) {
    next(error);
  }
};
