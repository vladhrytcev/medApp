import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  projectId: String,
  customerId: String,
  token: String
}, { timestamp: true });

DeviceSchema.index({ projectId: 1, customerId: 1 });

export default DeviceSchema;
