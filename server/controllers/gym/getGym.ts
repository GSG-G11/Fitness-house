import { NextFunction, Response, Request } from 'express';
import { Gym, Image, Review, User } from '../../database/models';

export default async function getGym(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const GymData = await Gym.findAll({
      subQuery: false,
      attributes: [
        'id',
        ['gym_name', 'gymName'],
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
      where: {
        id,
      },
    });
    res.json({ GymData });
  } catch (error) {
    next(error);
  }
}
