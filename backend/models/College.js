import mongoose, { Schema } from "mongoose";
import { departmentSchema } from "./Department.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});
const collegeSchema = mongoose.Schema(
  {
    collegename: {
      type: String,
      required: [true, "College name is required"],
      unique: [true, "Already exists college"],
      trim: true,
    },
    email: { type: String, required: [true, "College email is required"] },
    place: { type: String },
    pincode: { type: String },
    phone: { type: String },
    type: { type: String },
    website: { type: String },
    about: { type: String },

    published: { type: Boolean, default: false, required: true },
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: "departments",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    advisor: [
      {
        type: Schema.Types.ObjectId,
        ref: "advisor",
      },
    ],
    picture: {
      type: String,
      default: `${process.env.SERVER_URL}/uploads/default_dp.webp`,
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const College = mongoose.model("colleges", collegeSchema);
export default College;
