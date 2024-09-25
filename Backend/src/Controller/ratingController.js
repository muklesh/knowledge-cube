import { StatusCodes } from "http-status-codes";
import User from "../Model/userModel.js";
import Rating from "../Model/ratingModel.js";
import Role from "../Model/roleModel.js";
import Course from "../Model/courseModel.js";

export const AddRating = async (req, res) => {
  try {
    const { courseId, userId, rating } = req.body;

    // Check if the user with the provided userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch the user's role
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
        message: "Creators are not allowed to post ratings",
      });
    }

    // Check if the user has already posted a rating for this course
    const existingRating = await Rating.findOne({ courseId, userId });
    if (existingRating) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You have already posted a rating for this course",
      });
    }

    // Validate the provided rating value
    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid rating value. Rating must be between 0 and 5",
      });
    }

    // Create a new rating and save it to the database
    const newRating = new Rating({ courseId, userId, rating: parsedRating });
    await newRating.save();
    const course = await Course.findById(courseId);
    course.ratings.push(newRating._id);
    await course.save();

    // Return the created rating in the response
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Rating added successfully",
      rating: newRating,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const GetAllRatingsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.query;

    // Validate courseId
    if (!courseId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "CourseId is required",
      });
    }

    // Fetch ratings by courseId and populate user and course information
    const ratings = await Rating.find({ courseId })
      .populate({
        path: "userId",
        model: User,
      })
      .populate({
        path: "courseId",
        model: Course,
      });

    if (!ratings || ratings.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No ratings found for the given course",
      });
    }

    // Calculate the average rating
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.status(StatusCodes.OK).json({
      success: true,
      ratings,
      averageRating,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch ratings",
    });
  }
};
