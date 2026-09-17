import Section from '../models/Section.js'
import { getAll, getOne, createOne, updateOne, deleteOne, reorder } from '../utils/crudFactory.js'

export const getSections = getAll(Section, 'displayOrder')
export const getSection = getOne(Section)
export const createSection = createOne(Section)
export const updateSection = updateOne(Section)
export const deleteSection = deleteOne(Section)
export const reorderSections = reorder(Section)