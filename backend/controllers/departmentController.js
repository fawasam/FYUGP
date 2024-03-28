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
import mongoose from "mongoose";
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// @desc    createProgram
// @route   POST /api/v1/college/program
// @access  Private

export const createProgram = asyncErrorHandler(async (req, res, next) => {
  const { Dname, headOfDepartment, Discipline } = req.body;

  if (!Dname || !headOfDepartment || !Discipline) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const college = await College.findById(req.user.college);

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

  const newProgram = await Department.create({
    ...req.body,
    user: req.user._id,
  });
  college.departments.push(newProgram._id);
  await college.save();
  if (newProgram) {
    return res
      .status(200)
      .json({ message: "Program created successfully", newProgram });
  }
});

// @desc    updateProgram
// @route   PATCH /api/v1/college/program/:id
// @access  Private

export const updateProgram = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const filterObj = filterReqObj(
    req.body,
    "Dname",
    "headOfDepartment",
    "Discipline"
  );

  const updatedProgram = await Department.findByIdAndUpdate(id, filterObj, {
    runValidators: false,
    context: "query",
    new: true,
  });
  let program = await updatedProgram.save();

  res.status(200).json({
    status: "success",
    data: { program },
    updatedData: { filterObj },
  });
});

// @desc    getAProgram
// @route   GET /api/v1/college/program/:id
// @access  Public

export const getAProgram = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const isId = mongoose.Types.ObjectId.isValid(id);
  let program;
  if (isId) {
    program = await Department.findById(id).populate({
      path: "coursesOffered",
    });
  } else {
    program = await Department.findOne({ Dname: id }).populate({
      path: "coursesOffered",
    });
  }

  if (!program) {
    const error = new CustomError("Program not found", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: { program },
  });
});

// @desc    getAllProgram
// @route   GET /api/v1/college/program/all
// @access  Public

export const getAllProgram = asyncErrorHandler(async (req, res, next) => {
  const programs = await Department.find();
  res.status(200).json({
    status: "success",
    result: programs.length,
    data: { programs },
  });
});

// @desc    getAllProgram offered by a college
// @route   GET /api/v1/college/program/:id
// @access  Public

export const getAllProgramByCollege = asyncErrorHandler(
  async (req, res, next) => {
    const collegeId = req.params.collegeId;

    const college = await College.findById(collegeId);

    if (!college) {
      const error = new CustomError("College not found", 404);
      return next(error);
    }
    const programs = await Department.find({
      _id: { $in: college.departments },
    });

    res.status(200).json({
      status: "success",
      result: programs.length,
      data: { programs },
    });
  }
);
