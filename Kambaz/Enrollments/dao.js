// import { v4 as uuidv4 } from "uuid";

// export default function EnrollmentsDao(db) {

//   function enrollUserInCourse(userId, courseId) {
//     const { enrollments } = db;
//     enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
//   }

//   function unenrollUserFromCourse(userId, courseId) {
//     const { enrollments } = db;
//     db.enrollments = enrollments.filter(
//       (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
//     );
//   }

//   function findEnrollmentsForUser(userId) {
//     const { enrollments } = db;
//     return enrollments.filter((enrollment) => enrollment.user === userId);
//   }

//   function findAllEnrollments() {
//     return db.enrollments;
//   }

//   return {
//     enrollUserInCourse,
//     unenrollUserFromCourse,
//     findEnrollmentsForUser,
//     findAllEnrollments,
//   };
// }

import model from "./model.js";

export default function EnrollmentsDao(db) {

  //aka findCoursesForUser
  async function findEnrollmentsForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  }

  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function unenrollAllUsersFromCourse(courseId) {
   return model.deleteMany({ course: courseId });
 }

  return {
    // findCoursesForUser,
    findEnrollmentsForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
