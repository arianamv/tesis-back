//import fs from 'fs';
var fs = require('fs')

//import winston, {format} from 'winston';
var winston = require('winston')
var MySQLTransport = require('winston-mysql');
var path = require('path');
var format = require('winston').format
require('winston-daily-rotate-file');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../.env.production' 
          : __dirname + '/../.env.development'
});

const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const options_json_logs = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    table: process.env.DB_TABLE_LOGS
};

// Crea el directorio de logs si no existe
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const timeOptions = {
    format: 'YYYY-MM-DD HH:mm:ss',
    utc: true, // Set `utc` to true
    utcOffset: -5 * 60, // Offset in minutes (GMT-5)
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple(),
                format.printf(({ level, message }) => {
                    return `${level}: ${message}`;
                })
            ),
            level: LOG_LEVEL
        }),
        new winston.transports.DailyRotateFile({
            format: format.combine(
                format.timestamp(timeOptions),
                format.simple(),
                format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] - ${level}: ${message}`;
                })
            ),
            maxFiles: '14d',
            dirname: path.resolve(__dirname, '../../logs'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: '%DATE%.log',
            level: LOG_LEVEL
        }),
        new MySQLTransport(options_json_logs),

    ]
});

module.exports = logger;