const mongoose = require("mongoose");
const DataSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String },
  email: { type: String },
  createdDate: { type: Date, default: Date.now() },
});

const TaskModel = mongoose.model("tasks", DataSchema);
module.exports = TaskModel;
