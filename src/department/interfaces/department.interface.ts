import { Document, ObjectID } from 'mongoose';

export interface Department extends Document {
  readonly id: ObjectID;
  readonly org_id: string;
  readonly name: string;
  readonly admins: string[];
  readonly users: string[];
};
