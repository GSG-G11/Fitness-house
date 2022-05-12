/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { CustomError, checkToken } from '../utils';

export async function checkGymAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;
    // We can replace CustomError with //res.clearCookie('token'); // res.redirect('/login');
    if (!token) throw new CustomError('يجب تسجيل الدخول كمالك جيم', 401);
    const cookiesToken: any = await checkToken(token);
    if (cookiesToken.role !== 'gyms') throw new CustomError('يجب تسجيل الدخول كمالك جيم', 401);
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') return next(new CustomError('غير مسموح', 401));
    return next(err);
  }
}

export async function checkUserAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;
    if (!token) throw new CustomError('يجب تسجيل الدخول', 401);
    const cookiesToken: any = await checkToken(token);
    if (cookiesToken.role !== 'user') throw new CustomError('يجب تسجيل الدخول', 401);
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') return next(new CustomError('غير مسموح', 401));
    return next(err);
  }
}
