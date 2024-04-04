import express from "express";
const router = express.Router();
import {
  getAllUsers,
  updatePassword,
  updateMe,
  getMe,
  deleteUser,
  activeUser,
} from "../controllers/userController.js";
import { restrict, protect } from "../controllers/authController.js";
import { chatWithBot } from "../controllers/botController.js";

router.route("/users").get(protect, restrict("admin"), getAllUsers);
router.route("/user/updatePassword").patch(protect, updatePassword);
router.route("/user/updateMe").patch(protect, updateMe);
router.route("/user/getMe").get(protect, getMe);
router.route("/user/chat").get(protect, chatWithBot);
router.route("/user/:userId").delete(protect, restrict("admin"), deleteUser);
router
  .route("/user/:userId/active")
  .post(protect, restrict("admin"), activeUser);

export default router;
