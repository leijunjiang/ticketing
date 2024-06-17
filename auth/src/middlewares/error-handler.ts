import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/databse-connection-error';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if ( err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map(error => {
      return { message: error.msg, field: error }
    });
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if ( err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ errors: [{ message: err.serializeErrors() }] });
  }

  res.status(400).send({
    message: [{ message: 'Something went wrong'}]
  });
};
