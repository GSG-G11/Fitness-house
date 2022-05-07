/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize from 'sequelize';
import { Gym, Image, Review } from '../../database/models';

export default async function getAllGyms(req: Request, res: Response, next: NextFunction) {
  try {
    const topReviewGyms = await Gym.findAll({
      subQuery: false,
      attributes: [
        'id',
        ['gym_name', 'gymName'],
        'logo',
        'city',
        'description',
        'features',
        [
          Sequelize.literal(`(
            SELECT 
              CASE WHEN AVG(review.rate) IS NULL
                    THEN 0 
                    ELSE AVG(review.rate)
              END
            FROM reviews AS review     
            WHERE
             "review"."gymId" =  gyms.id
            )`),
          'review',
        ],
      ],
      include: [
        { model: Image, required: false, attributes: ['pathUrl'], limit: 1 },
        {
          model: Review,
          required: false,
          attributes: [],
        },
      ],
      limit: 3,
      group: ['gyms.id'],
      order: [[Sequelize.literal('review'), 'DESC']],
    });

    res.json({ topReviewGyms });
  } catch (error) {
    next(error);
  }
}
