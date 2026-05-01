process.on("uncaughtException", (err) => {
  console.log("ERROR:", err);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

// MAIN CHAT ROUTE
app.post("/api/chat", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const userMessage = req.body?.messages?.[0]?.content || "Hello";
    const isShort = input.length < 2;

const systemPrompt = isShort
  ? "Reply in 1 short line only"
  : "Give detailed but concise answer";


    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        messages: [
  {
    role: "user",
    content: userMessage
  }
]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        }
      }
    );

    res.json({
      reply: response.data.content[0].text
    });

  } catch (err) {
    console.log("FULL ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "API error",
      details: err.response?.data || err.message
    });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});