const winston = require("winston"); //import winston 'make sure to install it using npm install winston'
const expressWinston = require("express-winston"); //import express winston to make winston easier to use with express. 'makse sure to install it using npm install express-winston

//custom formatter
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

//request logger
const requestLogger = expressWinston.logger({
  transports: [
    // 'Transports' is an array
    new winston.transports.Console({
      format: messageFormat,
    }),

    new winston.transport.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

//error logger to write errors to a seperate 'error.log' file
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
