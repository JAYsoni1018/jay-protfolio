import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WEBP and GIF images are allowed"), false);
  }
};

const resumeFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed for resume"), false);
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadResume = multer({
  storage,
  fileFilter: resumeFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const certificateFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WEBP or PDF files are allowed"), false);
  }
};
export const uploadCertificateFile = multer({
  storage,
  fileFilter: certificateFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});
