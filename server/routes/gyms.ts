import { Router } from 'express';
import getTopGyms from '../controllers/index';

const gyms = Router();

gyms.get('/top', getTopGyms);

export default gyms;
