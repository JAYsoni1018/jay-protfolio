import Hero from '../models/Hero.js'

export const getHero = async (req, res, next) => {
  try {
    const hero = await Hero.findOne()
    res.json({ success: true, data: hero })
  } catch (err) {
    next(err)
  }
}

export const upsertHero = async (req, res, next) => {
  try {
    let hero = await Hero.findOne()
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true, runValidators: true })
    } else {
      hero = await Hero.create(req.body)
    }
    res.json({ success: true, data: hero })
  } catch (err) {
    next(err)
  }
}