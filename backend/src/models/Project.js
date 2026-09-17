import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    altText: String,
    width: Number,
    height: Number,
    isPrimary: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false }
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String }, // sanitized rich-text HTML
    thumbnail: imageSchema,
    images: [imageSchema],
    technologies: [{ type: String }],
    category: { type: String, required: true, index: true },
    githubUrl: String,
    liveDemoUrl: String,
    startDate: Date,
    endDate: Date,
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

projectSchema.index({ category: 1, displayOrder: 1 })

export default mongoose.model('Project', projectSchema)