import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema(
  {
    course: {
      type: [
        {
          courseCode: { type: String, required: true },
          courseName: { type: String, required: true },
        },
      ],
      required: [true, "Please provide the course code"],
    },
    category: {
      type: String,
      enum: [
        "CORE IN MAJOR",
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
      required: [true, "Please select a semester"],
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "departments",
      default: null,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "colleges",
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const Course = mongoose.model("courses", courseSchema);
export default Course;
