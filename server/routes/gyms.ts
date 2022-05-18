import { Router } from 'express';
import checkAuth from '../middleware/checkAuth';
import { getTopGyms, searchGymByName, getGym, getFilteredGyms, editGymData } from '../controllers';

const gyms = Router();

gyms.get('/top', getTopGyms);
gyms.get('/filter', getFilteredGyms);
gyms.get('/search', searchGymByName);
gyms.put('/edit', checkAuth('gym'), editGymData);
gyms.get('/:id', getGym);

export default gyms;
