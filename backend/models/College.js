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
    pincode: { type: Number, required: [true, "College pincode is required"] },
    phone: { type: Number },
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
