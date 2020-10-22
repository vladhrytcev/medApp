import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const ApplicantSchema = new mongoose.Schema({
  id: ObjectID,
  job_id: {
    type: ObjectID,
    ref: 'externaljobs'
  },
  location: {
    type: ObjectID,
    ref: 'organisations'
  },
  state: String,
  user: {
    type: ObjectID,
    ref: 'person'
  },
  agency: {
    type: ObjectID,
    ref: 'agencies'
  }
})

ApplicantSchema.set('validateBeforeSave', false);
