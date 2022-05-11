import { Router } from 'express';

import { getTopGyms, searchGymByName, getGym, getFilteredGyms } from '../controllers';

const gyms = Router();

gyms.get('/top', getTopGyms);
gyms.get('/filter', getFilteredGyms);
gyms.get('/search', searchGymByName);
gyms.get('/:id', getGym);

export default gyms;
