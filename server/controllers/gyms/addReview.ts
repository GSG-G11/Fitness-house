import { NextFunction, Response, Request } from 'express';
import { addReviewSchema, CustomError } from '../../utils';
import { Review, Subscription } from '../../database/models';

export default async function addReview(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      gymId,
      username,
      rate,
      description,
      userPhone,
    } = await addReviewSchema.validateAsync(req.body, { abortEarly: false });
    const isExist: any = await Subscription.findOne({
      where: { userPhone, gymId },
    });
    if (!isExist) {
      throw new CustomError('عذراً لا يوجد لديك إشتراك في هذا النادي لتممكن من إضافة تقييم', 401);
    }
    const { status } = isExist;
    if (!status) {
      throw new CustomError('عذرا لا يوجد عضوية مفعلة', 403);
    }
    const review = await Review.create({
      gymId,
      username,
      rate,
      description,
    });
    res.status(201).json({ message: 'تم إضافة تقييمك بنجاح', review });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
