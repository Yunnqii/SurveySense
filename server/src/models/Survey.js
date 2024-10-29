const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: String,
  type: {
    type: String,
    enum: ["shortText", "longText", "multipleChoice", "checkboxList"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [String],
});

const surveySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Survey", surveySchema);
