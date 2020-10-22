import * as fs from 'fs';
import * as dotenv from 'dotenv';

const {
  JWT_SECRET,
  JWT_EXPIRES,
  LOG_LEVEL,
} = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'))

export {
  JWT_SECRET,
  JWT_EXPIRES,
  LOG_LEVEL,
};