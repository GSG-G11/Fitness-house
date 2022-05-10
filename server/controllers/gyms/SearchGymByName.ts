/* eslint-disable no-unused-vars */ import { NextFunction, Response, Request } from 'express';
import Sequelize from 'sequelize';
import { Gym, Image } from '../../database/models';
import { CustomError } from '../../utils';

export default async function searchGymByName(req: Request, res: Response, next: NextFunction) {
  try {
    const gyms = await Gym.findAll({
      attributes: {
        exclude: [
          'password',
          'monthlyPrice',
          'typeGender',
          'fulltime',
          'sixMonthPrice',
          'updatedAt',
          'createdAt',
        ],
      },
      where: {
        gymName: {
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

    res.status(200).json(gyms);
  } catch (error) {
    next(error);
  }
}
