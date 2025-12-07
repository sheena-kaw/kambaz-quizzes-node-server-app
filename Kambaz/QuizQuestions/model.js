import mongoose from "mongoose";
import schema from "./schema.js";

const questionModel = mongoose.model("QuestionModel", schema);

export default questionModel;
