import mongoose from 'mongoose'

const skillCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('SkillCategory', skillCategorySchema)