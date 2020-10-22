import * as mongoose from 'mongoose';

export const EmailTemplatesSchema = new mongoose.Schema({
  name: String,
  content: String,
  contentJSON: String,
  type: String,
  subject: String
})
