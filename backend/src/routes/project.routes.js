import express from 'express'
import Project from '../models/Project.js'
import { protect } from '../middleware/auth.middleware.js'
import { sanitizeRichText } from '../middleware/sanitize.middleware.js'
import { getAll, getOne, createOne, updateOne, deleteOne, reorder } from '../utils/crudFactory.js'

const router = express.Router()

router.get('/', getAll(Project, 'displayOrder'))
router.get('/:id', getOne(Project))
router.post('/', protect, sanitizeRichText('fullDescription'), createOne(Project))
router.put('/:id', protect, sanitizeRichText('fullDescription'), updateOne(Project))
router.delete('/:id', protect, deleteOne(Project))
router.patch('/reorder', protect, reorder(Project))

export default router