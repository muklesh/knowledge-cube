import express from "express";
import {
  enrollUserInCourse,
  getEnrolledCoursesByUserId,
  updateEnrollment,
} from "../Controller/enrollmentController.js";

const router = express.Router();

router.post("/add-enrollment", enrollUserInCourse);
router.get("/user-enrolled-courses/:userId", getEnrolledCoursesByUserId);
router.put("/enrollment/update-progress", updateEnrollment)
export default router;
