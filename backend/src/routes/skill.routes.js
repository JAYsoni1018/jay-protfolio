import Skill from '../models/Skill.js'
import SkillCategory from '../models/SkillCategory.js'
import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { buildCrudRouter } from '../utils/crudRouter.js'
import { getAll, createOne, updateOne, deleteOne } from '../utils/crudFactory.js'

const router = express.Router()
router.use('/', buildCrudRouter(Skill, 'displayOrder'))

// Skill categories nested under /api/skills/categories
router.get('/categories/all', getAll(SkillCategory, 'displayOrder'))
router.post('/categories', protect, createOne(SkillCategory))
router.put('/categories/:id', protect, updateOne(SkillCategory))
router.delete('/categories/:id', protect, deleteOne(SkillCategory))

export default router