const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  username: { type: String, required: true },
  id: { type: String, required: true },
  text: String,
  category: String,
  done: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
