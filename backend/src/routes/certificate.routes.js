import Certificate from '../models/Certificate.js'
import { buildCrudRouter } from '../utils/crudRouter.js'

export default buildCrudRouter(Certificate, 'displayOrder')