import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      minlength: [3, "fullname must be 3 letters long"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email."],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
      minlength: 6,
      select: false,
    },
    confirmPassword: {
      type: String,
      // required: [true, "Please confirm your password."],
      validate: {
        validator: function (val) {
          return val == this.password;
        },
        message: "Password & Confirm Password does not match!",
      },
    },
    username: {
      type: String,
      minlength: [2, "Username must be 3 letters long"],
      required: [true],
    },
    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
    place: String,
    district: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    degree_info: {
      currentCollege: String,
      pathway: { type: String },
      discipline: { type: String },
      program: { type: String },
      courses: [
        {
          semester: String,
          DSC: [String],
          AEC: [String],
          SEC: [String],
          MDC: [String],
          VAC: [String],
          courses_count: Number,
          credits_count: Number,
          hrs_work_count: Number,
        },
      ],
      total_credits_earned: {
        type: Number,
        default: 0,
      },
      total_course_enrolled: {
        type: Number,
        default: 0,
      },
    },
    role: {
      type: String,
      enum: [
        "admin",
        "collegeAdmin",
        "department",
        "advisor",
        "parent",
        "student",
        "user",
      ],
      default: "user",
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "colleges",
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "departments",
    },
    profileImage: {
      type: String,
      default: `${process.env.SERVER_URL}/uploads/default_dp.webp`,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew) {
    for (let i = 1; i <= 6; i++) {
      this.degree_info.courses.push({
        semester: i.toString(),
        DSC: [],
        AEC: [],
        SEC: [],
        MDC: [],
        VAC: [],
        courses_count: 0,
        credits_count: 0,
        hrs_work_count: 0,
      });
    }
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};

userSchema.methods.isPasswordChanged = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const pswdChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < pswdChangedTimestamp;
  }
  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = false;
  next();
});
const User = mongoose.model("users", userSchema);
export default User;
