import winston from "winston";

export const Logger = (label) => {
  const splunkFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] ${label}: ${message}`;
  });

  const logger = winston.createLogger({
    format: winston.format.combine(winston.format.label({ label: label }), winston.format.timestamp(), splunkFormat),
  });
  logger.configure({
    level: "debug",
    transports: [
      // new winston.transports.File({ level: "debug", filename: config.accessLog }),
      // new winston.transports.File({ level: "error", filename: config.errorLog }),
      new winston.transports.Console(),
    ],
  });
  return logger;
};

export default Logger;
