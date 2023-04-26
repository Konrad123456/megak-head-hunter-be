import { Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayloadData, createTokens } from '../utils/createTokens';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import { userCookieSettings } from '../config/cookie.configuration';

type PayloadData = string | JwtPayload | undefined | UserPayloadData;

export const refreshRouters = Router().get('/', async (req, res) => {
  const TOKEN_REFRESH_KEY = process.env.TOKEN_REFRESH_KEY as string;
  const refreshToken = req.cookies.refreshToken as string;

  // TODO: ErrorValidate status 401 + message
  if (!refreshToken) throw new Error('Nieautoryzowany dostęp.');

  const user = await myDataSource.getRepository(User).findOneBy({ token: refreshToken });
  // TODO: ErrorValidate status 401 + message
  if (!user) throw new Error('Dostęp zabroniony.');

  jwt.verify(refreshToken, TOKEN_REFRESH_KEY, async (err, data: any) => {
    // TODO: ErrorValidate status 403 + message
    if (err) throw new Error('Dostęp zabroniony.');

    const user = await myDataSource.getRepository(User).findOneBy({ id: data.id });
    // TODO: ErrorValidate status 401 + message
    if (!user) throw new Error('Podany użytkownik nie istnieje.');

    const { accessToken, refreshToken } = createTokens(user);

    await myDataSource.getRepository(User).update({ id: user.id }, { token: refreshToken });

    res.cookie('refreshToken', refreshToken, userCookieSettings);

    res.json({ accessToken });
  });
});
