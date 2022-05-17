import { NextFunction, Response, Request } from 'express';
// import Sequelize from 'sequelize';
import { CustomError } from '../../utils';

export default async function editGymData(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('editGymData');
  } catch (error: any) {
    if (error.name === 'ValidationError') next(new CustomError('عذراً خطأ في المعرف', 400));
    next(error);
  }
}
