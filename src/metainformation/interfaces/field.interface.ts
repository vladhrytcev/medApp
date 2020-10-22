import { Document, ObjectID } from 'mongoose';

export interface Field extends Document {
  readonly id: ObjectID;
  readonly ID: string;
  readonly value: {
    readonly de: string;
    readonly en: string;
  }
}