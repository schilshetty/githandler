const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = combine(
    timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    printf(({ level, message, timestamp }) => {
        return `${timestamp} | ${level} : ${message}`;
    })
)

const logger = createLogger({
    level: 'info',
    format: myFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/github.logs'
        })
    ],
})


module.exports = {
    logger
}