import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const MetainformationSchema = new mongoose.Schema({
  id: ObjectID,
  fields: [{
    type: ObjectID,
    ref: 'fields'
  }],
  jobTitles: {
    doctors: [{
      type: ObjectID,
      ref: 'qualifications'
    }],
    nurses: [{
      type: ObjectID,
      ref: 'qualifications'
    }]
  }
})
