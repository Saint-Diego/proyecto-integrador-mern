const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  _userId: { type: Schema.ObjectId, ref: "tasks" },
});

module.exports = model("tasks", taskSchema);
