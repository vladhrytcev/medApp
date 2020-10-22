import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const JobTitleSchema = new mongoose.Schema({
  id: ObjectID,
  doctors: {
    de: [{
      id: ObjectID,
      active: [String],
      value: String
    }],
    en: [{
      id: ObjectID,
      active: [String],
      value: String
    }]
  },
  nurses: {
    de: [{
      id: ObjectID,
      active: [String],
      value: String
    }],
    en: [{
      id: ObjectID,
      active: [String],
      value: String
    }]
  }
});
