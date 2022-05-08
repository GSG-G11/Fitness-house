import { Router } from 'express';
import { getTopGyms, searchGymByName } from '../controllers';

const gyms = Router();

gyms.get('/top', getTopGyms);
gyms.get('/Search', searchGymByName);

// http://localhost:3000/api/v1/gyms/Search?q[ddada]

export default gyms;
