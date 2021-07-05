import { Router } from 'express';

import { FaunaController } from '../controllers/FaunaController';

const routes = Router();

const faunaController = new FaunaController();

routes.use('/list', faunaController.index);
routes.use('/create', faunaController.create);

export { routes };
