import { Router } from 'express';
import gym from './gym';
import gyms from './gyms';
import subscriptions from './subscription';

const routes = Router();

routes.use('/gym', gym);
routes.use('/gyms', gyms);
routes.use('/subscriptions', subscriptions);

// routes.use (other...)

export default routes;
