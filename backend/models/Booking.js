import mongoose, { Schema } from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    isConsulted: { type: Boolean, required: true, default: false },
    advisor: {
      type: Schema.Types.ObjectId,
      ref: "advisor",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

const Booking = mongoose.model("bookings", bookingSchema);
export default Booking;
