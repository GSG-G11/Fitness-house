/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import Sequelize, { Op, WhereOptions } from 'sequelize';
import paginate from 'jw-paginate';
import { Gym, Image, Review } from '../../database/models';
import { CustomError, filterValidation, GymFilter } from '../../utils';

export default async function getFilteredGyms(req: Request, res: Response, next: NextFunction) {
  const { name, city, typeGender, minPrice, maxPrice, availability, page, features } = req.query;

  try {
    await filterValidation.validateAsync({ minPrice, maxPrice, page });

    const where: WhereOptions<GymFilter> = {};
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
          required: false,
          attributes: ['pathUrl'],
        },
        {
          association: 'reviews',
          model: Review,
          required: false,
          attributes: [],
        },
      ],
      group: ['gyms.id'],
      order: [[Sequelize.literal('review'), 'DESC']],
    });

    // get page from query params or default to first page
    const currentPage: number = +page! || 1;
    // get pager object for specified page
    const pageSize: number = 3;
    const pages = paginate(gyms.length, currentPage, pageSize);

    // get page of items from items array
    const pageOfGyms = gyms.slice(pages.startIndex, pages.endIndex + 1);

    res.status(200).json({ gyms: pageOfGyms, pages });
  } catch (error: any) {
    console.log(error);

    if (error.name === 'ValidationError') {
      next(new CustomError('عذراً خطأ في السعر أو رقم الصفحة , يجب أن يكون رقماً', 400));
    }

    next(error);
  }
}
