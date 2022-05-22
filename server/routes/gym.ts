import { Router } from 'express';

import { postImage, deleteImageController } from '../controllers';
import checkAuth from '../middleware';

const gym = Router();

gym.post('/images', checkAuth('gym'), postImage);
gym.delete('/images/:id', checkAuth('gym'), deleteImageController);

export default gym;
