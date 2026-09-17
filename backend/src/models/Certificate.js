import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    issueDate: Date,
    expiryDate: Date, // optional, null = does not expire
    credentialId: String,
    credentialUrl: String,
    image: {
      url: String,
      publicId: String,
    },
    skills: [String], // tags/technologies covered by the certificate
    category: { type: String, default: 'General' }, // e.g. Cloud, AI/ML, Programming
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Certificate', certificateSchema)