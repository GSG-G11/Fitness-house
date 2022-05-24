import { NextFunction, Response } from 'express';
import { Subscription } from '../../database/models';

import { CustomError, paramsValidation } from '../../utils';
import sendSMS from '../../utils/sms';

const COUNTRY_CODE = '+970';

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

    const typeSub = subscription.type === 'sixMonth' ? 'ستة شهور' : 'شهر';

    const message = subscription.status
      ? `تم تفعيل الاشتراك بحزمة ${typeSub} بنجاح , يرجى زيارة  النادي غداً لتأكيد الإشتراك`
      : 'تم إيقاف الاشتراك بنجاح';

    if (process.env.NODE_ENV !== 'test') {
      sendSMS(`${COUNTRY_CODE}${subscription.userPhone}`, message);
    }

    res.json({
      message,
      subscription,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
