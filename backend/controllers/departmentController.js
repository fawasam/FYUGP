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
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// @desc    createProgram
// @route   POST /api/v1/college/program
// @access  Private

export const createProgram = asyncErrorHandler(async (req, res, next) => {});

// @desc    updateProgram
// @route   PATCH /api/v1/college/program
// @access  Private

export const updateProgram = asyncErrorHandler(async (req, res, next) => {});

// @desc    getAProgram
// @route   GET /api/v1/college/program/:id
// @access  Public

export const getAProgram = asyncErrorHandler(async (req, res, next) => {});

// @desc    getAllProgram
// @route   GET /api/v1/college/program
// @access  Public

export const getAllProgram = asyncErrorHandler(async (req, res, next) => {});
