import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({level:'info'}),
        new winston.transports.Console({level:'warn'}),
        new winston.transports.Console({level:'error'}),
        new winston.transports.File({level:'warn', filename:'warn.log'}),
        new winston.transports.File({level:'error', filename:'error.log'})
    ]
})

export default logger;