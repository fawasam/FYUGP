import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  forgotPassword,
  passwordReset,
  protect,
  restrict,
  generateCollegeCredentials,
  generateDepartmentCredentials,
  generateAdvisorCredentials,
} from "../controllers/authController.js";

router.route("/signup").post(registerUser);
router
  .route("/signup/college")
  .post(protect, restrict("admin"), generateCollegeCredentials);
router
  .route("/signup/department")
  .post(protect, restrict("collegeAdmin"), generateDepartmentCredentials);
router
  .route("/signup/advisor")
  .post(protect, restrict("collegeAdmin"), generateAdvisorCredentials);

router.route("/login").post(loginUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(passwordReset);
// router.route("/logout").post(authController.logout);

export default router;
