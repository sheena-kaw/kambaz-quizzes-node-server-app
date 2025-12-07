import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app, db) {
  const questionsDao = QuestionsDao();

  // Get all questions for a quiz
  const findQuestionsForQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const questions = await questionsDao.findQuestionsForQuiz(quizId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  };

  // Create a new question for a quiz
  const createQuestion = async (req, res) => {
    try {
      const { quizId } = req.params;
      const questionData = req.body;

      const newQuestion = await questionsDao.createQuestion(
        quizId,
        questionData
      );
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Failed to create question" });
    }
  };

  // Update a question
  const updateQuestion = async (req, res) => {
    try {
      const { quizId, questionId } = req.params;
      const updates = req.body;

      const updatedQuestion = await questionsDao.updateQuestion(
        questionId,
        updates
      );
      res.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ error: "Failed to update question" });
    }
  };

  // Delete a question
  const deleteQuestion = async (req, res) => {
    try {
      const { quizId, questionId } = req.params;

      const result = await questionsDao.deleteQuestion(quizId, questionId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ error: "Failed to delete question" });
    }
  };

  // Get quiz with all questions populated
  const getQuizWithQuestions = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quizWithQuestions = await questionsDao.getQuizWithQuestions(quizId);

      if (!quizWithQuestions) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      res.json(quizWithQuestions);
    } catch (error) {
      console.error("Error fetching quiz with questions:", error);
      res.status(500).json({ error: "Failed to fetch quiz with questions" });
    }
  };

  // API Routes
  app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
  app.get("/api/quizzes/:quizId/full", getQuizWithQuestions);
}
