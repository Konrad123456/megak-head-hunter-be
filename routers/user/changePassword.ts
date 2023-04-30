import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../utils/errorsHandler';
import { myDataSource } from '../../config/database.configuration';
import { UserPayloadData } from '../../utils/createTokens';
import { ChangePasswordRequest } from '../../types';
import { User } from '../../src/entities/User/User.entity';
import bcrypt from 'bcryptjs';

type RequestAndPayloadUser = Request & UserPayloadData;

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = req.user as RequestAndPayloadUser;
    const { currentPassword, password, confirmPassword } = req.body as ChangePasswordRequest;

    const user = await myDataSource.getRepository(User).findOneBy({ id });

    if (!user) throw new ValidationError('Sorry. User does not exist.', 401);

    const access = await bcrypt.compare(currentPassword, user.password);

    if (!access) throw new ValidationError('Incorrect password.', 401);

    const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    const test = password.match(regx);

    if (!test) throw new ValidationError('The password must contain between 8 and 20 characters. Lowercase and uppercase letters, numbers and special characters..', 400);

    if (password !== confirmPassword) throw new ValidationError('Passwords must be the same.', 400);

    const hashPass = await bcrypt.hash(password, 14);

    await myDataSource.getRepository(User).update({ id }, { password: hashPass });

    res.status(200).json({ message: 'Password changed.' });
  } catch (err) {
    next(err);
  }
}
