// backend/src/models/Hero.js
import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true }, // "AI & Full Stack Developer"
    tagline: String,
    introduction: String,
    profilePhoto: {
      url: String,
      publicId: String,
    },
    resumeUrl: String,
    githubUrl: String,
    linkedinUrl: String,
  },
  { timestamps: true }
)

export default mongoose.model('Hero', heroSchema)