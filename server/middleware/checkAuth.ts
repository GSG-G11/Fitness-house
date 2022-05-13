/* eslint-disable consistent-return */
import { Response, NextFunction } from 'express';
import { CustomError, checkToken, authRequest } from '../utils';

const checkAuth = (role: string) => async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    // We can replace CustomError with //res.clearCookie('token'); // res.redirect('/login');
    if (!token) throw new CustomError('يجب تسجيل الدخول', 401);
    const cookiesToken: any = await checkToken(token);
    if (cookiesToken.role !== role) throw new CustomError('يجب تسجيل الدخول', 401);
    req.token = cookiesToken;
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') return next(new CustomError('غير مسموح', 401));
    return next(err);
  }
};

export default checkAuth;
