import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  title: String,
  createDate: String,
  subscriber: String,
  segments: [String],
  content: String,
});
