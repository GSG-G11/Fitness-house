import { NextFunction, Response, Request } from 'express';

import { addSubscriptionSchema, CustomError } from '../../utils';

export default async function addSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = await addSubscriptionSchema.validateAsync(req.body);

    // add subscription logic here

    res.status(201).json({ message: 'تم تسجل الشتراك بنجاح', validation });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
