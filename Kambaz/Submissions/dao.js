import { v4 as uuidv4 } from "uuid";
import submissionModel from "./schema.js";

export default function SubmissionsDao() {
  // Create a new submission
  async function createSubmission(submission) {
    try {
      const newSubmission = new submissionModel({
        _id: uuidv4(),
        ...submission,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newSubmission.save();
      return newSubmission;
    } catch (error) {
      console.error("Error creating submission:", error);
      throw error;
    }
  }

  // Get all submissions for a quiz by a specific student
  async function getStudentSubmissionsForQuiz(studentId, quizId) {
    try {
      const submissions = await submissionModel
        .find({ studentId, quizId })
        .sort({ createdAt: -1 }); // Most recent first
      return submissions;
    } catch (error) {
      console.error("Error fetching student submissions:", error);
      throw error;
    }
  }

  // Get the latest submission for a student on a quiz
  async function getLatestSubmission(studentId, quizId) {
    try {
      const submission = await submissionModel
        .findOne({ studentId, quizId })
        .sort({ createdAt: -1 }); // Most recent first
      return submission;
    } catch (error) {
      console.error("Error fetching latest submission:", error);
      throw error;
    }
  }

  // Get all submissions for a quiz (admin/faculty view)
  async function getAllSubmissionsForQuiz(quizId) {
    try {
      const submissions = await submissionModel
        .find({ quizId })
        .sort({ createdAt: -1 });
      return submissions;
    } catch (error) {
      console.error("Error fetching all submissions for quiz:", error);
      throw error;
    }
  }

  // Count attempts for a student on a quiz
  async function countStudentAttempts(studentId, quizId) {
    try {
      const count = await submissionModel.countDocuments({
        studentId,
        quizId,
      });
      return count;
    } catch (error) {
      console.error("Error counting attempts:", error);
      throw error;
    }
  }

  // Get a specific submission by ID
  async function getSubmissionById(submissionId) {
    try {
      const submission = await submissionModel.findById(submissionId);
      return submission;
    } catch (error) {
      console.error("Error fetching submission:", error);
      throw error;
    }
  }

  // Update a submission
  async function updateSubmission(submissionId, updates) {
    try {
      const updated = await submissionModel.findByIdAndUpdate(
        submissionId,
        {
          ...updates,
          updatedAt: new Date(),
        },
        { new: true }
      );
      return updated;
    } catch (error) {
      console.error("Error updating submission:", error);
      throw error;
    }
  }

  // Delete a submission
  async function deleteSubmission(submissionId) {
    try {
      await submissionModel.deleteOne({ _id: submissionId });
      return { success: true };
    } catch (error) {
      console.error("Error deleting submission:", error);
      throw error;
    }
  }

  return {
    createSubmission,
    getStudentSubmissionsForQuiz,
    getLatestSubmission,
    getAllSubmissionsForQuiz,
    countStudentAttempts,
    getSubmissionById,
    updateSubmission,
    deleteSubmission,
  };
}
