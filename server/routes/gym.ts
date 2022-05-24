import { Router } from 'express';

import {
  getSubscription,
  updateStatusSubscription,
  postImage,
  deleteImageController,
} from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);
gym.get('/subscription', checkAuth('gym'), getSubscription);
gym.put('/subscription/:id', checkAuth('gym'), updateStatusSubscription);
gym.delete('/images/:id', checkAuth('gym'), deleteImageController);

export default gym;
