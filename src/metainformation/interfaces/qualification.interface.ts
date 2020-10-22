import { Document, ObjectID } from 'mongoose';

export interface Qualification extends Document {
  readonly id: ObjectID;
  readonly status: string[];
  readonly value: {
    readonly de: string;
    readonly en: string;
  };
  readonly fields: string[];
  readonly qualification: string;
};
