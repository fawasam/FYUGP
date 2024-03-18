import express from "express";
const router = express.Router();

import {
  createCollege,
  addDepartments,
  addcourse,
  getAllColleges,
  searchColleges,
  getACollege,
  updateCollege,
} from "../controllers/collegeController.js";
import { protect, restrict } from "../controllers/authController.js";

router.get("/", getAllColleges);
router.get("/:id", getACollege);
router.get("/search/:searchKey", searchColleges);
router.post("/create-college", protect, restrict("superAdmin"), createCollege);
router.patch(
  "/update-college/:id",
  protect,
  restrict("admin", "collegeAdmin"),
  updateCollege
);
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
