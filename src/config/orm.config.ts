import { ConnectionOptions } from 'mongoose';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTHDB,
} = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'))


export const ORM_CONFIG = {
  type: 'mongodb',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  database: DB_NAME,
  entities: [`${process.env.PWD}/src/**/*.entity.*`],
  synchronize: true,
  logging: true,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  authSource: DB_AUTHDB
} as ConnectionOptions;
