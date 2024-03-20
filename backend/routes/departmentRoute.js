import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";

import {
  createProgram,
  updateProgram,
  getAProgram,
  getAllProgram,
} from "../controllers/departmentController.js";

router
  .route("/")
  .post(protect, restrict("collegeAdmin"), createProgram)
  .patch(protect, restrict("collegeAdmin"), updateProgram)
  .get(getAllProgram);
router.route("/:id").get(getAProgram);

export default router;
