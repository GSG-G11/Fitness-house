import { Router } from 'express';

import { getTopGyms, searchGymByName, getGym } from '../controllers';

const gyms = Router();

gyms.get('/top', getTopGyms);
gyms.get('/:id', getGym);
gyms.get('/Search', searchGymByName);

export default gyms;
