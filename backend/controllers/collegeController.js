import College from "../models/College.js";
import "dotenv/config";
import mongoose, { model } from "mongoose";
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
import { Department } from "../models/Department.js";
import Course from "../models/Course.js";

// @desc    Create new college
// @route   POST /api/users
// @access  Public

export const createCollege = asyncErrorHandler(async (req, res, next) => {
  const { collegename, place, pincode, phone, departments, email } = req.body;

  if (!collegename || !place || !email) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const existCollege = await User.findOne({ collegename }).select("+password");
  if (existCollege) {
    const error = new CustomError("College already exist", 400);
    return next(error);
  }

  const existUser = await User.findOne({ email }).select("+password");
  if (existUser) {
    const error = new CustomError("Email already exist", 400);
    return next(error);
  }

  const newCollege = await College.create({
    ...req.body,
    user: req.user._id,
  });
  if (newCollege) {
    return res
      .status(200)
      .json({ message: "College created successfully", newCollege });
  }
});

// @desc    updateCollege
// @route    GET /api/collge/update-college/:id
// @access  Public

export const updateCollege = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const filterObj = filterReqObj(
    req.body,
    "collegename",
    "place",
    "pincode",
    "phone",
    "picture",
    "email",
    "website",
    "about"
  );

  const updatedCollege = await College.findByIdAndUpdate(id, filterObj, {
    runValidators: false,
    context: "query",
    new: true,
  });

  let college = await updatedCollege.save();

  res.status(200).json({
    status: "success",
    data: { college },
    updatedData: { filterObj },
  });
});

// @desc    Add department to college
// @route   POST /api/users
// @access  Public

export const addDepartments = asyncErrorHandler(async (req, res, next) => {
  const { Dname, headOfDepartment, coursesOffered } = req.body;

  const collegeId = req.params.collegeId;
  if (!Dname || !headOfDepartment) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const college = await College.findById(collegeId);
  if (!college) {
    const error = new CustomError("College not found!", 400);
    return next(error);
  }

  const existingDepartment = college.departments.find(
    (department) => department.Dname === Dname
  );

  if (existingDepartment) {
    const error = new CustomError(
      "Department with the same name already exists!",
      400
    );
    return next(error);
  }

  const newDepartment = new Department(req.body);
  college.departments.push(newDepartment);
  await newDepartment.save();
  await college.save();
  if (newDepartment) {
    return res
      .status(200)
      .json({ message: "Department added successfully", newDepartment });
  }
});

// @desc    Add Course to department
// @route   POST /api/users
// @access  Public

export const addcourse = asyncErrorHandler(async (req, res, next) => {
  const { Cname, category, semester } = req.body;

  const departmentId = req.params.departmentId;

  if (!Cname || !category || !semester || !departmentId) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  let department = await Department.findOne({ _id: departmentId });

  if (!department) {
    const error = new CustomError("No Department found please create", 400);
    return next(error);
  }
  const course = await Course.create({
    ...req.body,
    department: [department],
  });

  department.coursesOffered.push(course._id);
  await department.save();

  return res.status(200).json({ message: "Course added successfully", course });
});

// @desc    Get all college
// @route   GET /api/collge
// @access  Public

export const getAllColleges = asyncErrorHandler(async (req, res, next) => {
  const colleges = await College.find().populate({
    path: "departments",
    populate: { path: "coursesOffered" },
  });
  res.status(200).json({
    status: "success",
    result: colleges.length,
    data: { colleges },
  });
});

// @desc    Get a college
// @route   GET /api/college/id
// @access  Public

export const getACollege = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const college = await College.findById(id)
    .populate({
      path: "departments",
      populate: { path: "coursesOffered" },
    })
    .populate("advisor", "fullname email availability");
  res.status(200).json({
    status: "success",
    data: { college },
  });
});

// @desc    Search  college
// @route   GET /api/collge/search/:searchKey
// @access  Public

export const searchColleges = asyncErrorHandler(async (req, res, next) => {
  const { searchKey } = req.params;
  console.log(searchKey);
  const colleges = await College.find({
    $or: [
      { collegename: { $regex: searchKey, $options: "i" } }, // Case-insensitive name search
      { place: { $regex: searchKey, $options: "i" } }, // Case-insensitive place search
      // Add more fields as needed for searching
    ],
  }).populate({
    path: "departments",
    populate: { path: "coursesOffered" },
  });

  res.status(200).json({
    status: "success",
    result: colleges.length,
    data: { colleges },
  });
});

// @desc    publishCollege
// @route   DELETE /api/collge/delete-college/:id
// @access  Public

export const publishCollege = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const college = await College.findById(id);

  if (!college) {
    const error = new CustomError("college not found", 404);
    return next(error);
  }

  college.published = !college.published;
  await college.save();

  res.status(200).json({
    status: "success",
    data: { college },
  });
});
