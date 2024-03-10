import express from "express";
const router = express.Router();

import {
  createCollege,
  addDepartments,
  addcourse,
  getAllColleges,
  searchColleges,
} from "../controllers/collegeController.js";
import { protect, restrict } from "../controllers/authController.js";

router.get("/", getAllColleges);
router.get("/search/:searchKey", searchColleges);
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

export default router;
