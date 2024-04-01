import User from "../models/User.js";
import { generateUsername } from "../utils/helpers.js";
import "dotenv/config";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { signToken } from "../helpers/jwt.js";
import CustomError from "../utils/CustomeError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateRandomPassword } from "../utils/generateRandomPassword.js";
import { Department } from "../models/Department.js";
import College from "../models/College.js";
import { filterReqObj } from "../helpers/filterObj.js";
import Enquiry from "../models/Enquiry.js";

// @desc    createEnquiry
// @route   POST /api/v1/Enquiry
// @access  Private

export const createEnquiry = asyncErrorHandler(async (req, res, next) => {
  const { subject, message, email } = req.body;

  if (!subject || !message || !email) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const newEnquiry = await Enquiry.create({
    ...req.body,
    // user: req.user._id,
  });

  if (newEnquiry) {
    return res
      .status(200)
      .json({ message: "Enquiry created successfully", data: newEnquiry });
  }
});

// @desc    getAllEnquiry
// @route   POST /api/v1/Enquiry/all
// @access  Public

export const getAllEnquiry = asyncErrorHandler(async (req, res, next) => {
  const enquiries = await Enquiry.find();
  res.status(200).json({
    status: "success",
    result: enquiries.length,
    data: { enquiries },
  });
});

// @desc    getAEnquiry
// @route   POST /api/v1/Enquiry/id
// @access  Public

export const getEnquiry = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const enquiry = await Enquiry.findById(id);
  res.status(200).json({
    status: "success",
    data: { enquiry },
  });
});

// @desc    readEnquiry
// @route   PATCH api/v1/Enquiry/:id
// @access  Public

export const readEnquiry = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    const error = new CustomError("Enquiry not found", 404);
    return next(error);
  }

  enquiry.isReaded = true;
  await enquiry.save();

  res.status(200).json({
    status: "success",
    data: { enquiry },
  });
});
