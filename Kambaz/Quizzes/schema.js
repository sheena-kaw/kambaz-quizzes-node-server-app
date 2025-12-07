import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  description: String,
  avail_from: String,
  due: String,
  avail_to: String,
  points: Number,
  quiz_type: String,
  assignment_group: String,
  shuffle: Boolean,
  time_limit: Number,
  attempts: Boolean,
  attempts_num: Number,
  show_correct: Boolean,
  access_code: String,
  one_question: Boolean,
  webcam: Boolean,
  lock_question: Boolean,
  published: Boolean,
  assigned_to: String,
  questionIds: [String],
});

export default schema;
