const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = combine(
    timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    printf(({ level, message, timestamp }) => {
        return `${timestamp} | ${level} : ${message}`;
    })
)

const repos_logger = createLogger({
    level: 'info',
    format: myFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/git_repos.logs'
        })
    ],
})

const profile_logger = createLogger({
    level: 'info',
    format: myFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/git_profile.logs'
        })
    ],
})


module.exports = {
    repos_logger,
    profile_logger
}