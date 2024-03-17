import User from "../models/User.js";
import { generateUsername } from "../utils/helpers.js";
import "dotenv/config";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { signToken } from "../helpers/jwt.js";
import CustomError from "../utils/CustomeError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { createSendResponse } from "./authController.js";
import { filterReqObj } from "../helpers/filterObj.js";

// @desc    Get ALL user
// @route   GET /api/v1/users
// @access  Public

export const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: { users },
  });
});

// @desc    updatePassword
// @route   PATCH /api/v1/user/updatePassword
// @access  Public

export const updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (
    !(await user.comparePasswordInDb(req.body.currentPassword, user.password))
  ) {
    const error = new CustomError(
      "The current password you provided is wrong",
      401
    );
    return next(error);
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordChangedAt = Date.now();
  await user.save();
  createSendResponse(user, 200, res);
});

// @desc    updateMe
// @route   PATCH /api/v1/user/updateMe
// @access  Public

export const updateMe = asyncErrorHandler(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    const error = new CustomError("Cannot update password", 400);
    return next(error);
  }

  const filterObj = filterReqObj(
    req.body,
    "fullname",
    "email",
    "bio",
    "profileImage"
  );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterObj, {
    runValidators: false,
    context: "query",
    new: true,
  });

  let user = await updatedUser.save();

  res.status(200).json({
    status: "success",
    data: { user },
    updatedData: { filterObj },
  });
});

// @desc    getMe
// @route   GET /api/v1/user/getMe
// @access  Public

export const getMe = asyncErrorHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: { user },
  });
});
