import Chapter from "../Model/chapterModel.js";
import User from "../Model/userModel.js";
import Course from "../Model/courseModel.js";
import Category from "../Model/categoryModel.js";
import Review from "../Model/reviewModel.js";
import Rating from "../Model/ratingModel.js";
import Enrollment from "../Model/enrollmentModel.js";
import CourseFilter from "../Model/courseFilterModel.js";
import { StatusCodes } from "http-status-codes";
import ffmpeg from "fluent-ffmpeg";
import ffprobePath from "ffprobe-static";

ffmpeg.setFfprobePath(ffprobePath.path);

const getVideoDuration = (videoUrl) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoUrl, (err, metadata) => {
      if (err) {
        reject(new Error("Failed to get video duration."));
      } else {
        const durationInSeconds = metadata.format.duration;
        resolve(durationInSeconds);
      }
    });
  });
};

// API endpoint for uploading a course
export const UploadCourse = async (req, res) => {
  try {
    const {
      title,
      language,
      skillLevel,
      price,
      description,
      creatorId,
      categoryId,
    } = req.body;
    const date = new Date();
    const coverImage = req.files["coverImage"]
      ? req.files["coverImage"][0].path
      : null;
    const certificate = req.files["certificate"]
      ? req.files["certificate"][0].path
      : null;
    const assessmentPdf = req.files["assessmentPdf"]
      ? req.files["assessmentPdf"][0].path
      : null;
    const originalName = req.files["coverImage"][0].originalname
      .split(" ")
      .join("-");

    if (
      !coverImage ||
      !creatorId ||
      !certificate ||
      !assessmentPdf ||
      !categoryId
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid request. Please provide all required fields.",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid categoryId. Category not found.",
      });
    }

    const user = await User.findById(creatorId).populate("role");

    if (!user || user.role.roleName !== "Creator") {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Only creators are allowed to upload courses.",
      });
    }
    const course = await Course.create({
      title,
      coverImage,
      language,
      skillLevel,
      price,
      description,
      certificate,
      assessmentPdf,
      chapters: [],
      creatorId,
      Creator: user,
      category: category,
      user,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Course added successfully!",
      course: course,
      creator: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to add the course",
      error: error.message,
    });
  }
};


// uploading a chapter for a specific course

export const UploadChapterById = async (req, res) => {
  try {
    const { title } = req.body;
    const courseId = req.params.courseId;
    const videoUrl = req.files["video"][0].path;

    const durationInSeconds = await getVideoDuration(videoUrl);

    // Create a new Chapter document with the calculated duration
    const chapter = await Chapter.create({
      title,
      videoUrl,
      vedioDuration: durationInSeconds, // Save the duration to the Chapter model
    });
    

    // Find the course by ID and add the chapter to its chapters array
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { chapters: chapter._id } },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Chapter added successfully!",
      chapter: chapter,
      course: course,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to add the chapter",
      error: error.message,
    });
  }
};

//update chapters
export const UpdateChapterById = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;

    // Fetch the chapter by ID
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Chapter not found.",
      });
    }

    // Apply updates from req.body to the chapter object
    Object.keys(req.body).forEach((update) => {
      chapter[update] = req.body[update];
    });
    if (req.files && req.files["video"]) {
      chapter.videoUrl = req.files["video"][0].path;
    }

    // Save the updated chapter
    await chapter.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Chapter updated successfully!",
      chapter: chapter,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update the chapter.",
      error: error.message,
    });
  }
};

//delete course by id
export const deleteCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Course deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete the course",
      error: error.message,
    });
  }
};

export const deleteChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

    if (!deletedChapter) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Chapter not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Chapter deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete the chapter",
      error: error.message,
    });
  }
};

// get all courses
export const GetAllCourses = async (req, res) => {
  try {
    const { searchQuery, priceRange, category } = req.query;

    let filters = {};

    if (searchQuery) {
      filters.title = { $regex: searchQuery, $options: "i" };
    }

    if (req.query.priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");

      if (minPrice && maxPrice) {
        filters.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
      } else if (minPrice) {
        filters.price = { $gte: parseInt(minPrice) };
      } else if (maxPrice) {
        filters.price = { $lte: parseInt(maxPrice) };
      }
    }
    if (req.query.category) {
      filters.category = req.query.category;
    }
    const courses = await Course.find(filters)
      .populate("category")
      .populate({
        path: "chapters",
        model: "Chapter",
      })

      .populate({
        path: "reviews",
        model: "Review",
      })
      .populate({
        path: "enrollments",
        model: "Enrollment",
      })
      .populate({
        path: "ratings",
        model: "Rating",
      })
      .populate({
        path: "user",
        model: "User",
        populate: {
          path: "role",
          model: "Role",
        },
      });

    return res.status(StatusCodes.OK).json({
      success: true,
      courses: courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve courses",
      error: error.message,
    });
  }
};

// API endpoint for getting a single course by ID
export const GetCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId)
      .populate({
        path: "chapters",
        model: "Chapter",
      })
      .populate({
        path: "enrollments",
        model: "Enrollment",
      })
      .populate({
        path: "reviews",
        model: "Review",
      })
      .populate({
        path: "ratings",
        model: "Rating",
      })
      .populate("category")
      .populate({
        path: "user",
        model: "User",
        populate: {
          path: "role",
          model: "Role",
        },
      })
      .exec();

    if (!course) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      course: course,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve the course",
      error: error.message,
    });
  }
};

//API to update course
export const UpdateCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Fetch the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Apply updates from req.body to the course object
    Object.keys(req.body).forEach((update) => {
      course[update] = req.body[update];
    });
    if (req.files && req.files["coverImage"]) {
      course.coverImage = req.files["coverImage"][0].path;
    }
    if (req.files && req.files["certificate"]) {
      course.certificate = req.files["certificate"][0].path;
    }
    if (req.files && req.files["assessmentPdf"]) {
      course.assessmentPdf = req.files["assessmentPdf"][0].path;
    }
    // Save the updated course
    await course.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Course updated successfully!",
      course: course,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update the course.",
      error: error.message,
    });
  }
};

export const GetCoursesByCreator = async (req, res) => {
  try {
    const creatorId = req.params.creatorId;
    const searchQuery = req.query.searchQuery;
    let courses;
    if (searchQuery) {
      // If search query is provided, filter courses based on the query
      courses = await Course.find({
        creatorId,
        $or: [
          { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for course title
          { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search for course description
        ],
      });
    } else {
      courses = await Course.find({ creatorId })
        .populate({
          path: "chapters",
          model: "Chapter",
        })
        .populate({
          path: "enrollments",
          model: "Enrollment",
        })
        .populate({
          path: "reviews",
          model: "Review",
        })
        .populate({
          path: "ratings",
          model: "Rating",
        })
        .populate("category")
        .populate({
          path: "user",
          model: "User",
          populate: {
            path: "role",
            model: "Role",
          },
        });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      courses: courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve courses by creator",
      error: error.message,
    });
  }
};

//get chapters by courseId
export const GetAllChaptersByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapters = await Chapter.find({ courseId: courseId });

    if (!chapters || chapters.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Chapters not found for the given course.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      chapters: chapters,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve chapters",
      error: error.message,
    });
  }
};



// API endpoint for getting a single chapter by ID
export const GetChapterById = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Chapter not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      chapter: chapter,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve the chapter",
      error: error.message,
    });
  }
};
