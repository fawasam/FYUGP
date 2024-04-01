import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";
import {
  createEnquiry,
  getAllEnquiry,
  getEnquiry,
  readEnquiry,
} from "../controllers/enquiryController.js";

router.route("/").post(createEnquiry);
router.route("/:id").patch(readEnquiry);
router.route("/all").get(getAllEnquiry);
router.route("/:id").get(getEnquiry);

export default router;
