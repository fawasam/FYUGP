import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";

import {
  createProgram,
  updateProgram,
  getAProgram,
  getAllProgram,
} from "../controllers/departmentController.js";

router.route("/").post(protect, restrict("collegeAdmin"), createProgram);
router.get("/all", getAllProgram);
router
  .route("/:id")
  .get(getAProgram)
  .patch(protect, restrict("collegeAdmin"), updateProgram);

export default router;
