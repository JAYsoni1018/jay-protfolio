import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { env } from '../config/env.js'
import Admin from '../models/Admin.js'

const seedAdmin = async () => {
  await connectDB()

  const existing = await Admin.findOne({ email: env.adminEmail })
  if (existing) {
    console.log('Admin already exists:', existing.email)
    process.exit(0)
  }

  const admin = await Admin.create({
    name: 'Jay',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  })

  console.log('Admin created:', admin.email)
  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error(err)
  process.exit(1)
})