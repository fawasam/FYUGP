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
  publishCollege,
} from "../controllers/collegeController.js";
import { protect, restrict } from "../controllers/authController.js";
router.get("/", getAllColleges);
router.post("/:id/publish", protect, publishCollege);
router.get("/:id", getACollege);
router.get("/search/:searchKey", searchColleges);
router.post("/create-college", protect, restrict("admin"), createCollege);
router.patch(
  "/update-college/:id",
  protect,
  restrict("collegeAdmin", "admin"),
  updateCollege
);
router.post(
  "/add-department/:collegeId",
  protect,
  restrict("collegeAdmin"),
  addDepartments
);
router.post(
  "/add-course/:collegeId/:departmentId",
  protect,
  restrict("collegeAdmin"),
  addcourse
);
export default router;
