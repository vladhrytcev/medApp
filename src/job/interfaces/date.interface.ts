import { Document } from 'mongoose';

export interface Date extends Document {
  readonly startDate: string;
  readonly endDate: string;
  readonly activity: string;
}