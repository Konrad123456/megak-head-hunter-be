import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import { createTokens } from '../utils/createTokens';
import { userCookieSettings } from '../config/cookie.configuration';

type UserLoginData = {
  email: string;
  password: string;
};

export const loginRouter = Router()
  .post('/', async (req, res) => {
    const { email, password } = req.body as UserLoginData;

    // TODO: ErrorValidate status 401 + message
    if (!email || !password) throw new Error('Niepoprawny login lub hasło.');

    const emailLowerCase = email.toLocaleLowerCase();

    const user = await myDataSource.getRepository(User).findOneBy({ email: emailLowerCase });

    // TODO: ErrorValidate status 401 + message
    if (!user) throw new Error('Podnay amail nie istnieje.');

    const access = await bcrypt.compare(password, user.password);

    // TODO: ErrorValidate status 401 + message
    if (!access) throw new Error('Niepoprawne hasło.');

    const { accessToken, refreshToken } = createTokens(user);
    await myDataSource.getRepository(User).update({ id: user.id }, { token: refreshToken });

    res.cookie('refreshToken', refreshToken, userCookieSettings);
    res.json({ accessToken });
  });
