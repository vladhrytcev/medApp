import { Document, ObjectID } from 'mongoose';

export interface Band extends Document {
  readonly id: ObjectID;
  readonly name: string;
}
