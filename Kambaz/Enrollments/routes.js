import EnrollmentsDao from "../Enrollments/dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    let { userId, courseId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    let { userId, courseId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findAllEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  };

  app.post("/api/users/:userId/enrollments/:courseId", enrollUserInCourse);
  app.delete(
    "/api/users/:userId/enrollments/:courseId",
    unenrollUserFromCourse
  );
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/enrollments", findAllEnrollments);
}
