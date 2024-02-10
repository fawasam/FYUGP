import CustomError from "../utils/CustomeError.js";

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};
const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later",
    });
  }
};
const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.value}: ${err.path}`;
  return new CustomError(msg, 400);
};
const duplicateKeyErrorHandler = (err) => {
  let key, msg;

  if (err.keyValue) {
    if (err.keyValue.email) {
      key = "email";
    } else if (err.keyValue.collegename) {
      key = "collegename";
    }
  }
  switch (key) {
    case "email":
      msg = "Email already registered, Please login to your account";
      break;
    case "collegename":
      msg = "Collegename already exists";
      break;
    default:
      msg = "Duplicate key error";
  }
  return new CustomError(msg, 400);
};
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((value) => value.message);

  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;
  return new CustomError(msg, 400);
};
const tokenExpireErrorHandler = (err) => {
  const msg = `JWT has expired. Please login again!`;
  return new CustomError(msg, 401);
};
const jwtErrorHandler = (err) => {
  const msg = `Invalid token. Please login again!`;
  return new CustomError(msg, 401);
};

export const errorController = (error, req, res, next) => {
  // console.log(error);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    if (error.name === "TokenExpireError")
      error = tokenExpireErrorHandler(error);
    if (error.name === "JsonWebTokenError") error = jwtErrorHandler(error);
    prodErrors(res, error);
  }
};
