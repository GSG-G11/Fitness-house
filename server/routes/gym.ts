import { Router } from 'express';

import { postImage } from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);

export default gym;
