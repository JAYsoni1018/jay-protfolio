import Publication from "../models/Publication.js";
import { buildCrudRouter } from "../utils/crudRouter.js";

export default buildCrudRouter(Publication, "displayOrder");
