import { Router } from 'express';

import { getTopGyms, searchGymByName, getGym, getFilteredGyms, gymRegister } from '../controllers';

const gyms = Router();

// auth
gyms.post('/register', gymRegister);

//
gyms.get('/top', getTopGyms);
gyms.get('/filter', getFilteredGyms);
gyms.get('/search', searchGymByName);
gyms.get('/:id', getGym);

export default gyms;
