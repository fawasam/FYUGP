import mongoose, { Schema } from "mongoose";

const advisorSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    availability: {
      type: Boolean,
      default: false,
    },
    booking: [
      {
        type: Schema.Types.ObjectId,
        ref: "bookings",
      },
    ],
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
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const Advisor = mongoose.model("advisor", advisorSchema);
export default Advisor;
