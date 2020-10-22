import { Document, ObjectID } from 'mongoose';

export interface University extends Document {
  readonly id: ObjectID;
  readonly name: string;
  readonly postcode: string;
  readonly city: string;
  readonly country: string;
};
