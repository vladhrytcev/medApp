import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const JobSchema = new mongoose.Schema({
  jobID: String,
  title: String,
  dates: [{
    Type: String,
    date: {
      startDate: String,
      endDate: String,
      activity: String,
    }
  }],
  salary: [{
    activity: String,
    cost: String
  }],
  desc: String,
  skills: [String],
  timeLimit: String,
  orig_submission: [{
    type: ObjectID,
    ref: 'person'
  }],
  field: String,
  orig_dept: {
    type: ObjectID,
    ref: 'departments'
  },
  subtitle: String,
  accomodation: Boolean,
  state: String,
  applicants: [{
    type: ObjectID,
    ref: 'applicants'
  }],
  organisation: {
    type: ObjectID,
    ref: 'organisations'
  },
  jobType: String,
  jobOperation: String,
  extenal_adv: String,
  payment: String
});

JobSchema.set('validateBeforeSave', false);
