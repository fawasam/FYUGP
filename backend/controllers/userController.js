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
import College from "../models/College.js";
import Enquiry from "../models/Enquiry.js";
import Advisor from "../models/Advisor.js";

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

  const { discipline, pathway, currentCollege } = req?.body;

  const filterObj = filterReqObj(
    req.body,
    "fullname",
    "email",
    "bio",
    "profileImage",
    "place",
    "district"
  );
  console.log(filterObj);
  let newData = { ...filterObj };
  if (discipline || pathway) {
    newData = {
      ...filterObj,
      "degree_info.discipline": discipline,
      "degree_info.pathway": pathway,
      "degree_info.currentCollege": currentCollege,
    };
  }

  console.log(newData);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, newData, {
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

// @desc    DeleteUser
// @route   DELETE /api/v1/user/:id
// @access  Public

export const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);

  const deletedUser = await User.findByIdAndDelete(userId);

  console.log(deletedUser);
  res.status(200).json({
    status: "success",
    data: { deletedUser },
  });
});

// @desc    DeleteUser
// @route   DELETE /api/v1/user/:id
// @access  Public

export const activeUser = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    const error = new CustomError("user not found", 404);
    return next(error);
  }

  user.active = !user.active;
  await user.save();
  res.status(200).json({
    status: "success",
    data: user.active,
  });
});

// @desc    getAllDataCount
// @route   DELETE /api/v1/user/:id
// @access  Public

export const getAllDataCount = asyncErrorHandler(async (req, res, next) => {
  const users = await User.estimatedDocumentCount();
  const colleges = await College.estimatedDocumentCount();
  const enquiries = await Enquiry.estimatedDocumentCount();
  const advisors = await Advisor.estimatedDocumentCount();

  res.status(200).json({
    status: "success",
    data: {
      users,
      colleges,
      enquiries,
      advisors,
    },
  });
});
