import { Request, Response } from 'express';

const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: 'Not Found Page' });
};

export default notFoundError;
