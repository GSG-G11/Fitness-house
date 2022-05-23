import { NextFunction, Response, Request } from 'express';
import { Subscription } from '../../database/models';

import { addSubscriptionSchema, CustomError } from '../../utils';

export default async function addSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const { gymId, username, userPhone, type } = await addSubscriptionSchema.validateAsync(
      req.body,
      {
        abortEarly: false,
      },
    );

    // Check if the gym already exists
    const isExist: any = await Subscription.findOne({
      where: { userPhone },
    });

    // if is not exist throw an error
    if (isExist) {
      throw new CustomError('عذرا هذا تم الاشتراك من قبل هذا الهاتف مسبقا ! حاول مرة أخرى', 409);
    }

    // add subscription logic here
    const subscription = await Subscription.create({
      gymId,
      username,
      userPhone,
      type,
    });

    res.status(201).json({ message: 'تم الاشتراك بنجاح', subscription });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
