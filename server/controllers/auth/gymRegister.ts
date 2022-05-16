import { Op } from 'sequelize';
import { NextFunction, Response, Request } from 'express';

import { gymRegisterSchema, CustomError, generateToken, hashPassword } from '../../utils';
import { Gym } from '../../database/models';
import { uploadImage } from '../../utils/aws';

export default async function gymRegister(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request body against the schema
    const {
      gymName,
      email,
      password,
      phone,
      city,
      description,
      typeGender,
      monthlyPrice,
      sixMonthPrice,
      fulltime,
      features,
      logo,
    } = await gymRegisterSchema.validateAsync(req.body, { abortEarly: false });
    // Check if the gym already exists
    const isExist = await Gym.findOne({
      where: { email: { [Op.eq]: email } },
    });
    // if is exist throw an error
    if (isExist) {
      throw new CustomError('Gym already exists', 409);
    }
    // hash the password
    const hashedPassword = await hashPassword(password);

    // use AWS to upload the image
    // https://steper-form-test.s3.amazonaws.com/{key}
    const { Location } = await uploadImage(logo);

    const gym = await Gym.create({
      logo: Location || 'https://bit.ly/3yij5Wb',
      gymName,
      email,
      password: hashedPassword,
      phone,
      city,
      description,
      typeGender,
      monthlyPrice,
      sixMonthPrice,
      fulltime,
      features,
    });

    // Generate payload
    const payload = {
      id: gym.getDataValue('id'),
      name: gym.getDataValue('gymName'),
      role: 'gym',
    };
    // Generate the token
    const token = await generateToken(payload);

    return res
      .status(201)
      .cookie('token', token, {
        maxAge: 900000,
        httpOnly: true,
      })
      .json({
        status: 201,
        message: 'تم تسجيل النادي بنجاح',
        payload,
      });
  } catch (error: any) {
    console.log(error);

    if (error.name === 'ValidationError') {
      let errors: Array<string> = [];
      error.details.map((detail: any) => {
        errors = [...errors, detail.message];
      });
      return next(new CustomError(errors.toString(), 400));
    }
    return next(error);
  }
}
