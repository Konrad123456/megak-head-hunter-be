import { Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';

export const logoutRouters = Router().post('/', async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string;

  if (!refreshToken) return res.sendStatus(204);

  await myDataSource.getRepository(User).update({ token: refreshToken }, { token: '' });

  res.clearCookie('refreshToken');
  res.sendStatus(204);
});
