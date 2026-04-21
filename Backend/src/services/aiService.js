// backend/services/chatService.js

const OpenAI = require("openai");
const Chat = require("../models/Chat");

// OpenRouter setup
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Main logic
const processChat = async (userMessage) => {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI travel assistant. Suggest destinations, itineraries, and budget tips.",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const botMessage = completion.choices[0].message.content;

  // Save to DB
  const chat = new Chat({
    userMessage,
    botMessage,
  });

  await chat.save();

  return botMessage;
};

module.exports = { processChat };