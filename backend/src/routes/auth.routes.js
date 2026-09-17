import express from 'express'
import { login, logout, getMe } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimit.middleware.js'

const router = express.Router()

router.post('/login', authLimiter, login)
router.post('/logout', logout)
router.get('/me', protect, getMe)

export default router