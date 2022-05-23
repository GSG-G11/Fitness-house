import { Router } from 'express';

import { getSubscription, postImage } from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);
gym.get('/subscription', checkAuth('gym'), getSubscription);

export default gym;
