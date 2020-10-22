import { Document } from 'mongoose';

export interface EmailTemplate extends Document {
  readonly name: string;
  readonly content: string;
  readonly contentJSON: Object;
  readonly type: string;
  readonly subject: string;
}
