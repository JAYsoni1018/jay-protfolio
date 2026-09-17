import express from 'express'
import { getHero, upsertHero } from '../controllers/hero.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()
router.get('/', getHero)
router.put('/', protect, upsertHero)

export default router