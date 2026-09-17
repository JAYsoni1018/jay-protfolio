import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getAll, getOne, createOne, updateOne, deleteOne, reorder } from './crudFactory.js'

export const buildCrudRouter = (Model, sortField) => {
  const router = express.Router()

  router.get('/', getAll(Model, sortField))
  router.get('/:id', getOne(Model))
  router.post('/', protect, createOne(Model))
  router.put('/:id', protect, updateOne(Model))
  router.delete('/:id', protect, deleteOne(Model))
  router.patch('/reorder', protect, reorder(Model))

  return router
}