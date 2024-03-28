import express from "express";
const router = express.Router();

import {
  createCourse,
  updateCourse,
  getACourse,
  getAllCourse,
  getAllCourseByProgram,
  mergeSimilarCourse,
} from "../controllers/courseController.js";
import { protect, restrict } from "../controllers/authController.js";

router
  .route("/:programId")
  .post(protect, restrict("collegeAdmin"), createCourse);

router.route("/all/:programId").get(getAllCourseByProgram);
router
  .route("/:programId/:courseId")
  .patch(protect, restrict("collegeAdmin"), updateCourse);
router.route("/all-course").get(getAllCourse);
router.route("/:id").get(getACourse);
router.route("/merge").get(mergeSimilarCourse);

export default router;
