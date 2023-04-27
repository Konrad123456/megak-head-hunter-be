import jwt from 'jsonwebtoken';
import { User } from '../src/entities/User/User.entity';

export type UserPayloadData = Partial<User>;

export const createRegisterToken = (user: User): string => {
  const TOKEN_REGISTER = process.env.TOKEN_REGISTER as string;
  const TOKEN_REGISTER_EXPIRES_IN = process.env.TOKEN_REGISTER_EXPIRES_IN as string;

  const payload: UserPayloadData = {
    id: user.id,
  };

  const token = jwt.sign(payload, TOKEN_REGISTER, { expiresIn: TOKEN_REGISTER_EXPIRES_IN });

  return token;
};
