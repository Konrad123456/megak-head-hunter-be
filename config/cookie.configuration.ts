import { CookieOptions } from 'express';

export const userCookieSettings: CookieOptions = {
  httpOnly: true,
  secure: false, // TODO: https: -> true;
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,
};
