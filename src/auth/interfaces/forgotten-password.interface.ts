import  * as mongoose from 'mongoose';

export interface ForgottenPassword extends mongoose.Document {
  readonly email: string;
  readonly newPasswordToken: string;
  readonly timestamp: Date;
};
