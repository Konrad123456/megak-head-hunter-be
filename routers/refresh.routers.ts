import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { createTokens } from '../utils/createTokens';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import { userCookieSettings } from '../config/cookie.configuration';
import { ValidationError } from '../utils/errorsHandler';
import { staticText } from '../language/en.pl';
import {Roles} from "../src/entities/types/Roles";

export const refreshRouters = Router().get('/', async (req, res, next) => {
  const TOKEN_REFRESH_KEY = process.env.TOKEN_REFRESH_KEY as string;
  const refreshToken = req.cookies.refreshToken as string;

  if (!refreshToken) throw new ValidationError(staticText.validation.UnauthorizeAccess, 401);

  const user = await myDataSource.getRepository(User).findOneOrFail(
      {
        where: { token: refreshToken },
        relations: [User.HR_RELATION, User.STUDENTS_DATA_RELATION]
      });

  if (!user) throw new ValidationError(staticText.validation.AccessDenied, 401);

  let fullName = '';
  if(user.role === Roles.STUDENT) {
    fullName = user.studentsData.firstName + ' ' + user.studentsData.lastName;
  } else if (user.role === Roles.HR) {
    fullName = user.hr.fullName;
  } else {
    fullName = user.email;
  }

  jwt.verify(refreshToken, TOKEN_REFRESH_KEY, async (err, data: any) => {

    if (err) throw new ValidationError(staticText.validation.AccessDenied, 403);

    const user = await myDataSource.getRepository(User).findOneBy({ id: data.id });

    if (!user) throw new ValidationError(staticText.validation.UserDoesntExist, 401);

    const { accessToken, refreshToken } = createTokens(user);

    await myDataSource.getRepository(User).update({ id: user.id }, { token: refreshToken });

    res.cookie('refreshToken', refreshToken, userCookieSettings);

    res.json({ accessToken, user: { email: user.email, role: user.role, fullName } });
  });
});
