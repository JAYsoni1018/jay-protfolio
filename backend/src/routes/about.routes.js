import express from 'express'
import { getAbout, upsertAbout } from '../controllers/about.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()
router.get('/', getAbout)
router.put('/', protect, upsertAbout)

export default router