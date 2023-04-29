import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import passport from 'passport';
import { myDataSource } from "./config/database.configuration";
import { hrRouter } from './routers/createHR.routers';
import { registerRouter } from './routers/register.router';
import { loginRouter } from './routers/login.router';
import { logoutRouters } from './routers/logout.routers';
import { refreshRouters } from './routers/refresh.routers';
import { errorHandler } from './utils/errorsHandler';
import { userRouter } from './routers/user.routers';

myDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    })

const app = express();
const URL = process.env.APP_URL || 'http://localhost';
const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3002;
const FE_PORT = process.env.APP_FE_PORT ? Number(process.env.APP_PORT) : 3000;

app.use(cors({
    origin: `${URL}:${FE_PORT}`,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(rateLimit({
    windowMs: Number(process.env.RATE_LIMITER_WINDOW_MS),
    max: Number(process.env.RATE_LIMITER_MAX)
}));

// PASSPORT AUTHENTICATION
require('./auth/passport');

// ROUTERS
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouters);
app.use('/refresh-token', refreshRouters);

app.use(passport.authenticate('jwt', { session: false }));
app.use('/user', userRouter);
app.use('/hr', hrRouter);

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT} port`);
});