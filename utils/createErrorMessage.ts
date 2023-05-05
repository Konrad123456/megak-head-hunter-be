import { ValidationError } from "class-validator";

export const createErrorMessage = (errors: ValidationError[]): string => {
  const message = errors.map(err => {
    if (!err.constraints) return;

    const [, val] = Object.entries(err.constraints)[0];

    return val;
  }).join('; ');

  return message;
}