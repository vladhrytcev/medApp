import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema({
  id: String,
  type: String,
  size: Number,
  name: String,
  path: String,
  mimetype: String,
  filename: String
});
