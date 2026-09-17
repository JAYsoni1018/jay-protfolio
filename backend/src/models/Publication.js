import mongoose from 'mongoose'

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: String, required: true }], // e.g. ["Jay Patel", "Co-author Name"]
    venue: { type: String, required: true }, // journal/conference name, e.g. "IEEE Xplore"
    venueType: {
      type: String,
      enum: ['Journal', 'Conference', 'Workshop', 'Preprint', 'Other'],
      default: 'Conference',
    },
    publicationDate: Date,
    abstract: String,
    doiUrl: String,
    pdfUrl: String,
    paperUrl: String, // external link (IEEE Xplore, arXiv, etc.)
    thumbnail: {
      url: String,
      publicId: String,
    },
    tags: [String], // e.g. ["NLP", "RAG", "Machine Learning"]
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Publication', publicationSchema)