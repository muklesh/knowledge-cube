import express from "express";
import {createCategory, getAllCategories, getCategoryById} from "../Controller/categoryController.js"

const router = express.Router();

router.post("/create-category", createCategory);

router.get("/get-categories", getAllCategories);

router.get("/get-cat/:categoryId", getCategoryById);

export default router;
