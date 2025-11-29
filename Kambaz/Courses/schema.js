import mongoose from "mongoose";
import moduelSchema from "../Modules/schema.js";
import assignmentSchema from "../Assignments/schema.js";

const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    credits: Number,
    description: String,
    modules: [moduelSchema],
    assignments: [assignmentSchema],
  },
  { collection: "courses" }
);

export default courseSchema;
