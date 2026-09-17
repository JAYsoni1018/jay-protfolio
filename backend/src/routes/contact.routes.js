import express from 'express'
import { submitContact, getMessages, markAsRead, deleteMessage } from '../controllers/contact.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { contactLimiter } from '../middleware/rateLimit.middleware.js'

const router = express.Router()

router.post('/', contactLimiter, submitContact)
router.get('/', protect, getMessages)
router.patch('/:id/read', protect, markAsRead)
router.delete('/:id', protect, deleteMessage)

export default router