import Achievement from '../models/Achievement.js'
import { buildCrudRouter } from '../utils/crudRouter.js'

export default buildCrudRouter(Achievement, 'displayOrder')