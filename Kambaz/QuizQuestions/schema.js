import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  quizId: String,
  questionType: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
    required: true,
  },
  title: String,
  questionText: String,
  points: Number,
  // For MULTIPLE_CHOICE
  choices: [
    {
      _id: String,
      text: String,
      isCorrect: Boolean,
    },
  ],
  // For TRUE_FALSE
  correctAnswer: Boolean,
  // For FILL_IN_THE_BLANK
  possibleAnswers: [
    {
      _id: String,
      text: String,
      caseInsensitive: Boolean,
      isCorrect: Boolean,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default schema;
