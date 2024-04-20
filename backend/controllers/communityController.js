import "dotenv/config";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomeError.js";
import Community from "../models/Community.js";
import { populate } from "dotenv";
import User from "../models/User.js";

// @desc    createQns
// @route   POST /api/v1/community/create
// @access  Private

export const createQns = asyncErrorHandler(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const newQuestion = await Community.create({
    ...req.body,
    user: req.user._id,
  });

  if (newQuestion) {
    return res.status(200).json({
      message: "New Question created successfully",
      data: newQuestion,
    });
  }
});

// @desc    createQnsComment
// @route   POST /api/v1/community/create
// @access  Private

export const createQnsComment = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { comment, user } = req.body;

  if (!comment || !user) {
    const error = new CustomError("Please provide all field!", 400);
    return next(error);
  }

  const communityQns = await Community.findById(id);
  if (!communityQns) {
    const error = new CustomError("Question not found", 400);
    return next(error);
  }
  communityQns.comments.push({ comment, user });
  await communityQns.save();

  return res
    .status(200)
    .json({ message: "Comment added successfully", communityQns });
});
// @desc    getAllCommunityQns
// @route   POST /api/v1/community
// @access  Public

export const getAllCommunityQns = asyncErrorHandler(async (req, res, next) => {
  const community = await Community.find()
    .populate({ path: "user", select: "username createdAt profileImage " })
    .populate("comments.user", "username profileImage")
    .sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    result: community.length,
    data: { community },
  });
});

// @desc    getAEnquiry
// @route   POST /api/v1/Enquiry/id
// @access  Public

export const getCommunityQns = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const communityQns = await Community.findById(id);
  res.status(200).json({
    status: "success",
    data: { communityQns },
  });
});

// @desc    likeCommentByUser
// @route   POST /api/v1/Enquiry/id
// @access  Public

export const likeCommentByUser = asyncErrorHandler(async (req, res, next) => {
  const { commentId, communityId, userId } = req.params;
  console.log(commentId);

  const communityQns = await Community.findById(communityId);
  if (!communityQns) {
    const error = new CustomError("Question not found", 400);
    return next(error);
  }
  const comment = communityQns.comments.id(commentId);
  if (!comment) {
    const error = new CustomError("Comment not found", 400);
    return next(error);
  }
  console.log(comment);
  const user = await User.findById(userId);
  if (!user) {
    const error = new CustomError("User not found!", 400);
    return next(error);
  }
  const userHasLiked = comment.likes.includes(userId);

  if (userHasLiked) {
    comment.likes.pull(userId);
    await communityQns.save();
    return res.json({ message: "Like removed" });
  } else {
    comment.likes.push(userId);
    await communityQns.save();
    return res.json({ message: "Like added" });
  }
});
