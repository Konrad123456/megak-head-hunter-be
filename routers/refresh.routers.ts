import { Router } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayloadData, createTokens } from '../utils/createTokens';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import { userCookieSettings } from '../config/cookie.configuration';
import {ValidationError} from "../utils/errorsHandler";
import {staticText} from "../language/en.pl";

type PayloadData = string | JwtPayload | undefined | UserPayloadData;

export const refreshRouters = Router().get('/', async (req, res) => {
  const TOKEN_REFRESH_KEY = process.env.TOKEN_REFRESH_KEY as string;
  const refreshToken = req.cookies.refreshToken as string;

  if (!refreshToken) throw new ValidationError(staticText.validation.UnauthorizeAccess, 401);

  const user = await myDataSource.getRepository(User).findOneBy({ token: refreshToken });

  if (!user) throw new ValidationError(staticText.validation.AccessDenied, 401);

  jwt.verify(refreshToken, TOKEN_REFRESH_KEY, async (err, data: any) => {

    if (err) throw new ValidationError(staticText.validation.AccessDenied, 403);

    const user = await myDataSource.getRepository(User).findOneBy({ id: data.id });

    if (!user) throw new ValidationError(staticText.validation.UserDoesntExist, 401);

    const { accessToken, refreshToken } = createTokens(user);

    await myDataSource.getRepository(User).update({ id: user.id }, { token: refreshToken });

    res.cookie('refreshToken', refreshToken, userCookieSettings);

    res.json({ accessToken, user: { email: user.email, role: user.role } });
  });
});
