import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const QualificationSchema = new mongoose.Schema({
  id: ObjectID,
  status: [String],
  value: {
    de: String,
    en: String
  },
  fields: [{
    type: ObjectID,
    ref: 'fields'
  }],
  qualification: String
});
