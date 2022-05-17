import { NextFunction, Response, Request } from 'express';
import { hash } from 'bcryptjs';
import { gymRegisterSchema, CustomError, generateToken } from '../../utils';
import { Gym } from '../../database/models';
import uploadImage from '../../utils/aws';

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
      where: { email },
    });
    // if is exist throw an error
    if (isExist) {
      throw new CustomError('عذرا هذا الايميل مستخدم من قبل! حاول مرة أخرى', 409);
    }

    const hashedPassword = await hash(password, 12);

    // use AWS to upload the image
    // https://steper-form-test.s3.amazonaws.com/{key}
    // when test register gym , the image is not uploaded to AWS, so the image url is default image
    let logoUrl: string = 'https://bit.ly/3yij5Wb';
    if (process.env.NODE_ENV !== 'test') {
      const { Location } = await uploadImage(logo);
      logoUrl = Location;
    }

    const gym = await Gym.create({
      logo: logoUrl || 'https://bit.ly/3yij5Wb',
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
      id: gym.id,
      name: gym.gymName,
      role: 'gym',
    };
    // Generate the token
    const token = await generateToken(payload);

    res
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
    if (error.name === 'ValidationError') {
      return next(new CustomError(error.message, 400));
    }
    return next(error);
  }
}
