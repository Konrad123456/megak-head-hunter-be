import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { ValidationError } from '../utils/errorsHandler';

type JWTPayloadData = {
  id: string,
  role: number,
  iat: number,
  exp: number,
}

const JWTStrategyOptions: StrategyOptions = {
  secretOrKey: process.env.TOKEN_ACCESS_KEY as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const verifyCallback = async (payload: JWTPayloadData, cb: Function) => {
  try {
    if (!payload?.id) throw new ValidationError('Unauthorized.', 401);

    const { id, role } = payload;

    return cb(null, { id, role });
  } catch (err) {
    return cb(err)
  }
}

passport.use(new JWTStrategy(JWTStrategyOptions, verifyCallback));