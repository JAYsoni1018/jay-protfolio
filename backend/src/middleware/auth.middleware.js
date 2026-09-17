import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const protect = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null)

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, env.jwtSecret)
    req.admin = decoded
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, invalid token' })
  }
}