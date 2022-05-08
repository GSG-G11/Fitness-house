import { NextFunction, Response, Request } from 'express';
import { Gym, Image, Review, User } from '../../database/models';
import paramsValidation from '../../utils/validation';

export default async function getGym(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = await paramsValidation.validateAsync(req.params);
    const GymData = await Gym.findByPk(id, {
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
          attributes: ['rate', 'description', 'createdAt', 'userId'],
          include: [{ model: User, required: false, attributes: ['username', 'avatar'] }],
        },
      ],
    });
    res.json({ GymData });
  } catch (error) {
    next(error);
  }
}
