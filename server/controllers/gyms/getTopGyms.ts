/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize, { Op } from 'sequelize';
import { Image, Review } from '../../database/models';
import Gym from '../../database/models/gyms';

export default async function getAllGyms(req: Request, res: Response, next: NextFunction) {
  try {
    // id ,gym_name,logo,city,description,features

    const gyms: any = await Gym.findAll({
      attributes: ['id', 'gym_name', 'logo', 'city', 'description', 'features'],
      include: [
        { model: Image, required: false, attributes: ['id', 'pathUrl'], limit: 1 },
        {
          model: Review,
          required: false,
          attributes: {
            exclude: [
              'id',
              'rate',
              'description',
              'userId',
              'gym_id',
              'gymId',
              'createdAt',
              'updatedAt',
            ],

            include: [
              [
                // Note the wrapping parentheses in the call below!
                Sequelize.literal(`(
                  SELECT AVG(review.rate)
                    FROM reviews AS review
                    WHERE
                        review.gym_id = gyms.id
                )`),
                'avg_rate',
              ],
            ],
          },
        },
      ],
      limit: 3,
      group: ['id'],
    });

    const newUsers = gyms
      .map((gym: { getDataValue: (arg0: string) => any }) => ({
        id: gym.getDataValue('id'),
        gym_name: gym.getDataValue('gym_name'),
        logo: gym.getDataValue('logo'),
        city: gym.getDataValue('city'),
        description: gym.getDataValue('description'),
        features: gym.getDataValue('features'),
        reviews: gym.getDataValue('reviews')[0]
          ? gym.getDataValue('reviews')[0].getDataValue('avg_rate')
          : null,
        images: gym.getDataValue('images')[0].pathUrl,
      }))
      .sort((a: { reviews: number }, b: { reviews: number }) => b.reviews - a.reviews);

    res.json({ status: 200, gyms: newUsers });
  } catch (error) {
    next(error);
  }
}
