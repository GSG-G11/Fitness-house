import { NextFunction, Response, Request } from 'express';

import { hash } from 'bcryptjs';
import { resetPasswordSchema, CustomError, checkToken, generateToken } from '../../utils';
import { Gym } from '../../database/models';

export default async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request body against the schema
    const { token, password } = await resetPasswordSchema.validateAsync(req.body);

    const tokenChecked: any = await checkToken(token);

    const { id } = tokenChecked;

    if (!id) throw new CustomError('عذرا هذا الرابط غير صالح', 409);

    // Check if the gym already exists
    const gym = await Gym.findByPk(id);

    // if is exist throw an error
    if (!gym) throw new CustomError('عذرا هذا الرابط غير صالح', 409);

    const hashedPassword = await hash(password, 12);

    await gym.update({ password: hashedPassword });

    // Generate payload
    const payload = {
      id,
      name: gym.gymName,
      role: 'gym',
    };

    // Generate the token
    const newToken = await generateToken(payload);

    res
      .cookie('token', newToken, {
        maxAge: 900000,
      })
      .json({
        message: 'تم تحديث كلمة المرور بنجاح',
        payload,
      });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
