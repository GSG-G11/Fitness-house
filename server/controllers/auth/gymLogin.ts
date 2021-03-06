import { NextFunction, Response, Request } from 'express';
import { compare } from 'bcryptjs';

import { gymLoginSchema, CustomError, generateToken } from '../../utils';
import { Gym } from '../../database/models';

export default async function gymLogin(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request body against the schema
    const { email, password: gymPassword } = await gymLoginSchema.validateAsync(req.body);

    // Check if the gym already exists
    const isExist: any = await Gym.findOne({
      where: { email },
    });

    // if is not exist throw an error
    if (!isExist) {
      throw new CustomError('عذرا لا يوجد حساب نادي بهذا البريد الالكتروني! حاول مرة أخرى', 401);
    }

    const { id, gymName, password: hashedPassword } = isExist;

    const checkedPassword: boolean = await compare(gymPassword, hashedPassword);

    if (!checkedPassword) {
      throw new CustomError('عذرا البريد الالكتروني او كلمة المرور خطأ! حاول مرة أخرى', 401);
    }

    // Generate payload
    const payload = {
      id,
      name: gymName,
      role: 'gym',
    };

    // Generate the token
    const token = await generateToken(payload);
    res
      .cookie('token', token, {
        maxAge: 900000,
      })
      .json({
        message: 'تم تسجيل الدخول بنجاح',
        payload,
      });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
