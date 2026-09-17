import About from '../models/About.js'

export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne()
    res.json({ success: true, data: about })
  } catch (err) {
    next(err)
  }
}

export const upsertAbout = async (req, res, next) => {
  try {
    let about = await About.findOne()
    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true })
    } else {
      about = await About.create(req.body)
    }
    res.json({ success: true, data: about })
  } catch (err) {
    next(err)
  }
}