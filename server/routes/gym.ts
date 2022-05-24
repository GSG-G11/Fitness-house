import { Router } from 'express';

import {
  postImage,
  getSubscription,
  updateStatusSubscription,
  deleteImageController,
  addReview,
} from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);
gym.get('/subscription', checkAuth('gym'), getSubscription);
gym.put('/subscription/:id', checkAuth('gym'), updateStatusSubscription);
gym.delete('/images/:id', checkAuth('gym'), deleteImageController);
gym.post('/review', addReview);

export default gym;
