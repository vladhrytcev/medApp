import * as winston from 'winston';
import { LOG_LEVEL } from '../../config';

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (LOG_LEVEL === 'debug') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export { logger };