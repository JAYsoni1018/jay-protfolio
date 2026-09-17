import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
} from '../controllers/section.controller.js'

const router = express.Router()

router.get('/', getSections)
router.get('/:id', getSection)
router.post('/', protect, createSection)
router.put('/:id', protect, updateSection)
router.delete('/:id', protect, deleteSection)
router.patch('/reorder', protect, reorderSections)

export default router