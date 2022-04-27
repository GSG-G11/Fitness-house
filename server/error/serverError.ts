/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

interface Error {
    status: number,
    message: string
}

const serverError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    res.status(error.status).json({ status: error.status, message: error.message });
  } else {
    res.status(500).json({ status: 500, message: 'Server Error' });
  }
};

export default serverError;
