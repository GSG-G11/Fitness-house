import { Router } from 'express';
import { addSubscription, getSubscription, updateStatusSubscription } from '../controllers';
import checkAuth from '../middleware';

const subscriptions = Router();
subscriptions.post('/', addSubscription);
subscriptions.get('/', checkAuth('gym'), getSubscription);
subscriptions.put('/:id', checkAuth('gym'), updateStatusSubscription);

export default subscriptions;
