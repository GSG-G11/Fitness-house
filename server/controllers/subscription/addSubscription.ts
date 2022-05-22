import { NextFunction, Response, Request } from 'express';
import { Subscription } from '../../database/models';

import { addSubscriptionSchema, CustomError } from '../../utils';

export default async function addSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const validateSubscription = await addSubscriptionSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // add subscription logic here
    const subscription = await Subscription.create(validateSubscription);

    res.status(201).json({ message: 'تم تسجل الشتراك بنجاح', subscription });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
