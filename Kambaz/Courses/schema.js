import mongoose from "mongoose";
import moduelSchema from "../Modules/schema.js";
import assignmentSchema from "../Assignments/schema.js";
import quizSchema from "../Quizzes/schema.js";

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    credits: Number,
    description: String,
    modules: [moduelSchema],
    assignments: [assignmentSchema],
    quizzes: [quizSchema],
  },
  { collection: "courses" }
);

export default courseSchema;
