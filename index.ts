import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import passport from 'passport';
import { myDataSource } from "./config/database.configuration";
import { registerRouter } from './routers/register.router';
import { loginRouter } from './routers/login.router';
import { logoutRouters } from './routers/logout.routers';
import { refreshRouters } from './routers/refresh.routers';

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
const URL = process.env.APP_URL || 'http://localhost';
const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3002;

app.use(cors({
    origin: `${URL}:${PORT}`
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

// TEST
app.get('/test', passport.authenticate('jwt', { session: false }), (req: any, res) => {
    const { user } = req;
    res.json({ message: user });
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT} port`);
});