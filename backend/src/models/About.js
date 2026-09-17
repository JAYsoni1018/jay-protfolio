// backend/src/models/About.js
import mongoose from 'mongoose'

const statSchema = new mongoose.Schema(
  {
    label: String, // "Projects Completed"
    value: String, // "12+"
    order: { type: Number, default: 0 },
  },
  { _id: false }
)

const aboutSchema = new mongoose.Schema(
  {
    profileImage: {
      url: String,
      publicId: String,
    },
    biography: String,
    professionalSummary: String,
    interests: [String],
    careerFocus: String,
    stats: [statSchema],
  },
  { timestamps: true }
)

export default mongoose.model('About', aboutSchema)