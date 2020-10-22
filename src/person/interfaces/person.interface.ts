import * as mongoose from 'mongoose';

export interface Person extends mongoose.Document {
  readonly id: mongoose.Schema.Types.ObjectID;
  readonly createdId: string;
  readonly passwordHash: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly band: {
    name: string;
  };
  readonly contact: {
    type: string;
    value: string;
  }[];
  readonly rating: {
    rating: number;
    message: string;
  }[];
  readonly org_info: {
    organisation: string;
    preferences: string;
  };
  readonly user_info: string;
  readonly agency_info: {
    agency: string;
    userStorage: string[];
    preferences: string;
  };
  readonly admin_info: {
    preferences: string;
  };
};
