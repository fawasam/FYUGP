import mongoose, { Schema } from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    Dname: { type: String, required: true },
    headOfDepartment: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "College email is required"],
      unique: true,
    },
    Discipline: {
      type: String,
      enum: ["Humanities", "Languages", "Science", "Commerce", "Management"],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "colleges",
      required: true,
    },
    coursesOffered: [
      {
        type: Schema.Types.ObjectId,
        ref: "courses",
        default: null,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const Department = mongoose.model("departments", departmentSchema);
export { Department, departmentSchema };
