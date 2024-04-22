import express from "express";
import { upload } from "../utils/imageUpload.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import College from "../models/College.js";
import { updateProgram } from "../controllers/departmentController.js";
import { Department } from "../models/Department.js";
const router = express.Router();

const uploadController = asyncErrorHandler(async (req, res, next) => {
  const imagePath = req.file.path;
  const fullImagePath = `${req.protocol}://${req.get("host")}/${imagePath}`;

  res.status(200).json({
    status: "success",
    imageUrl: fullImagePath,
  });
});

const uploadFileController = asyncErrorHandler(async (req, res, next) => {
  const FilePath = req.file.path;
  if (!FilePath) {
    const error = new CustomError("Please select a File", 404);
    return next(error);
  }
  const departmentId = req.params.id;

  const fullFilePath = `${req.protocol}://${req.get("host")}/${FilePath}`;

  const syllabus = fullFilePath;
  if (fullFilePath) {
    const updatedProgram = await Department.findByIdAndUpdate(
      departmentId,
      { syllabus },
      {
        runValidators: false,
        context: "query",
        new: true,
      }
    );
    if (!updatedProgram) {
      const error = new CustomError("Upload error", 404);
      return next(error);
    }
    let program = await updatedProgram.save();
    if (!program) {
      const error = new CustomError("Upload error", 404);
      return next(error);
    }

    res.status(200).json({
      status: "success",
      fileURL: fullFilePath,
      data: { program },
    });
  }
});

router.post("/image", upload.single("image"), uploadController);
router.post(
  "/file/:id",
  upload.single("file"),
  uploadFileController,
  updateProgram
);

export default router;
