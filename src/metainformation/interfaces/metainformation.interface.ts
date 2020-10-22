import { Document, ObjectID } from 'mongoose';

export interface Metainformation extends Document {
  readonly id: ObjectID;
  readonly fields: ObjectID[];
  readonly jobTitles: {
    doctors: ObjectID[];
    nurses: ObjectID[];
  }
};
