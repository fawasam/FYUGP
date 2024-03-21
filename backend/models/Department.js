import mongoose, { Schema } from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    Dname: { type: String, required: true, unique: [true, "already added"] },
    headOfDepartment: {
      type: String,
      required: true,
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
