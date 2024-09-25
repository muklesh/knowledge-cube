import { StatusCodes } from "http-status-codes";
import Review from "../Model/reviewModel.js";
import User from "../Model/userModel.js";
import Role from "../Model/roleModel.js";
import Course from "../Model/courseModel.js";

export const CreateReview = async (req, res) => {
  try {
    const { courseId, userId, comment } = req.body;

    // Check if the user with the provided userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch the role information based on roleId
    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Role not found",
      });
    }

    // Check if the user's role is "Creator"
    if (role.roleName === "Creator") {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Creators are not allowed to post reviews",
      });
    }

    const existingReview = await Review.findOne({ courseId, userId });

    if (existingReview) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You have already posted a review for this course",
      });
    }

    const review = new Review({
      courseId,
      userId,
      comment,
    });

    await review.save();
    const course = await Course.findById(courseId);
    course?.reviews?.push(review._id);
    await course.save();

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Review added successfully", review });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to add review" });
  }
};

export const GetReviewsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "CourseId is required" });
    }

    // Fetch reviews by courseId
    const reviews = await Review.find({ courseId }) .populate({
      path: "user",
      model: "User",
      populate: {
        path: "role",
        model: "Role",
      },
    })

    // .populate({
    //   path: "chapters",
    //   model: "Chapter",
    // })

    if (!reviews || reviews.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No reviews found for the given course",
      });
    }

    res.status(StatusCodes.OK).json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};
