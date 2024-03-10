import mongoose, { Schema } from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    Dname: { type: String, required: true, unique: [true, "already added"] },
    headOfDepartment: {
      type: String,
      required: true,
    },
    coursesOffered: [
      {
        type: Schema.Types.ObjectId,
        ref: "courses",
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
