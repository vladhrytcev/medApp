import { Document } from 'mongoose';

export interface File extends Document {
  readonly filename: string;
  readonly contentType: string;
  readonly length: number;
  readonly chunkSize: number;
  readonly uploadDate: string;
  readonly aliases: string;
  readonly metadata: string;
  readonly md5: string;
}
