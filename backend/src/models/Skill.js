import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillCategory', required: true },
    icon: String, // icon name or image URL
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Skill', skillSchema)