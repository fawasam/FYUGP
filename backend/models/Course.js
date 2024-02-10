import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema(
  {
    Cname: { type: String, required: true },
    category: {
      type: String,
      enum: ["major", "minor", "mdc", "aec", "sec", "vac"],
    },
    semester: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    department: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
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

const Course = mongoose.model("courses", courseSchema);
export default Course;
