import { NextFunction, Response } from 'express';
import { Subscription } from '../../database/models';
import { CustomError } from '../../utils';

export default async function getSubscription(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = req.token;

    const gymSubscription = await Subscription.findAll({
      where: { gymId: id },
      subQuery: false,
      attributes: [
        'id',
        'username',
        'userPhone',
        'type',
        'status',
        'createdAt',
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    if (!gymSubscription) throw new CustomError('عذراُ لا يوجد لديك اي اشتراكات', 404);
    res.json({ gymSubscription });
  } catch (error: any) {
    next(error);
  }
}
