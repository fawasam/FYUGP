import express from "express";
const router = express.Router();

import {
  createCollege,
  addDepartments,
  addcourse,
  getAllColleges,
} from "../controllers/collegeController.js";
import { protect, restrict } from "../controllers/authController.js";

router.post("/create-college", protect, restrict("college"), createCollege);
router.post(
  "/add-department/:collegeId",
  protect,
  restrict("college"),
  addDepartments
);
router.post(
  "/add-course/:collegeId/:departmentId",
  protect,
  restrict("college"),
  addcourse
);
router.get("/", getAllColleges);

export default router;
