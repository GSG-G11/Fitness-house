import { Router } from 'express';
import gyms from './gyms';

const routes = Router();

routes.use('/gyms', gyms);

// routes.use (other...)

export default routes;
