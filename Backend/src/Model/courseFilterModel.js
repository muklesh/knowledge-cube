import mongoose from "mongoose";

const courseFilterSchema = new mongoose.Schema(
  {
    price: {
      type: Boolean,
    },
    category: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const CourseFilter = new mongoose.model("CourseFilter", courseFilterSchema);

export default CourseFilter;
