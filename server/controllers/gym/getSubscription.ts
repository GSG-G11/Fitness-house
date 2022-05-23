import { NextFunction, Response } from 'express';
import { Subscription } from '../../database/models';

export default async function getSubscription(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = req.token;

    const gymSubscription = await Subscription.findAll({
      where: { gymId: id },
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
    res.json({ gymSubscription });
  } catch (error: any) {
    next(error);
  }
}
