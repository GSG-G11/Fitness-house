import { NextFunction, Response, Request } from 'express';
// import Sequelize from 'sequelize';
import Gym from '../../database/models/gyms';
import { CustomError, gymEditSchema } from '../../utils';

export default async function editGymData(req: Request, res: Response, next: NextFunction) {
  try {
    await gymEditSchema.validateAsync(req.body);
    const { id } = req.params;
    const gym = await Gym.findByPk(id);
    if (!gym) {
      throw new CustomError('Gym not found', 404);
    }
    await gym.update(req.body);
    res.status(201).json({ message: 'Gym updated', data: gym });
  } catch (error: any) {
    if (error.name === 'ValidationError') next(new CustomError('عذراً خطأ في المعرف', 400));
    next(error);
  }
}
