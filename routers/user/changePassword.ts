import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../utils/errorsHandler';
import { myDataSource } from '../../config/database.configuration';
import { UserPayloadData } from '../../utils/createTokens';
import { ChangePasswordRequest } from '../../types';
import { User } from '../../src/entities/User/User.entity';
import bcrypt from 'bcryptjs';
import { validatePassword } from '../../utils/validatePassword';

type RequestAndPayloadUser = Request & UserPayloadData;

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as RequestAndPayloadUser;
    const { currentPassword, password, confirmPassword } = req.body as ChangePasswordRequest;

    const user = await myDataSource.getRepository(User).findOneBy({ id });

    if (!user) throw new ValidationError('Sorry. User does not exist.', 401);

    const access = await bcrypt.compare(currentPassword, user.password);

    if (!access) throw new ValidationError('Incorrect password.', 401);

    if (validatePassword(password)) throw new ValidationError('The password must contain between 8 and 20 characters. Lowercase and uppercase letters, numbers and special characters..', 400);

    if (password !== confirmPassword) throw new ValidationError('Passwords must be the same.', 400);

    const hashPass = await bcrypt.hash(password, 14);

    await myDataSource.getRepository(User).update({ id }, { password: hashPass });

    res.status(200).json({ message: 'Password changed.' });
  } catch (err) {
    next(err);
  }
}
