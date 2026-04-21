const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    botMessage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Chat", chatSchema);