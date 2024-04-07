import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";
import {
  createAdvisor,
  getAllAdvisorByCollege,
  getAllAdvisor,
  getAdvisor,
  updateAdvisor,
  deleteAdvisorById,
  changeAvailabilityOfAdvisor,
} from "../controllers/advisorController.js";

router.route("/").post(createAdvisor);
router.route("/all").get(getAllAdvisor);
router.route("/:id/available").post(changeAvailabilityOfAdvisor);
router
  .route("/:id")
  .get(getAdvisor)
  .patch(updateAdvisor)
  .delete(deleteAdvisorById);
router.route("/:collegeId/all").get(getAllAdvisorByCollege);

export default router;
