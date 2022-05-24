import { Router } from 'express';

import { getSubscription, postImage, deleteImageController, addReview } from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);
gym.get('/subscription', checkAuth('gym'), getSubscription);
gym.delete('/images/:id', checkAuth('gym'), deleteImageController);
gym.post('/review', addReview);

export default gym;
