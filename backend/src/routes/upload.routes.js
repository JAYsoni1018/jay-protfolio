import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { uploadImage, uploadResume } from '../middleware/upload.middleware.js'
import {
  uploadImageHandler,
  uploadResumeHandler,
  deleteImageHandler,
} from '../controllers/upload.controller.js'

const router = express.Router()

router.post('/image', protect, uploadImage.single('image'), uploadImageHandler)
router.post('/resume', protect, uploadResume.single('resume'), uploadResumeHandler)
router.delete('/image/:publicId', protect, deleteImageHandler)

export default router