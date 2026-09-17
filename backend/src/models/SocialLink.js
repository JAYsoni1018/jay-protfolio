import mongoose from 'mongoose'

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // GitHub, LinkedIn, Email, etc.
    url: { type: String, required: true },
    icon: String,
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('SocialLink', socialLinkSchema)