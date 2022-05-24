import { NextFunction, Response } from 'express';
import { Subscription } from '../../database/models';

import { CustomError, paramsValidation } from '../../utils';

export default async function updateStatusSubscription(
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = await paramsValidation.validateAsync(req.params, {
      abortEarly: false,
    });

    const { id: gymId } = req.token;

    const subscription = await Subscription.findOne({
      where: {
        id,
        gymId,
      },
    });

    // Check if the gym already exists
    if (!subscription) {
      throw new CustomError('عذرا , هذا الاشتراك , غير موجود', 404);
    }

    // add subscription logic here
    await subscription.update({
      status: !subscription.status,
    });

    res.json({
      message: subscription.status ? 'تم تفعيل الاشتراك بنجاح' : 'تم إيقاف الاشتراك بنجاح',
      subscription,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
