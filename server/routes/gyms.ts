import { Router } from 'express';
import { getTopGyms, getGym } from '../controllers/index';

const gyms = Router();

gyms.get('/top', getTopGyms);
gyms.get('/:id', getGym);
export default gyms;
