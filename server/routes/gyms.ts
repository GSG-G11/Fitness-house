import { Router } from 'express';
import checkAuth from '../middleware/checkAuth';
import { getTopGyms, searchGymByName, getGym, getFilteredGyms, editGymData } from '../controllers';

const gyms = Router();

gyms.get('/top', getTopGyms);
gyms.get('/filter', getFilteredGyms);
gyms.get('/search', searchGymByName);
gyms.get('/edit', checkAuth, editGymData);
gyms.get('/:id', getGym);

export default gyms;
