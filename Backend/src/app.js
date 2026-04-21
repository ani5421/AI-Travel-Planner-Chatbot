const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ routes
app.use("/api", chatRoutes);

// test route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Travel AI Backend Running");
});

// ❌ 404 handler (IMPORTANT for debugging)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❌ global error handler (prevents silent crashes)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;