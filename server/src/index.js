require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const { auth } = require("./middleware/auth");
const surveyRoutes = require("./routes/surveyRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with error handling
async function connectToMongoDB() {
  try {
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Handle MongoDB connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Attempting to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected.");
});

// Initialize connections
connectToMongoDB();

// Routes
app.use("/api/surveys", auth, surveyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error:
      config.server.nodeEnv === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start server
app.listen(config.server.port, () => {
  console.log(
    `Server running in ${config.server.nodeEnv} mode on port ${config.server.port}`
  );
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
