

process.on("uncaughtException", (err) => {
  console.log("ERROR:", err);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

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

    let messages = req.body?.messages || [];
    // Anthropic requires messages to start with 'user'
    if (messages.length > 0 && messages[0].role === "assistant") {
      messages = messages.slice(1);
    }
    if (messages.length === 0) {
      messages = [{ role: "user", content: "Hello" }];
    }

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 400,
        system: req.body?.systemPrompt || "You are an AI mentor.",
        messages: messages
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