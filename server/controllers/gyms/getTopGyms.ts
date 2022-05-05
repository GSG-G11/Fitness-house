import { NextFunction, Response, Request } from 'express';
import Gym from '../../database/models/gyms';

export default async function getAllGyms(req: Request, res: Response, next: NextFunction) {
  try {
    // id ,gym_name,logo,city,description,features

    const gyms = await Gym.findAll();

    res.json({ status: 200, gyms });
  } catch (error) {
    next(error);
  }
}
