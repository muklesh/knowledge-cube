import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true
    },
    comment: {
      type: String,
      required:false,
    },
 
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
