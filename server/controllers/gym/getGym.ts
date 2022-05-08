import { NextFunction, Response, Request } from 'express';
import { Gym, Image } from '../../database/models';

export default async function getGym(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const Gymdata = await Gym.findAll({
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
      ],
      where: {
        id,
      },
    });
    res.json({ Gymdata });
  } catch (error) {
    next(error);
  }
}
