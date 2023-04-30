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

    if (!emailLowerCase.includes('@')) throw new ValidationError('Niepoprawny adres amail.', 400);

    const user = await myDataSource.getRepository(User).findOneBy({ email: emailLowerCase });

    if (!user) throw new ValidationError('Podany adres email nie istnieje. Proszę skontakotwać się z administratorem serwisu.', 400);

    const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    const test = password.match(regx);

    if (!test) throw new ValidationError('Hasło musi zawierać od 8 do 20 znaków. Hasło powinno zawierać małe i wielkie litery, cyfrę i znak specjalny.', 400);


    if (password !== confirmPassword) throw new ValidationError('Podane hasła muszą być takie same.', 400);

    const hashPass = await bcrypt.hash(password, 14);

    await myDataSource.getRepository(User).update({ email: emailLowerCase }, { password: hashPass });

    res.status(200).json({ message: 'Dane zapisane.' });
  });
