import { Router } from 'express';
import { getAllGyms, getGym } from '../controllers/index';

const gyms = Router();

gyms.get('/top', getAllGyms);
gyms.get('/:id', getGym);
export default gyms;
