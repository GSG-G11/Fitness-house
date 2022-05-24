import { Router } from 'express';

import { postImage, deleteImageController, addReview } from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);
gym.delete('/images/:id', checkAuth('gym'), deleteImageController);
gym.post('/review', addReview);

export default gym;
