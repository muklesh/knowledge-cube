import express from "express";
import {
  getAllRole,
  createRole,
  getRoleById,
} from "../Controller/roleController.js";

const router = express.Router();

router.post("/add-role", createRole);
router.get("/get-role", getAllRole);
router.get("/get-role:id", getRoleById);

export default router;
