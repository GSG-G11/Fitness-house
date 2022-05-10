/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize, { Op } from 'sequelize';
import { Gym, Image, Review } from '../../database/models';
import { GymFilter } from '../../utils';

export default async function getFilteredGyms(req: Request, res: Response, next: NextFunction) {
  const { name, city, typeGender, minPrice, maxPrice, availability, page } = req.query;
  // const feat: string[] = (feature as string).split(',');
  // console.log(name, feat);

  const where: Sequelize.WhereOptions<GymFilter> = {};
  if (name) {
    where.gymName = {
      [Op.iLike]: `%${name}%`,
    };
  }
  if (city) {
    where.city = city;
  }
  if (typeGender) {
    where.typeGender = typeGender;
  }
  if (minPrice && maxPrice) {
    where.monthlyPrice = {
      [Op.gte]: minPrice,
      [Op.lte]: maxPrice,
    };
  } else if (minPrice) {
    where.monthlyPrice = {
      [Op.gte]: minPrice,
    };
  } else if (maxPrice) {
    where.monthlyPrice = {
      [Op.lte]: maxPrice,
    };
  }

  if (availability) {
    where.fulltime = availability;
  }

  try {
    const gyms = await Gym.findAll({
      attributes: [
        'id',
        'gymName',
        'logo',
        'city',
        'typeGender',
        'description',
        'features',
        'monthlyPrice',
        'sixMonthPrice',
        'fulltime',
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
      where,
      include: [
        {
          model: Image,
          limit: 1,
          attributes: { exclude: ['createdAt', 'updatedAt', 'gymId', 'publicKey', 'id'] },
        },
        {
          association: 'reviews',
          model: Review,
          required: false,
          attributes: [],
        },
      ],
    });

    res.status(200).json(gyms);
  } catch (error) {
    console.log(error);

    next(error);
  }
}

// {
//   // gymName: {
//   //   [Op.iLike]: `%${name ?? ''}%`,
//   // },
//   // city,
//   // typeGender,
//   // '$reviews.review$': {
//   //   [Sequelize.Op.iLike]: `%${review}%`,
//   // },
//   //   features: {
//   //     [Op.like]: { [Op.any]: feat },
//   //   },
// },
