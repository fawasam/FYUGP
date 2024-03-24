import express from "express";
const router = express.Router();

import {
  createCourse,
  updateCourse,
  getACourse,
  getAllCourse,
  getAllCourseByProgram,
} from "../controllers/courseController.js";
import { protect, restrict } from "../controllers/authController.js";

router
  .route("/:programId")
  .post(protect, restrict("collegeAdmin"), createCourse);

router.route("/:programId").get(getAllCourseByProgram);
router
  .route("/:programId/:courseId")
  .patch(protect, restrict("collegeAdmin"), updateCourse);
router.route("/all").get(getAllCourse);
router.route("/:id").get(getACourse);

export default router;
