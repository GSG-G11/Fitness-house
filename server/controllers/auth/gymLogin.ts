/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';

import { gymLoginSchema, CustomError } from '../../utils';
import { Gym } from '../../database/models';

export default async function gymLogin(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request body against the schema
    const {
      email,
      password,
    } = await gymLoginSchema.validateAsync(req.body);

    // Check if the gym already exists
    const isExist = await Gym.findOne({
      where: { email },
    });

    // if is not exist throw an error
    if (!isExist) {
      throw new CustomError('عذرا لا يوجد حساب نادي بهذا البريد الالكتروني! حاول مرة أخرى', 401);
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
