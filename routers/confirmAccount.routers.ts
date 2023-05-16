import { Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import { ValidationError } from '../utils/errorsHandler';
import { staticText } from '../language/en.pl';
import jwt from 'jsonwebtoken';
import { UserActive } from '../types';

export const confirmRouter = Router()
  .get('/:id/:token', async (req, res, next) => {
    const TOKEN_REGISTER = process.env.TOKEN_REGISTER as string;
    const id = req.params.id;
    const token = req.params.token;
    const user = await myDataSource.getRepository(User).findOneBy({ id });

    if (!id || !token) throw new ValidationError(staticText.validation.AccessDenied, 401);

    if (!user) throw new ValidationError(staticText.validation.UserDoesntExist, 422);
    if (user.isActive && !user.registerToken) throw new ValidationError(staticText.validation.UserIsRegistered, 401);

    jwt.verify(token, TOKEN_REGISTER, async (err, data: any) => {
      try {
        if (err) throw new ValidationError(staticText.validation.AccessDenied, 401);

        if (id !== data.id) throw new ValidationError(staticText.validation.AccessDenied, 401);

        await myDataSource.getRepository(User).update({ id }, { isActive: UserActive.ACTIVE });

        res.status(200).json({ message: staticText.validation.message.DataConfirmed });
      } catch (err) {
        next(err)
      }
    });

  });