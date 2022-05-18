import { NextFunction, Response } from 'express';
import Gym from '../../database/models/gyms';
import { uploadImage, deleteImage, getImageKey } from '../../utils/aws';
import { CustomError, gymEditSchema } from '../../utils';

export default async function editGymData(req: any, res: Response, next: NextFunction) {
  try {
    await gymEditSchema.validateAsync(req.body);
    const { gymId } = req.body;
    const { id } = req.token;
    if (+id !== gymId) {
      throw new CustomError('You are not allowed to edit this gym', 403);
    }
    const gym = await Gym.findByPk(id);
    if (!gym) {
      throw new CustomError('Gym not found', 404);
    }
    const logoURL = gym.getDataValue('logo');
    if (req.body.logo !== logoURL) {
      if (process.env.NODE_ENV !== 'test') {
        if (logoURL.includes('amazonaws')) {
          await deleteImage(getImageKey(logoURL));
        }
        const { Location } = await uploadImage(req.body.logo);
        req.body.logo = Location;
      }
    }

    await gym.update(req.body);
    res.json({ message: 'Gym updated', data: gym });
  } catch (error: any) {
    if (error.name === 'ValidationError') next(new CustomError('عذراً خطأ في المعرف', 400));
    next(error);
  }
}
