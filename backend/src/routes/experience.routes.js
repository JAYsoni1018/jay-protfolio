import Experience from '../models/Experience.js'
import { buildCrudRouter } from '../utils/crudRouter.js'

export default buildCrudRouter(Experience, 'displayOrder')