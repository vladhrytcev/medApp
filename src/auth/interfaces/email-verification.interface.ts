import * as mongoose from 'mongoose';

export interface EmailVerification extends mongoose.Document{
  readonly email: string;
  readonly emailToken: string;
  readonly timestamp: Date;
};
