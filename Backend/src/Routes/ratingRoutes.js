import express from "express";
import {
  AddRating,
  GetAllRatingsByCourseId,
} from "../Controller/ratingController.js";

const router = express.Router();

router.get("/get-ratings", GetAllRatingsByCourseId);
router.post("/add-rating", AddRating);

export default router;
