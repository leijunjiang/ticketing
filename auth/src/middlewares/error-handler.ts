import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if ( err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: [{ message: err.serializeErrors() }] });
  }

  res.status(400).send({
    message: [{ message: 'Something went wrong'}]
  });
};
