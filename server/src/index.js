require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const { auth } = require("./middleware/auth");
const surveyRoutes = require("./routes/surveyRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// MongoDB 连接
mongoose
  .connect(config.mongodb.uri)
  .then(() => {
    console.log("Successfully connected to MongoDB at", config.mongodb.uri);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// API 路由
app.use("/api/surveys", auth, surveyRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error:
      process.env.NODE_ENV === "development" ? err.message : "Server error",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
