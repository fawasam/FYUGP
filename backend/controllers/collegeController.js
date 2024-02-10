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
  const { collegename, place, pincode, phone, departments } = req.body;

  if (!collegename || !place) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  // try {
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
  const colleges = await College.find({})
    // .populate({
    //   path: "departments",
    //   populate: { path: "coursesOffered", model: "Course" },
    // })
    .populate({
      path: "departments.coursesOffered",
    })
    .exec();

  res.status(200).json({
    status: "success",
    result: colleges.length,
    data: { colleges },
  });
});
