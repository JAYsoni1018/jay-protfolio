import SocialLink from '../models/SocialLink.js'
import { buildCrudRouter } from '../utils/crudRouter.js'

export default buildCrudRouter(SocialLink, 'displayOrder')