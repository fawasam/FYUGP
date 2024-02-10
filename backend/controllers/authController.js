import User from "../models/User.js";
import { generateUsername } from "../utils/helpers.js";
import "dotenv/config";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { signToken } from "../helpers/jwt.js";
import CustomError from "../utils/CustomeError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export const createSendResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  const options = {
    maxage: process.env.JWT_EXPIRE,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("jwt", token, options);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

// @desc    Register new user
// @route   POST /api/v1/auth/signup
// @access  Public

export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!passwordRegex.test(password)) {
    const error = new CustomError(
      "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
      400
    );
    return next(error);
  }
  let username = await generateUsername(email);
  const newUser = await User.create({ ...req.body, username });
  createSendResponse(newUser, 201, res);
});
// @desc    Login new user
// @route   POST /api/v1/auth/login
// @access  Public

export const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new CustomError(
      "Please provide email ID & Password for login in!",
      400
    );
    return next(error);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePasswordInDb(password, user.password))) {
    const error = new CustomError("Incorrect email or password", 400);
    return next(error);
  }

  createSendResponse(user, 200, res);
});

// @desc    forgotPassword
// @route   POST /api/v1/auth/login
// @access  Public

export const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  //1. get user based on the email
  const user = await User.findOne({ email });
  if (!user) {
    const error = new CustomError(
      "We could not find the user with given email",
      404
    );
    return next(error);
  }

  //2. generate a random reser token
  const resetToken = await user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //3. send the token back to the user email

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `We have received a password reset request. Please use the below link to reset your password \n\n${resetUrl}\n\nThis reset password link will be valid for only for 10 minutes`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request received successfully",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Password change request send to the user email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new CustomError(
        "There was an error sending password reset email, Please try again later",
        500
      )
    );
  }
});

// @desc    resetPassword
// @route   PATCH /api/v1/auth/resetPassword/:token
// @access  Public

export const passwordReset = asyncErrorHandler(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    const error = new CustomError("Link is invalid or has expired", 400);
    return next(error);
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();
  createSendResponse(user, 200, res);
});

// @desc    protect
// @route   middleware
// @access  Public

export const protect = asyncErrorHandler(async (req, res, next) => {
  // 1. readt the token & check if it exists
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    const error = new CustomError("Your are not logged in!", 401);
    return next(error);
  }
  // 2. validate the token
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3. if the user exists
  const user = await User.findById(decodedToken.id);
  if (!user) {
    const error = new CustomError("The user does not exist!", 401);
    return next(error);
  }
  // 4. if the user changed password after the token was issued
  const isPasswordChanges = await user.isPasswordChanged(decodedToken.iat);

  if (isPasswordChanges) {
    const error = new CustomError(
      "The password has been changed recently. Please login again!",
      401
    );
    return next(error);
  }
  ///5 . Allow user to access route
  req.user = user;
  next();
});

// @desc    Resticted
// @route   middleware
// @access  Public

export const restrict = (role) => {
  return (req, res, next) => {
    if (req?.user?.role !== role) {
      const error = new CustomError(
        "You do not have permission to perform this action",
        403
      );
      return next(error);
    }
    next();
  };
};
