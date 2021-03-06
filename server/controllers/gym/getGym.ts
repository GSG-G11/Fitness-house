import { NextFunction, Response, Request } from 'express';
import Sequelize from 'sequelize';
import { Gym, Image, Review } from '../../database/models';
import { CustomError, paramsValidation } from '../../utils';

export default async function getGym(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = await paramsValidation.validateAsync(req.params);

    const gymData = await Gym.findByPk(id, {
      subQuery: false,
      attributes: [
        'id',
        'gymName',
        'logo',
        'city',
        'phone',
        'sixMonthPrice',
        'monthlyPrice',
        'fulltime',
        'typeGender',
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
        { model: Image, required: false, attributes: ['id', 'pathUrl'] },
        {
          model: Review,
          required: false,
          attributes: ['id', 'username', 'rate', 'description', 'createdAt'],
        },
      ],
    });
    if (!gymData) throw new CustomError('عذراُ الجيم غير متوفر', 404);
    res.json({ gymData });
  } catch (error: any) {
    if (error.name === 'ValidationError') next(new CustomError('عذراً خطأ في المعرف', 400));
    next(error);
  }
}
