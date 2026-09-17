import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: Date,
    organization: String,
    image: {
      url: String,
      publicId: String,
    },
    verificationUrl: String,
    category: { type: String, default: 'General' }, // e.g. Hackathon, Award, Competition
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Achievement', achievementSchema)