import express from "express";
import { upload } from "../utils/imageUpload.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
const router = express.Router();

const uploadController = asyncErrorHandler(async (req, res, next) => {
  const imagePath = req.file.path;
  const fullImagePath = `${req.protocol}://${req.get("host")}/${imagePath}`;

  res.status(200).json({
    status: "success",
    imageUrl: fullImagePath,
  });
});

router.post("/image", upload.single("image"), uploadController);

export default router;
