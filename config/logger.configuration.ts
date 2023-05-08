import winston, {transports} from "winston";

export const logger = winston.createLogger({
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
    ],
});