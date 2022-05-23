/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize, { Op, WhereOptions } from 'sequelize';
import { Gym, Image, Review } from '../../database/models';
import { CustomError, filterValidation, GymModel } from '../../utils';

const PAGE_SIZE = 3;

export default async function getFilteredGyms(req: Request, res: Response, next: NextFunction) {
  const { name, city, typeGender, minPrice, maxPrice, availability, page, features, review } =
    req.query;

  const currentPage: number = +page! || 1;

  try {
    await filterValidation.validateAsync({ minPrice, maxPrice, page });

    const where: WhereOptions<GymModel> = {};

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

    if (features) {
      const feat: string[] = (features as string).split(',');
      where.features = {
        [Op.contains]: feat,
      };
    }

    let having = {};
    if (review) {
      if (Number(review) === 0) {
        having = {
          [Op.and]: Sequelize.literal(`AVG(reviews.rate) >= ${review} OR AVG(reviews.rate) ISNULL`),
        };
      } else {
        having = {
          [Op.and]: Sequelize.literal(`AVG(reviews.rate) >= ${review}`),
        };
      }
    }

    const gyms = await Gym.findAndCountAll({
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
      having,
      include: [
        {
          model: Image,
          limit: 1,
          required: false,
          attributes: ['pathUrl'],
        },
        {
          model: Review,
          required: false,
          attributes: [],
        },
      ],
      group: ['gyms.id'],
      order: [[Sequelize.literal('review'), 'DESC']],
      offset: (currentPage - 1) * PAGE_SIZE,
    });

    const { count, rows } = gyms;

    const pagination = {
      totalItems: count.length,
      currentPage,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(count.length / PAGE_SIZE),
      startPage: 1,
      startIndex: 0,
      nextPage: currentPage + 1,
      prevPage: currentPage - 1,
    };

    // get page of items from items array
    const pageOfGyms = rows.slice(pagination.startIndex, PAGE_SIZE);

    return res.status(200).json({ gyms: pageOfGyms, pagination });
  } catch (error: any) {
    console.log(error);

    if (error.name === 'ValidationError') {
      return next(new CustomError('عذراً خطأ في السعر أو رقم الصفحة , يجب أن يكون رقماً', 400));
    }
    return next(error);
  }
}
