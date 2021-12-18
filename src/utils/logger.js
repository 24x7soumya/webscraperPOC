/**
 * @module utils/logger
 * @desc Contains functions to interact with local store.
 */

const { createLogger, format, transports } = require('winston');
const { combine, label, timestamp, printf } = format;
const logFormat = printf( ({ level, message, label, timestamp }) => `${timestamp} [${level}] [${label}] : ${message} `);

/**
 * Creates winston logger instance.
 * @param {string} sourceLabel - Label to be used for logger instance
 * @returns {object} - Customized winston logger instance
 */
exports.createLoggerInstance = function(sourceLabel){
    return createLogger({
        format: combine(
            format.colorize(),
            label({ label:sourceLabel }),
            timestamp(),
            logFormat
        ),
        transports: [
            new transports.Console()
        ]
    });
}