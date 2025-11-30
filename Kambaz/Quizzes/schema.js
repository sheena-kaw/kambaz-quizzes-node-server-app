import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  description: String,
  available: String,
  due: String,
  avail_from_num: Date,
  due_num: Date,
  avail_to_num: Date,
  points: Number,
});

export default schema;