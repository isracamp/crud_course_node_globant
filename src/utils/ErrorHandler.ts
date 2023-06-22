import { statusErrors } from '../constants/StatusCodeHTTP';
import { Response } from 'express';

const errorMappings: Record<string, number> = {
  ...statusErrors,
};

const errorHandler = (err: any, res: Response) => {
  const statusCode = errorMappings[err.code || err.error] || statusErrors.INTERNAL_SERVER;
  res.status(statusCode).json({ status: statusCode, error: err.message });
};

export default errorHandler;
