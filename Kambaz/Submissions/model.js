import mongoose from "mongoose";
import submissionSchema from "./schema.js";

const submissionModel = mongoose.model("Submission", submissionSchema);
export default submissionModel;
