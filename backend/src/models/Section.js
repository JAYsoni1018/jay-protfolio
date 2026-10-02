import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionKey: { type: String, required: true, unique: true }, // 'hero', 'about', 'skills', 'certificates', 'publications', ...
    title: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    skillsDisplayMode: {
      type: String,
      enum: ["progress", "badges"],
      default: "progress",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Section", sectionSchema);
