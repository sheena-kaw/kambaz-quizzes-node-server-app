import { v4 as uuidv4 } from "uuid";

import questionModel from "./model.js";
import model from "../Courses/model.js";

export default function QuestionsDao() {
  // Find all questions for a specific quiz
  async function findQuestionsForQuiz(quizId) {
    try {
      const questions = await questionModel.find({ quizId });
      return questions;
    } catch (error) {
      console.error("Error finding questions for quiz:", error);
      throw error;
    }
  }

  // Create a new question for a quiz
  async function createQuestion(quizId, question) {
    try {
      const newQuestion = new questionModel({
        _id: uuidv4(),
        quizId,
        ...question,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newQuestion.save();
      //update the quiz within the course model to include questions
      await model.updateOne(
        { "quizzes._id": quizId },
        { $push: { "quizzes.$.questionIds": newQuestion._id } }
      );

      return newQuestion;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  }

  // Update an existing question
  async function updateQuestion(questionId, updates) {
    try {
      const updatedQuestion = await questionModel.findByIdAndUpdate(
        questionId,
        {
          ...updates,
          updatedAt: new Date(),
        },
        { new: true }
      );

      return updatedQuestion;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  }

  // Delete a question
  async function deleteQuestion(quizId, questionId) {
    try {
      // Remove question from database
      await questionModel.deleteOne({ _id: questionId });

      // Remove question from quizzes within course
      await model.updateOne(
        { "quizzes._id": quizId },
        { $pull: { "quizzes.$.questionIds": questionId } }
      );

      return { success: true };
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  }

  // Get a single question by ID
  async function getQuestionById(questionId) {
    try {
      const question = await questionModel.findById(questionId);
      return question;
    } catch (error) {
      console.error("Error getting question:", error);
      throw error;
    }
  }

  // Get quiz with all its questions populated
  async function getQuizWithQuestions(quizId) {
    try {
      // Find the course that contains this quiz
      const course = await model.findOne(
        { "quizzes._id": quizId },
        { "quizzes.$": 1 } // Return only the matching quiz
      );

      if (!course || !course.quizzes[0]) {
        return null;
      }
      const quiz = course.quizzes[0];
      // Fetch all questions for this quiz
      const questions = await questionModel.find({ quizId });
      return {
        ...(quiz.toObject ? quiz.toObject() : quiz),
        questions,
      };
    } catch (error) {
      console.error("Error getting quiz with questions:", error);
      throw error;
    }
  }

  return {
    findQuestionsForQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionById,
    getQuizWithQuestions,
  };
}
