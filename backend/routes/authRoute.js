import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  forgotPassword,
  passwordReset,
  protect,
  restrict,
} from "../controllers/authController.js";

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(passwordReset);
// router.route("/logout").post(authController.logout);

export default router;
