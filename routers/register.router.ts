import { Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import bcrypt from 'bcryptjs';
import {ValidationError} from "../utils/errorsHandler";
import {staticText} from "../language/en.pl";

type UserRegiserData = {
  userId: string;
  password: string;
  confirmPassword: string;
  registerToken: string | null;
};

export const registerRouter = Router()
  .post('/', async (req, res, next) => {
    const { userId, password, confirmPassword, registerToken } = req.body as UserRegiserData;

    const user = await myDataSource.getRepository(User).findOneBy({ id: userId });

    if (!user) throw new ValidationError(staticText.validation.UserDoesntExist, 422);
    if (user.registerToken !== registerToken || user.registerToken === null)
        throw new ValidationError(staticText.validation.user.invalidToken, 422);
    if (user.isActive) throw new ValidationError('The user is registered.', 401);

    const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    const test = password.match(regx);

    if (!test) throw new ValidationError(staticText.validation.password.toShort, 422);

    if (password !== confirmPassword) throw new ValidationError(staticText.validation.password.confirmBeTheSame, 422);

    const hashPass = await bcrypt.hash(password, 14);

    await myDataSource.getRepository(User).update({ id: userId }, { password: hashPass, registerToken: null });

    res.status(200).json({ message: 'Dane zapisane.' });
  });
