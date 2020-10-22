import { Document } from 'mongoose';

export interface MessageInterface extends Document {
  readonly title: string;
  readonly createDate: string;
  readonly subscriber: string;
  readonly segments: string[];
  readonly content: string;
}