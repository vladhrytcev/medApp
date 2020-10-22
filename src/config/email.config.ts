import { MailerOptions } from '@nest-modules/mailer';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const {
  EMAIL_USER,
  EMAIL_PASSWORD,
  SMTP,
  EMAIL_PORT,
} = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'));

export const EMAIL_CONFIG = {
  transport: {
    host: SMTP,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  }
} as MailerOptions;
