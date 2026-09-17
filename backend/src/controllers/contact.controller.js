import Contact from '../models/Contact.js'

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }
    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact })
  } catch (err) {
    next(err)
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const { isRead, search, page = 1, limit = 20 } = req.query
    const filter = {}
    if (isRead !== undefined) filter.isRead = isRead === 'true'
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { subject: { $regex: search, $options: 'i' } }]

    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      Contact.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter),
    ])
    res.json({ success: true, data, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } })
  } catch (err) {
    next(err)
  }
}

export const markAsRead = async (req, res, next) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })
    res.json({ success: true, data: msg })
  } catch (err) {
    next(err)
  }
}

export const deleteMessage = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}