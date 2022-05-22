import { NextFunction, Response } from 'express';
import { CustomError, paramsValidation } from '../../utils';
import { Image } from '../../database/models';
import { deleteImage } from '../../utils/aws';

export default
async function deleteImageController(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = await paramsValidation.validateAsync(req.params);
    const gymId = req.token.id;

    const image = await Image.findByPk(id);

    if (!image) {
      throw new CustomError('الصورة غير موجودة', 404);
    }

    if (gymId !== image.gymId) {
      throw new CustomError('لا يسمح لك بحذف هذة الصورة', 403);
    }

    const imageUrl = image.pathUrl;

    if (imageUrl.includes('amazonaws')) {
      await deleteImage(imageUrl);
    }
    await Image.destroy({ where: { id }, force: true });
    res.json({ message: 'image deleted', data: image });
  } catch (error: any) {
    if (error.name === 'ValidationError') next(new CustomError('عذراً خطأ في المعرف', 400));
    next(error);
  }
}
