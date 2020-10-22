import { Document } from 'mongoose';

export interface DeviceInterface extends Document {
  readonly projectId: string;
  readonly customerId: string;
  readonly token: string;
}
