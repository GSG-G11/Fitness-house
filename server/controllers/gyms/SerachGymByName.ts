/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize from 'sequelize';
import { Gym, Image, Review } from '../../database/models';
import CustomError from '../../utils';

export default async function searchGymByName(req: Request, res: Response, next: NextFunction) {
  try {
    const gyms = await Gym.findAll({
      where: {
        gym_name: {
          [Sequelize.Op.like]: `%${req.query.q}%`,
        },
      },
      include: [
        {
          model: Image,
        },
        {
          model: Review,
        },
      ],
    });
    if (gyms.length === 0) {
      throw new CustomError('No gyms found', 404);
    }
    res.status(200).json(gyms);
  } catch (error) {
    next(error);
  }
}
