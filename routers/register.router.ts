import { Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import bcrypt from 'bcryptjs';
import { ValidationError } from "../utils/errorsHandler";
import { staticText } from "../language/en.pl";
import { validatePassword } from '../utils/validatePassword';


type UserRegiserData = {
  userId: string;
  password: string;
  confirmPassword: string;
  registerToken: string | null;
};

export const registerRouter = Router()
  .post('/', async (req, res, next) => {
    const { userId, password, confirmPassword, registerToken } = req.body as UserRegiserData;

    const user = await myDataSource.getRepository(User).findOneBy({ email });

    if (!user) throw new ValidationError(staticText.validation.UserDoesntExist, 422);
    if (!user.isActive) throw new ValidationError(staticText.validation.UnconfirmedAccount, 422);
    if (user.registerToken !== registerToken || user.registerToken === null)
        throw new ValidationError(staticText.validation.user.invalidToken, 422);

    if (validatePassword(password)) throw new ValidationError(staticText.validation.password.toShort, 422);

    if (password !== confirmPassword) throw new ValidationError(staticText.validation.password.confirmBeTheSame, 422);

    const hashPass = await bcrypt.hash(password, 14);

    await myDataSource.getRepository(User).update({ id: user.id }, { password: hashPass, registerToken: null });

    res.status(200).json({ message: staticText.validation.message.DataHasBeenSaved });
  });
