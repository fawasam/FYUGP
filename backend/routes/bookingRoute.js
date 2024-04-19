import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";
import {
  createBooking,
  getAllBookingByAdvisor,
} from "../controllers/bookingController.js";

router.route("/").post(createBooking);
router.route("/:advisorId/all").get(getAllBookingByAdvisor);
// router.route("/all").get(getAllAdvisor);
// router.route("/:id/available").post(changeAvailabilityOfAdvisor);
// router
//   .route("/:id")
//   .get(getAdvisor)
//   .patch(updateAdvisor)
//   .delete(deleteAdvisorById);
// router.route("/:collegeId/all").get(getAllAdvisorByCollege);

export default router;
