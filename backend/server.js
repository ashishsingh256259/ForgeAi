

process.on("uncaughtException", (err) => {
  console.log("ERROR:", err);
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const mongoose = require("mongoose");
const User = require("./models/User");
const Task = require("./models/Task");

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
        model: "claude-sonnet-4-6",
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

// GET USER PROFILE
app.get("/api/user/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE USER PROFILE
app.post("/api/user", async (req, res) => {
  try {
    const { name, educationLevel, field, career, surveyAnswers } = req.body;
    let user = await User.findOne({ name });

    if (user) {
      user.educationLevel = educationLevel;
      user.field = field;
      user.career = career;
      user.surveyAnswers = surveyAnswers;
      await user.save();
    } else {
      user = new User({ name, educationLevel, field, career, surveyAnswers });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TASKS FOR USER
app.get("/api/tasks/:username", async (req, res) => {
  try {
    const tasks = await Task.find({ username: req.params.username });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE TASKS FOR USER
app.post("/api/tasks/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { tasks } = req.body; // Array of task objects

    // Clear old tasks and save new ones
    await Task.deleteMany({ username });

    const tasksToSave = tasks.map(t => ({
      username,
      id: t.id,
      text: t.text,
      category: t.category,
      done: t.done
    }));

    await Task.insertMany(tasksToSave);
    res.json({ success: true, message: "Tasks saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});