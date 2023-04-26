import jwt from 'jsonwebtoken';
import { User } from '../src/entities/User/User.entity';

export type UserPayloadData = {
  id: string;
  role: number,
}

type AccessTokenReturn = {
  accessToken: string;
  refreshToken: string;
};

export const createTokens = (user: User): AccessTokenReturn => {
  const TOKEN_ACCESS_KEY = process.env.TOKEN_ACCESS_KEY as string;
  const TOKEN_REFRESH_KEY = process.env.TOKEN_REFRESH_KEY as string;
  const TOKEN_ACCESS_EXPIRES_IN = process.env.TOKEN_ACCESS_EXPIRES_IN as string;
  const TOKEN_REFRES_EXPIRES_IN = process.env.TOKEN_REFRES_EXPIRES_IN as string;

  const payload: UserPayloadData = {
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, TOKEN_ACCESS_KEY, { expiresIn: TOKEN_ACCESS_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, TOKEN_REFRESH_KEY, { expiresIn: TOKEN_REFRES_EXPIRES_IN });

  return { accessToken, refreshToken };
};
