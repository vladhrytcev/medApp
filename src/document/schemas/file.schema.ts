import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: String,
  aliases: String,
  metadata: String,
  md5: String
})
