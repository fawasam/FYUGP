import mongoose, { Schema } from "mongoose";

const courseSchema = mongoose.Schema(
  {
    Cname: {
      type: String,
      required: [true, "Please provide the course name"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Please provide the course code"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
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
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const Course = mongoose.model("courses", courseSchema);
export default Course;
