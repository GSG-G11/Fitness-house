import { NextFunction, Response, Request } from 'express';

import { forgetPasswordSchema, CustomError, generateToken, sendEmail } from '../../utils';
import { Gym } from '../../database/models';
import forgetPasswordTemp from '../../utils/email/templates/forgetPasswordTemp';

export default async function forgetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request body against the schema
    const { email } = await forgetPasswordSchema.validateAsync(req.body);

    // Check if the gym already exists
    const gym = await Gym.findOne({ where: { email } });
    // if is exist throw an error
    if (!gym) {
      throw new CustomError('عذرا لا يوجد حساب نادي بهذا البريد الالكتروني! حاول مرة أخرى', 401);
    }

    // send email to user to reset password

    const payload = {
      id: gym.id,
      email,
    };

    const token = await generateToken(payload, {
      expiresIn: '0.5h',
      algorithm: 'HS256',
    });

    const html = forgetPasswordTemp(`${process.env.BASE_URL}gym/rest-password?token=${token}`);

    sendEmail(email, 'إعادة ضبط كلمة المرور', html);

    res.json({
      message: 'تم إرسال البريد الإلكتروني ، يرجى التحقق من بريدك الإلكتروني',
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new CustomError('عذرا هذا الرابط لا يعمل اعد المحاولة مرة اخرى', 500));
    }
    return next(error);
  }
}
