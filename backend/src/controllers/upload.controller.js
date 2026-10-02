import {
  streamUpload,
  deleteFromCloudinary,
} from "../utils/cloudinaryUpload.js";

// POST /api/upload/image?folder=projects
export const uploadImageHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const folder = req.query.folder || "auto";
    const result = await streamUpload(req.file.buffer, folder, "image");

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    next(err);
  }
};

// POST /api/upload/resume
export const uploadResumeHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const result = await streamUpload(req.file.buffer, "resume", "raw");

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        fileName: req.file.originalname,
      },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/upload/image/:publicId (publicId must be passed URL-encoded)
export const deleteImageHandler = async (req, res, next) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    await deleteFromCloudinary(publicId);
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/upload/certificate/:publicId (publicId must be passed URL-encoded)
export const deleteCertificateHandler = async (req, res, next) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);
    await deleteFromCloudinary(publicId);
    res.json({ success: true, message: "Certificate deleted" });
  } catch (err) {
    next(err);
  }
};

// POST /api/upload/certificate
export const uploadCertificateHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const isPdf = req.file.mimetype === "application/pdf";
    const result = await streamUpload(
      req.file.buffer,
      "certificates",
      isPdf ? "auto" : "image",
    );

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        isPdf,
      },
    });
  } catch (err) {
    next(err);
  }
};
