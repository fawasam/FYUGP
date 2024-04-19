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
import Booking from "../models/Booking.js";
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// @desc    createBooking
// @route   POST /api/v1/college/program/course/programId
// @access  Private

export const createBooking = asyncErrorHandler(async (req, res, next) => {
  const { name, email, phone, advisorId } = req.body;

  const advisor = await Advisor.findById(advisorId);
  if (!advisor) {
    const error = new CustomError("Advisor not found!", 400);
    return next(error);
  }

  // Create a new booking object
  const newBooking = new Booking({
    name,
    email,
    phone,
    advisor: advisorId, // Assuming advisorId is provided in the request body
  });

  // Save the new booking to the database
  const savedBooking = await newBooking.save();
  await Advisor.findByIdAndUpdate(advisorId, {
    $push: { booking: savedBooking._id },
  });

  if (savedBooking) {
    return res
      .status(200)
      .json({ message: "Booking created successfully", savedBooking });
  }
});

// @desc    getAllBookingByAdvisor  offered by a college
// @route   GET /api/v1/college/program/course/programId
// @access  Public

export const getAllBookingByAdvisor = asyncErrorHandler(
  async (req, res, next) => {
    const userId = req.params.advisorId;
    // console.log(advisorId);

    const booking = await Advisor.findOne({ user: userId })
      .sort({ joinedAt: -1 }) // Assuming advisor is the field in college schema referencing advisors
      .populate("booking");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const bookings = booking.booking;

    res.status(200).json({
      status: "success",
      result: bookings.length,
      data: { bookings },
    });
  }
);
