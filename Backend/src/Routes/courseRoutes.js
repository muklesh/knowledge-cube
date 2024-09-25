import express from "express";
import uploadMiddleware from "../middleware/vedioUpload.js";

import {
  UploadCourse,
  GetAllCourses,
  UploadChapterById,
  GetCourseById,
  GetChapterById,
  GetCoursesByCreator,
  UpdateCourseById,
  GetAllChaptersByCourseId,
  UpdateChapterById,
  deleteChapterById,
  deleteCourseById,
} from "../Controller/courseController.js";

const router = express.Router();
//create course route
router.post("/create-course", uploadMiddleware, UploadCourse);
//create chapter by id route
router.post("/courses/:courseId/chapters", uploadMiddleware, UploadChapterById);
// get-all courses route
router.get("/courses", GetAllCourses);
//get single course route
router.get("/courses/:courseId", GetCourseById);
//update course by id
router.patch("/update/:courseId", uploadMiddleware, UpdateCourseById);
//delete chapter
router.delete("/delete-course/:courseId", deleteCourseById);
//get single chapter by id
router.get("/chapters/:chapterId", GetChapterById);
//update chapter by id
router.patch("/update-chapter/:chapterId", uploadMiddleware, UpdateChapterById);

//delete chapter
router.delete("/delete-chapter/:chapterId", deleteChapterById);

//get all chapters by courseId
router.get("/chapters/:courseId", GetAllChaptersByCourseId);

//get course by creatorId
router.get("/courses/creator/:creatorId", GetCoursesByCreator);

export default router;
