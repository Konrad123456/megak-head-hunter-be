import nodeMailer from "nodemailer";

const configurationMail = process.env.APP_ENV === 'test' ?
    {
        port: Number(process.env.MAIL_PORT),
    } :
    {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: Boolean(process.env.MAIL_SECURE),
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS,
        },
    }

export const mailer = nodeMailer.createTransport(configurationMail);