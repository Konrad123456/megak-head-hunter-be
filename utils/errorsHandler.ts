import { NextFunction, Request, Response } from 'express';

type HttpStatusCode = 400 | 401 | 402 | 403 | 404 | 405 | 500;
type Errors = ValidationError;

export class ValidationError extends Error {
  status: HttpStatusCode;

  constructor(msg: string, status: HttpStatusCode = 500) {
    super();
    this.message = msg;
    this.status = status;
  }
}

export const errorHandler = (err: Errors, req: Request, res: Response, next: NextFunction) => {
  // docelowo do usunięcia.
  console.log('ErrorHandler:', err);

  if (err instanceof ValidationError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({
    message: 'Przepraszamy. Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.',
  });
};