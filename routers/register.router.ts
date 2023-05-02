import { Router } from 'express';
import { myDataSource } from '../config/database.configuration';
import { User } from '../src/entities/User/User.entity';
import bcrypt from 'bcryptjs';
import { ValidationError } from '../utils/errorsHandler';

type UserRegiserData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerRouter = Router()
  .post('/', async (req, res, next) => {
    const { email, password, confirmPassword } = req.body as UserRegiserData;
    const emailLowerCase = email.toLocaleLowerCase();

    // TODO: ErrorValidate status 400 + message
    if (!emailLowerCase.includes('@')) throw new Error('Niepoprawny adres amail.',);

    const user = await myDataSource.getRepository(User).findOneBy({ email: emailLowerCase });

    // TODO: ErrorValidate status 400 + message
    if (!user) throw new Error('Podany adres email nie istnieje. Proszę skontakotwać się z administratorem serwisu.');
    if (user.isActive) throw new ValidationError('The user is registered.', 401);

    const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    const test = password.match(regx);

    // TODO: ErrorValidate status 400 + message
    if (!test) throw new Error('Hasło musi zawierać od 8 do 20 znaków. Hasło powinno zawierać małe i wielkie litery, cyfrę i znak specjalny.');


    if (password !== confirmPassword) throw new Error('Podane hasła muszą być takie same.');

    const hashPass = await bcrypt.hash(password, 14);

    await myDataSource.getRepository(User).update({ email: emailLowerCase }, { password: hashPass, registerToken: null });

    res.status(200).json({ message: 'Dane zapisane.' });
  });
