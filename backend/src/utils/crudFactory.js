export const getAll = (Model, defaultSort = 'displayOrder') => async (req, res, next) => {
  try {
    const { category, featured, search, page = 1, limit = 50 } = req.query
    const filter = {}
    if (category) filter.category = category
    if (featured !== undefined) filter.featured = featured === 'true'
    if (search) filter.title = { $regex: search, $options: 'i' }

    const skip = (Number(page) - 1) * Number(limit)
    const [data, total] = await Promise.all([
      Model.find(filter).sort(defaultSort).skip(skip).limit(Number(limit)),
      Model.countDocuments(filter),
    ])

    res.json({
      success: true,
      data,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
    })
  } catch (err) {
    next(err)
  }
}

export const getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id)
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: doc })
  } catch (err) {
    next(err)
  }
}

export const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body)
    res.status(201).json({ success: true, data: doc })
  } catch (err) {
    next(err)
  }
}

export const updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: doc })
  } catch (err) {
    next(err)
  }
}

export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, message: 'Deleted successfully' })
  } catch (err) {
    next(err)
  }
}

export const reorder = (Model) => async (req, res, next) => {
  try {
    const { items } = req.body // [{ id, displayOrder }, ...]
    await Promise.all(
      items.map((item) => Model.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder }))
    )
    res.json({ success: true, message: 'Order updated' })
  } catch (err) {
    next(err)
  }
}