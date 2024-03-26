import mongoose, { Schema } from "mongoose";

// Define the schema for the Review model
const enquirySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  college: {
    type: Schema.Types.ObjectId,
    ref: "colleges",
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isReaded: {
    type: Boolean,
    default: false,
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
