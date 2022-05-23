import { Router } from 'express';
import { addSubscription } from '../controllers';

const subscriptions = Router();
subscriptions.post('/', addSubscription);

export default subscriptions;
