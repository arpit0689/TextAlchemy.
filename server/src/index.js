import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`TextAlchemy API running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start TextAlchemy API:", error);
  process.exit(1);
});
