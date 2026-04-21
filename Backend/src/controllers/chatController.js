const axios = require("axios");

exports.handleChat = async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are WanderLustAI, a travel assistant. Give clear travel plans, itineraries, and tips.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        timeout: 15000, // 🔥 prevents hanging (VERY IMPORTANT)
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "WanderLustAI",
        },
      }
    );

    const reply = response?.data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ reply: "Empty AI response" });
    }

    return res.json({ reply });

  } catch (err) {
    console.error("OpenRouter Error:", err?.response?.data || err.message);

    return res.status(500).json({
      reply: "AI is not responding. Check API key or model access.",
    });
  }
};