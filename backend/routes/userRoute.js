import express from "express";
const router = express.Router();
import {
  getAllUsers,
  updatePassword,
  updateMe,
} from "../controllers/userController.js";
import { restrict, protect } from "../controllers/authController.js";

router.route("/users").get(protect, restrict("admin"), getAllUsers);
router.route("/user/updatePassword").patch(protect, updatePassword);
router.route("/user/updateMe").patch(protect, updateMe);

export default router;
