import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const FieldSchema = new mongoose.Schema({
  id: ObjectID,
  ID: String,
  value: {
    de: String,
    en: String,
  }
});
