import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    location: String,
    description: String,
    grade: String,
    coursework: [String],
    logo: {
      url: String,
      publicId: String,
    },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Education', educationSchema)