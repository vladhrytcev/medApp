import { Document, ObjectID } from 'mongoose';

export interface Speciality extends Document {
  readonly id: ObjectID;
  readonly doctor: string[];
  readonly nurse: string[];
  readonly organisation: string[];
}
