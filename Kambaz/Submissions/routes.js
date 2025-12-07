import SubmissionsDao from "../Submissions/dao.js";

export default function SubmissionsRoutes(app, db) {
  const submissionsDao = SubmissionsDao();

  const submitQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const { studentId, courseId, answers, score, attemptNumber, results } =
        req.body;

      if (!studentId || !quizId || !answers || !score || !results) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const submission = await submissionsDao.createSubmission({
        studentId,
        quizId,
        courseId,
        answers,
        score,
        attemptNumber,
        results,
      });

      res.status(201).json(submission);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      res.status(500).json({ error: "Failed to submit quiz" });
    }
  };
  
  // Get all submissions for a student on a specific quiz
  const getStudentSubmissions = async (req, res) => {
    try {
      const { quizId, studentId } = req.params;

      if (!studentId || !quizId) {
        return res.status(400).json({ error: "Missing studentId or quizId" });
      }

      const submissions = await submissionsDao.getStudentSubmissionsForQuiz(
        studentId,
        quizId
      );

      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  };

  // Get latest submission for a student on a specific quiz
  const getLatestSubmission = async (req, res) => {
    try {
      const { quizId, studentId } = req.params;

      if (!studentId || !quizId) {
        return res.status(400).json({ error: "Missing studentId or quizId" });
      }

      const submission = await submissionsDao.getLatestSubmission(
        studentId,
        quizId
      );

      if (!submission) {
        return res.status(404).json({ error: "No submissions found" });
      }

      res.json(submission);
    } catch (error) {
      console.error("Error fetching latest submission:", error);
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  };

  // Get all submissions for a quiz (faculty/admin view)
  const getAllSubmissions = async (req, res) => {
    try {
      const { quizId } = req.params;

      if (!quizId) {
        return res.status(400).json({ error: "Missing quizId" });
      }

      const submissions = await submissionsDao.getAllSubmissionsForQuiz(quizId);

      res.json(submissions);
    } catch (error) {
      console.error("Error fetching all submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  };

  // Count attempts for a student on a quiz
  const getAttemptCount = async (req, res) => {
    try {
      const { quizId, studentId } = req.params;

      if (!studentId || !quizId) {
        return res.status(400).json({ error: "Missing studentId or quizId" });
      }

      const count = await submissionsDao.countStudentAttempts(
        studentId,
        quizId
      );

      res.json({ attemptCount: count });
    } catch (error) {
      console.error("Error counting attempts:", error);
      res.status(500).json({ error: "Failed to count attempts" });
    }
  };

  // Get a specific submission
  const getSubmission = async (req, res) => {
    try {
      const { submissionId } = req.params;

      const submission = await submissionsDao.getSubmissionById(submissionId);

      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      res.json(submission);
    } catch (error) {
      console.error("Error fetching submission:", error);
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  };

  // Delete a submission
  const deleteSubmission = async (req, res) => {
    try {
      const { submissionId } = req.params;

      const result = await submissionsDao.deleteSubmission(submissionId);

      res.json(result);
    } catch (error) {
      console.error("Error deleting submission:", error);
      res.status(500).json({ error: "Failed to delete submission" });
    }
  };

  // API Routes
  app.post("/api/quizzes/:quizId/submit", submitQuiz);
  app.get(
    "/api/quizzes/:quizId/submissions/student/:studentId",
    getStudentSubmissions
  );
  app.get(
    "/api/quizzes/:quizId/submissions/latest/:studentId",
    getLatestSubmission
  );
  app.get("/api/quizzes/:quizId/submissions", getAllSubmissions);
  app.get("/api/quizzes/:quizId/attempts/:studentId", getAttemptCount);
  app.get("/api/submissions/:submissionId", getSubmission);
  app.delete("/api/submissions/:submissionId", deleteSubmission);
}
