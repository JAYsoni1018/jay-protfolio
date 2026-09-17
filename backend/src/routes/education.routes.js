import Education from '../models/Education.js'
import { buildCrudRouter } from '../utils/crudRouter.js'

export default buildCrudRouter(Education, 'displayOrder')