const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide a name."],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  completed: {
    required: false,
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
