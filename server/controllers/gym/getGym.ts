import { NextFunction, Response, Request } from 'express';
import { Gym, Image, Review, User } from '../../database/models';
import CustomError from '../../utils';
import paramsValidation from '../../utils/validation';

export default async function getGym(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = await paramsValidation.validateAsync(req.params);

    const gymData = await Gym.findByPk(id, {
      subQuery: false,
      attributes: [
        'id',
        'gymName',
        'logo',
        'city',
        'description',
        'features',
      ],
      include: [
        { model: Image, required: false, attributes: ['pathUrl'] },
        {
          model: Review,
          required: false,
          attributes: ['id', 'rate', 'description', 'createdAt', 'userId'],
          include: [{ model: User, required: false, attributes: ['username', 'avatar'] }],
        },
      ],
    });
    if (!gymData) throw new CustomError('عذراُ الجيم غير متوفر', 404);
    res.json({ gymData });
  } catch (error: any) {
    if (error.name === 'ValidationError') next(new CustomError('عذراً خطأ في المعرف', 400));
    next(error);
  }
}
