import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    fileName: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Resume', resumeSchema)