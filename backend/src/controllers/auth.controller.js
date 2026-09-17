import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { env } from '../config/env.js'

const signToken = (admin) =>
  jwt.sign({ id: admin._id, email: admin.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = signToken(admin)

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, data: { id: admin._id, name: admin.name, email: admin.email }, token })
  } catch (err) {
    next(err)
  }
}

export const logout = (req, res) => {
  res.clearCookie('token').json({ success: true, message: 'Logged out' })
}

export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id)
    res.json({ success: true, data: admin })
  } catch (err) {
    next(err)
  }
}