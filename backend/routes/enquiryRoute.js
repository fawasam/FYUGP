import express from "express";
const router = express.Router();

import { createEnquiry } from "../controllers/enquiryController.js";

router.route("/").post(createEnquiry);

export default router;
