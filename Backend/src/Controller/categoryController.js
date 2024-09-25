import Category from "../Model/categoryModel.js";
import { StatusCodes } from "http-status-codes";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Category name and description are required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Category already exists" });
    }

    const newCategory = new Category({ name, description });
    const categoryData = await newCategory.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Category created successfully",
      data: categoryData,
    });
  } catch (error) {
    console.error("error :>> ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories || categories.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Categories not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Category not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        message: "Category fetched successfully",
        data: category,
      });
  } catch (error) {
    console.error("error :>> ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
