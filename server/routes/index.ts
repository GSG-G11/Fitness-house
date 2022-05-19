import { Router } from 'express';
import gym from './gym';
import gyms from './gyms';

const routes = Router();

routes.use('/gym', gym);
routes.use('/gyms', gyms);

// routes.use (other...)

export default routes;
