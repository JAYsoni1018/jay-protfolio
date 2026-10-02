import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  uploadCertificateFile,
  uploadImage,
  uploadResume,
} from "../middleware/upload.middleware.js";
import {
  uploadImageHandler,
  uploadResumeHandler,
  deleteImageHandler,
  deleteCertificateHandler,
  uploadCertificateHandler,
} from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/image", protect, uploadImage.single("image"), uploadImageHandler);
router.post(
  "/resume",
  protect,
  uploadResume.single("resume"),
  uploadResumeHandler,
);
router.delete("/image/:publicId", protect, deleteImageHandler);
router.post(
  "/certificate",
  protect,
  uploadCertificateFile.single("certificate"),
  uploadCertificateHandler,
);
router.delete("/certificate/:publicId", protect, deleteCertificateHandler);
export default router;
