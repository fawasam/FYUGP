import User from "../models/User.js";
import { generateUsername } from "../utils/helpers.js";
import "dotenv/config";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { signToken } from "../helpers/jwt.js";
import CustomError from "../utils/CustomeError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import College from "../models/College.js";
import { Department } from "../models/Department.js";
import Course from "../models/Course.js";
import { filterReqObj } from "../helpers/filterObj.js";

// @desc    createCourse
// @route   POST /api/v1/college/program/course/programId
// @access  Private

export const createCourse = asyncErrorHandler(async (req, res, next) => {
  const programId = req.params.programId;
  const { course, category, semester } = req.body;

  if (!course || !category || !semester) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const college = await College.findById(req.user.college);
  const department = await Department.findById(programId);

  if (!college) {
    const error = new CustomError("College not found!", 400);
    return next(error);
  }
  if (!department) {
    const error = new CustomError("Department not found!", 400);
    return next(error);
  }

  const existingCourse = await Course.findOne({
    "course.courseCode": course[0].courseCode,
  });
  if (existingCourse) {
    return res
      .status(400)
      .json({ error: "Course with the same course code already exists." });
  }

  if (existingCourse) {
    const error = new CustomError(
      "Course with the same name already exists!",
      400
    );
    return next(error);
  }

  const newCourse = await Course.create({
    ...req.body,
    user: req.user._id,
    department: department._id,
  });
  department?.coursesOffered?.push(newCourse._id);
  await department.save();
  if (newCourse) {
    return res
      .status(200)
      .json({ message: "Course created successfully", newCourse });
  }
});

// @desc    updateCourse
// @route   POST /api/v1/college/program/course/programId/courseId
// @access  Private

export const updateCourse = asyncErrorHandler(async (req, res, next) => {
  const { programId, courseId } = req.params;
  const filterObj = filterReqObj(
    req.body,
    "course",
    "category",
    "semester",
    "code"
  );
  const college = await College.findById(req.user.college);
  const department = await Department.findById(programId);
  const course = await Course.findById(courseId);

  if (!college) {
    const error = new CustomError("College not found!", 400);
    return next(error);
  }
  if (!department) {
    const error = new CustomError("Department not found!", 400);
    return next(error);
  }
  if (!course) {
    const error = new CustomError("Course not found!", 400);
    return next(error);
  }

  const updatedCourse = await Course.findByIdAndUpdate(courseId, filterObj, {
    runValidators: false,
    context: "query",
    new: true,
  });
  let result = await updatedCourse.save();
  res.status(200).json({
    status: "success",
    data: { result },
    updatedData: { filterObj },
  });
});

// @desc    getACourse
// @route   GET /api/v1/college/program/course/:id
// @access  Public

export const getACourse = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("Hello");
  const course = await Course.findById(id);
  res.status(200).json({
    status: "success",
    data: { course },
  });
});

// @desc    getAllcOURSE
// @route   GET /api/v1/college/program/course/all
// @access  Public

export const getAllCourse = asyncErrorHandler(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({
    status: "success",
    result: courses.length,
    data: { courses },
  });
});

// @desc    getAllCourseByProgram  offered by a college
// @route   GET /api/v1/college/program/course/programId
// @access  Public

export const getAllCourseByProgram = asyncErrorHandler(
  async (req, res, next) => {
    const programId = req.params.programId;

    const program = await Department.findById(programId);

    if (!program) {
      const error = new CustomError("Program not found", 404);
      return next(error);
    }
    const course = await Course.find({
      _id: { $in: program.coursesOffered },
    });

    res.status(200).json({
      status: "success",
      result: course.length,
      data: { course },
    });
  }
);

export const mergeSimilarCourse = asyncErrorHandler(async (req, res, next) => {
  // Query documents with the same semester and category
  const documents = await Course.aggregate([
    {
      $group: {
        _id: { semester: "$semester", category: "$category" },
        docs: { $push: "$$ROOT" },
      },
    },
  ]);
  console.log(documents);

  // Construct merged documents
  const mergedDocuments = documents.map(({ _id, docs }) => {
    const mergedDoc = {
      Cname: [],
      code: [],
      category: _id.category,
      semester: _id.semester,
      user: null,
      department: null,
      joinedAt: null,
      updatedAt: null,
    };

    docs.forEach((doc) => {
      mergedDoc.Cname.push(...doc.Cname);
      mergedDoc.code.push(...doc.code);
      mergedDoc.user = doc.user;
      mergedDoc.department = doc.department;
      mergedDoc.joinedAt = doc.joinedAt;
      mergedDoc.updatedAt = doc.updatedAt;
    });

    return mergedDoc;
  });

  res.status(200).json({
    status: "success",
    // result: course.length,
    data: { mergedDocuments },
  });

  //console.error(error);
  //res.status(500).json({ message: "Internal server error" });
});
