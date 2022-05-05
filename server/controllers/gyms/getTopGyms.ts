/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize, { Op } from 'sequelize';
import { Image, Review } from '../../database/models';
import Gym from '../../database/models/gyms';

export default async function getAllGyms(req: Request, res: Response, next: NextFunction) {
  try {
    let gyms: any = await Gym.findAll({
      subQuery: false,
      attributes: [
        'id',
        'gym_name',
        'logo',
        'city',
        'description',
        'features',
        [
          Sequelize.literal(`(
        SELECT AVG(review.rate)
          FROM reviews AS review
          WHERE
              review.gym_id = gyms.id
            )`),
          'avg_rate',
        ],
      ],
      include: [
        { model: Image, required: false, attributes: ['id', 'pathUrl'], limit: 1 },
        {
          model: Review,
          required: false,
          attributes: [],
        },
      ],
      limit: 3,
      group: ['gyms.id'],
      order: [Sequelize.literal('avg_rate')],
    });

    gyms = gyms
      .map((gym: { getDataValue: (arg0: string) => any }) => ({
        id: gym.getDataValue('id'),
        gymName: gym.getDataValue('gym_name'),
        logo: gym.getDataValue('logo'),
        city: gym.getDataValue('city'),
        description: gym.getDataValue('description'),
        features: gym.getDataValue('features'),
        reviews: gym.getDataValue('avg_rate') ? +gym.getDataValue('avg_rate') : null,
        image: gym.getDataValue('images')[0]
          ? gym.getDataValue('images')[0].getDataValue('pathUrl')
          : null,
      }))
      .sort((a: { reviews: number }, b: { reviews: number }) => b.reviews - a.reviews);

    res.json({ status: 200, gyms });
  } catch (error) {
    next(error);
  }
}
