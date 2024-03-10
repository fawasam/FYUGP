import mongoose, { Schema } from "mongoose";
import { departmentSchema } from "./Department.js";

const collegeSchema = mongoose.Schema(
  {
    collegename: {
      type: String,
      required: [true, "College name is required"],
      unique: [true, "Already exists college"],
      trim: true,
    },
    place: { type: String, required: [true, "College place is required"] },
    pincode: { type: String, required: [true, "College pincode is required"] },
    phone: { type: String },
    type: { type: String, required: true },
    email: { type: String, required: [true, "College email is required"] },
    website: { type: String },
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
    picture: String,
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const College = mongoose.model("colleges", collegeSchema);
export default College;
