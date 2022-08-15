import winston from 'winston';
const { prettyPrint, combine, printf, json, colorize, timestamp } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
        // json(),
        // prettyPrint()
    ),
    transports: [
        new winston.transports.Console()
    ],
    rejectionHandlers: [
        new winston.transports.Console()
    ]
});

export default logger;
