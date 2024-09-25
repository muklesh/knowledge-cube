
import express from 'express'
import { CreateReview, GetReviewsByCourseId } from "../Controller/reviewController.js";


const router = express.Router();

router.get('/get-reviews',GetReviewsByCourseId);
router.post('/create-review',CreateReview);

export default router;