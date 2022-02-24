import * as winston from "winston";

import * as expressWinston from "express-winston";

const { splat, timestamp, printf } = winston.format;

const requestLogging = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `
    return msg
});

export const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        splat(),
        timestamp(),
        requestLogging
    )
})