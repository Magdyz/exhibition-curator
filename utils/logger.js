let logger;

if (typeof window === "undefined") {
  const { createLogger, format, transports } = require("winston");

  logger = createLogger({
    level: "error",
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({ format: format.simple() }));
  }
}

module.exports = logger;
