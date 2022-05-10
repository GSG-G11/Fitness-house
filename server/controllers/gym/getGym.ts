import { NextFunction, Response, Request } from 'express';
import Sequelize from 'sequelize';
import { Gym, Image, Review, User } from '../../database/models';
import CustomError from '../../utils';
import paramsValidation from '../../utils/validation';

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
        { model: Image, required: false, attributes: ['pathUrl'] },
        {
          model: Review,
          required: false,
          attributes: ['id', 'rate', 'description', 'createdAt', 'userId'],
          include: [{ model: User, required: false, attributes: ['username', 'avatar'] }],
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
