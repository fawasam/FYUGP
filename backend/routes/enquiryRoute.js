import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";
import {
  createEnquiry,
  getAllEnquiry,
  getEnquiry,
  readEnquiry,
  getAllNewEnquiry,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

router.route("/").post(createEnquiry);
router
  .route("/:id")
  .patch(readEnquiry)
  .delete(deleteEnquiry)
  .get(getAllEnquiry);
router.route("/all").get(getAllEnquiry);
router.route("/new").get(getAllNewEnquiry);

export default router;
