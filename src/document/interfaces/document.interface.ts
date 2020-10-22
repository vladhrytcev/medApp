import { Document, ObjectID } from 'mongoose';

export interface Document extends Document {
  readonly id: ObjectID;
  readonly type: string;
  readonly size: number;
  readonly name: string;
  readonly path: string;
  readonly mimetype: string;
  readonly filename: string;
};
