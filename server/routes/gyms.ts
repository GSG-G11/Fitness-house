import { Router } from 'express';
import checkAuth from '../middleware/checkAuth';
import { getTopGyms, searchGymByName, getGym, getFilteredGyms, gymLogin, gymRegister, editGymData } from '../controllers';

const gyms = Router();
gyms.post('/login', gymLogin);

// auth
gyms.post('/register', gymRegister);

//
gyms.get('/top', getTopGyms);
gyms.get('/filter', getFilteredGyms);
gyms.get('/search', searchGymByName);
gyms.put('/', checkAuth('gym'), editGymData);
gyms.get('/:id', getGym);
export default gyms;
