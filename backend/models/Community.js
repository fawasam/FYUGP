import mongoose, { Schema } from "mongoose";

const communitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment: { type: String, required: true },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      likes: [{ type: Schema.Types.ObjectId, ref: "users", unique: true }],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model("community", communitySchema);
export default Community;

// What is green houes effect and how does it contribute in global warming?

// Understand the science behind the green house effect and ites role in ongoing challenge of climate change
