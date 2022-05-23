import { NextFunction, Response } from 'express';
import { Image } from '../../database/models';
import { gymImageSchema, CustomError } from '../../utils';
import { uploadImage } from '../../utils/aws';

export default async function postImage(req: any, res: Response, next: NextFunction) {
  try {
    const { images } = await gymImageSchema.validateAsync(req.body);
    const { id } = req.token;

    const Images = await Promise.all(images.map(async (image: string) => {
      const { Location, Key } = await uploadImage(image);
      return {
        pathUrl: Location,
        publicKey: Key,
        gymId: id,
      };
    }));

    await Image.bulkCreate(Images);

    res.status(201).json({ message: 'تم تحميل الصور بنجاح', Images });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
