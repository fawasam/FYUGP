import express from "express";
const router = express.Router();
import { protect, restrict } from "../controllers/authController.js";
import {
  createQns,
  getAllCommunityQns,
  getCommunityQns,
  createQnsComment,
  likeCommentByUser,
} from "../controllers/communityController.js";

router.route("/create").post(protect, createQns);
router.route("/:id/comment").post(protect, createQnsComment);
router.route("/all").get(getAllCommunityQns);
router.route("/:id").get(getCommunityQns);
router
  .route("/:communityId/:commentId/:userId")
  .post(protect, likeCommentByUser);

export default router;
