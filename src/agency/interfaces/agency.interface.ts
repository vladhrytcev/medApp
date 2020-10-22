import { Document, ObjectID } from 'mongoose';

export interface Agency extends Document {
  readonly id: ObjectID;
  readonly name: string;
  readonly address: string;
  readonly postcode: string;
  readonly country: string;
  readonly url: string;
  readonly logo: string;
  readonly contacts: string[];
  readonly bankdetails: string;
  readonly userStorage: string[];
  readonly creator: string;
};
