import Enrollment from "../Model/enrollmentModel.js"; // Import the Enrollment model
import User from "../Model/userModel.js";
import Course from "../Model/courseModel.js";
import Role from "../Model/roleModel.js";
import { StatusCodes } from "http-status-codes";

// export const enrollUserInCourse = async (req, res) => {
//   try {
//     const { courseId, userId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ success: false, message: "User not found" });
//     }

//     const role = await Role.findById(user.role);
//     if (!role) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ success: false, message: "Role not found" });
//     }

//     // Check if the user's role is "Creator"
//     if (role.roleName === "Creator") {
//       return res.status(StatusCodes.FORBIDDEN).json({
//         success: false,
//         message: "Creators are not allowed to enroll in courses",
//       });
//     }
//     // Check if the user is already enrolled in the course
//     const existingEnrollment = await Enrollment.findOne({ courseId, userId });
//     if (existingEnrollment) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         success: false,
//         message: "User is already enrolled in this course",
//       });
//     }

//     const enrollment = new Enrollment({
//       courseId,
//       userId,
//       courseProgress: [{ courseId, chapterProgress: Array(numberOfChapters).fill(false) }],
//     });
//     await enrollment.save();
//     const course = await Course.findById(courseId);
//     course.enrollments.push(enrollment._id);
//     await course.save();

//     res.status(StatusCodes.OK).json({
//       success: true,
//       message: "User enrolled successfully",
//       enrollment,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ success: false, message: "Failed to enroll user" });
//   }
// };
export const enrollUserInCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Role not found" });
    }

    // Check if the user's role is "Creator"
    if (role.roleName === "Creator") {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Creators are not allowed to enroll in courses",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Course not found" });
    }

    const numberOfChapters = course.chapters.length;

    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ courseId, userId });
    if (existingEnrollment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User is already enrolled in this course",
      });
    }

    const enrollment = new Enrollment({
      courseId,
      userId,
      courseProgress: [
        { courseId, chapterProgress: Array(numberOfChapters).fill(false) },
      ],
    });
    await enrollment.save();

    course.enrollments.push(enrollment._id);
    await course.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User enrolled successfully",
      enrollment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to enroll user" });
  }
};

export const getEnrolledCoursesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await Enrollment.find({ userId }).populate({
      path: "courseId",
      populate: {
        path: "chapters",
      },
    });

    const enrolledCoursesWithProgress = enrollments.map((enrollment) => {
      const course = enrollment.courseId;

      const courseProgress = enrollment.courseProgress.find(
        (progress) => progress.courseId.toString() === course._id.toString()
      );

      const chapterProgress = courseProgress
        ? courseProgress.chapterProgress
        : [];

      return {
        enrollmentId: enrollment._id,
        ...course.toObject(),
        courseProgress: chapterProgress,
      };
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, enrolledCourses: enrolledCoursesWithProgress });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch enrolled courses",
    });
  }
};


export const updateEnrollment = async (req, res) => {
  const { enrollmentId, courseId, chapterIndex } = req.body;
  try {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Enrollment not found" });
    }

    const courseProgress = enrollment.courseProgress.find(
      (progress) => progress.courseId.toString() === courseId
    );
    if (!courseProgress) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Course progress not found" });
    }

    courseProgress.chapterProgress[chapterIndex] = true;
    await enrollment.save();

    res.status(StatusCodes.OK).json({ success: true, enrollment });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to update course progress" });
  }
};
