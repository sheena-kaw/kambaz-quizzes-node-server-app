import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  _id: String,
  studentId: String,
  quizId: String,
  courseId: String,
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  score: {
    earnedPoints: Number,
    totalPoints: Number,
    percentage: Number,
  },
  results: [
    {
      questionId: String,
      isCorrect: Boolean,
      pointsEarned: Number,
    },
  ],
  attemptNumber: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const submissionModel = mongoose.model("Submission", submissionSchema);

export default { submissionModel };
