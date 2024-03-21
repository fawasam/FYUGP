import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema(
  {
    Cname: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "CORE IN MAJOR ",
        "ELECTIVE IN MAJOR",
        "MINOR",
        "ABILITY ENHANCEMENT COURSE",
        "VOCATIONAL MINOR",
        "SKILL ENHANCEMENT COURSE",
        "VALUE ADDED COURSE",
        "MULTI-DISCIPLINARY COURSE",
      ],
    },
    semester: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    department: [
      {
        type: Schema.Types.ObjectId,
        ref: "departments",
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
