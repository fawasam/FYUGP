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
import College from "../models/College.js";
import Advisor from "../models/Advisor.js";
import { filterReqObj } from "../helpers/filterObj.js";
import { log } from "console";
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// @desc    createAdvisor
// @route   POST /api/v1/college/program/course/programId
// @access  Private

export const createAdvisor = asyncErrorHandler(async (req, res, next) => {
  const { fullname, user, collegeId, email } = req.body;
  console.log(fullname, user);
  console.log(req.user);

  if (!fullname || !user || !collegeId || !email) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }
  const college = await College.findById(collegeId);
  if (!college) {
    const error = new CustomError("College not found!", 400);
    return next(error);
  }

  const newAdvisor = await Advisor.create({
    ...req.body,
    college: college._id,
  });

  college?.advisor?.push(newAdvisor._id);
  await college.save();
  if (newAdvisor) {
    return res
      .status(200)
      .json({ message: "Advisor created successfully", newAdvisor });
  }
});

// @desc    getAllCourseByProgram  offered by a college
// @route   GET /api/v1/college/program/course/programId
// @access  Public

export const getAllAdvisorByCollege = asyncErrorHandler(
  async (req, res, next) => {
    const collegeId = req.params.collegeId;

    const college = await College.findById(collegeId).populate("advisor"); // Assuming advisor is the field in college schema referencing advisors

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    const advisors = college.advisor;

    res.status(200).json({
      status: "success",
      result: advisors.length,
      data: { advisors },
    });
  }
);

// @desc    getAllAdvisor
// @route   GET /api/v1/college/program/all
// @access  Public

export const getAllAdvisor = asyncErrorHandler(async (req, res, next) => {
  const advisors = await Advisor.find().populate({ path: "college" });
  res.status(200).json({
    status: "success",
    result: advisors.length,
    data: { advisors },
  });
});

// @desc    getAdvisor
// @route   GET /api/v1/college/program/:id
// @access  Public

export const getAdvisor = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const isId = mongoose.Types.ObjectId.isValid(id);
  let advisor;
  if (isId) {
    advisor = await Advisor.findById(id).populate({
      path: "user",
    });
  } else {
    advisor = await Advisor.findOne({ Dname: id }).populate({
      path: "user",
    });
  }

  if (!advisor) {
    const error = new CustomError("advisor not found", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: { advisor },
  });
});

// @desc    updateAdvisor
// @route   PATCH /api/v1/college/program/:id
// @access  Private

export const updateAdvisor = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const filterObj = filterReqObj(req.body, "availability", "fullname", "email");

  const updatedAdvisor = await Advisor.findByIdAndUpdate(id, filterObj, {
    runValidators: false,
    context: "query",
    new: true,
  });
  let advisor = await updatedAdvisor.save();

  res.status(200).json({
    status: "success",
    data: { advisor },
    updatedData: { filterObj },
  });
});

// @desc    deleteAdvisorById
// @route   PATCH /api/v1/college/program/:id
// @access  Private

export const deleteAdvisorById = asyncErrorHandler(async (req, res, next) => {
  const advisor = await Advisor.findById(req.params.id);
  if (!advisor) {
    throw new CustomError("Advisor not found", 404);
  }

  const college = await College.findById(advisor.college);
  if (!college) {
    throw new CustomError("College not found", 404);
  }

  const advisorIndex = college.advisor.indexOf(req.params.id);
  if (advisorIndex === -1) {
    const error = new CustomError("Advisor not found in this college!", 404);
    return next(error);
  }
  college.advisor.splice(advisorIndex, 1);

  await college.save();

  await User.findByIdAndDelete(advisor.user);
  await Advisor.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Advisor deleted successfully" });
});

// @desc    changeAvailabilityOfAdvisor
// @route   DELETE /api/collge/delete-college/:id
// @access  Public

export const changeAvailabilityOfAdvisor = asyncErrorHandler(
  async (req, res, next) => {
    const { id } = req.params;

    const advisor = await Advisor.findById(id);

    if (!advisor) {
      const error = new CustomError("Advisor not found", 404);
      return next(error);
    }

    advisor.availability = !advisor.availability;
    await advisor.save();

    res.status(200).json({
      status: "success",
      data: { advisor },
    });
  }
);
