/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize from 'sequelize';
import { Gym, Image, Review } from '../../database/models';
import CustomError from '../../utils';

export default async function searchGymByName(req: Request, res: Response, next: NextFunction) {
  try {
    const gyms = await Gym.findAll({
      attributes: { exclude: ['password', 'monthly_price', 'type_gender', 'fulltime', 'six_month_price', 'updatedAt', 'createdAt'] },
      where: {
        gym_name: {
          [Sequelize.Op.iLike]: `%${req.query.q}%`,
        },
      },
      include: [
        {
          model: Image,
          limit: 1,
          attributes: { exclude: ['createdAt', 'updatedAt', 'gymId', 'publicKey', 'id'] },
        },
      ],
    });
    if (gyms.length === 0) {
      throw new CustomError('No gyms found', 200);
    }
    res.status(200).json(gyms);
  } catch (error) {
    next(error);
  }
}
